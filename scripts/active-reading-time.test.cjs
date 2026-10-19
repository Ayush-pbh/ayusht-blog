const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { runInNewContext } = require("node:vm");
const ts = require("typescript");

function mount(path = "/thoughts/seeing-music") {
  let now = 0;
  let focused = true;
  let interval;
  let cleanup;
  const events = [];
  const listeners = new Map();
  const target = {
    addEventListener(name, callback) {
      listeners.set(name, callback);
    },
    removeEventListener(name) {
      listeners.delete(name);
    },
  };
  const document = {
    ...target,
    visibilityState: "visible",
    hasFocus: () => focused,
  };
  const module = { exports: {} };
  const source = readFileSync(
    new URL("../components/ActiveReadingTime.tsx", `file://${__filename}`),
    "utf8",
  );
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  runInNewContext(compiled, {
    module,
    exports: module.exports,
    require: (name) =>
      name === "react"
        ? {
            useEffect: (effect) => {
              cleanup = effect();
            },
          }
        : { track: (name, data) => events.push({ name, ...data }) },
    performance: { now: () => now },
    document,
    window: {
      ...target,
      setInterval: (callback) => {
        interval = callback;
        return 1;
      },
      clearInterval: () => {
        interval = undefined;
      },
    },
  });
  module.exports.default({ path });
  return {
    events,
    advance(ms) {
      now += ms;
      interval();
    },
    fire(name) {
      listeners.get(name)();
    },
    hide() {
      document.visibilityState = "hidden";
      listeners.get("visibilitychange")();
    },
    show() {
      document.visibilityState = "visible";
      listeners.get("visibilitychange")();
    },
    blur() {
      focused = false;
      listeners.get("blur")();
    },
    // A client-side navigation: React runs the old effect's cleanup, then the
    // effect again with the new path, all in the same document and clock.
    navigate(to) {
      cleanup();
      assert.equal(listeners.size, 0);
      module.exports.default({ path: to });
    },
    cleanup() {
      cleanup();
      assert.equal(listeners.size, 0);
      assert.equal(interval, undefined);
    },
  };
}

const total = (reader) =>
  reader.events.reduce((sum, event) => sum + event.seconds, 0);

test("reports deltas without double counting on cleanup", () => {
  const reader = mount();
  reader.advance(15000);
  reader.advance(5000);
  reader.cleanup();
  assert.equal(total(reader), 20);
  assert.equal(reader.events[0].name, "active_reading_time");
  assert.equal(reader.events[0].path, "/thoughts/seeing-music");
});

test("excludes hidden and unfocused time", () => {
  const reader = mount();
  reader.advance(5000);
  reader.hide();
  reader.advance(120000);
  reader.show();
  reader.advance(5000);
  reader.blur();
  reader.advance(120000);
  reader.cleanup();
  assert.equal(total(reader), 10);
});

test("caps inactivity at 60 seconds and resumes on interaction", () => {
  const reader = mount();
  reader.advance(120000);
  reader.fire("scroll");
  reader.advance(5000);
  reader.cleanup();
  assert.equal(total(reader), 65);
});

test("pagehide and subsequent cleanup do not duplicate a delta", () => {
  const reader = mount();
  reader.advance(7000);
  reader.fire("pagehide");
  reader.advance(10000);
  reader.cleanup();
  assert.equal(total(reader), 7);
});

test("navigation attributes time to the page it was spent on", () => {
  const reader = mount("/thoughts");
  reader.advance(20000);
  reader.navigate("/thoughts/antimatter-factories");
  reader.advance(10000);
  reader.cleanup();
  const byPath = (path) =>
    reader.events
      .filter((event) => event.path === path)
      .reduce((sum, event) => sum + event.seconds, 0);
  assert.equal(byPath("/thoughts"), 20);
  assert.equal(byPath("/thoughts/antimatter-factories"), 10);
});
