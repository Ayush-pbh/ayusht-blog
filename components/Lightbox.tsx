"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { CollectionItem } from "@/types";

const MIN_SCALE = 1;
const MAX_SCALE = 6;
/** Double-click / double-tap jumps straight to this rather than stepping up. */
const DOUBLE_CLICK_SCALE = 2.5;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Full-screen image viewer. Rendered once per tab panel and driven by `index`
 * — `null` means closed. Built on <dialog> so the top layer, focus trap and
 * Escape-to-close come from the platform instead of from us.
 */
export default function Lightbox({
  items,
  index,
  onIndexChange,
  onClose,
}: {
  items: CollectionItem[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<{ x: number; y: number } | null>(null);

  const open = index !== null;
  const item = open ? items[index] : undefined;
  const position = index === null ? 0 : index + 1;

  const reset = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  /**
   * Panning is only meaningful over the part of the image that overflows the
   * stage, so the offset is clamped to half the overflow in each direction.
   */
  const clampOffset = useCallback(
    (next: { x: number; y: number }, atScale: number) => {
      const stage = stageRef.current;
      if (!stage) return { x: 0, y: 0 };
      const maxX = (stage.clientWidth * (atScale - 1)) / 2;
      const maxY = (stage.clientHeight * (atScale - 1)) / 2;
      return {
        x: clamp(next.x, -maxX, maxX),
        y: clamp(next.y, -maxY, maxY),
      };
    },
    [],
  );

  const zoomTo = useCallback(
    (next: number) => {
      const target = clamp(next, MIN_SCALE, MAX_SCALE);
      setScale(target);
      setOffset((current) =>
        target === MIN_SCALE ? { x: 0, y: 0 } : clampOffset(current, target),
      );
    },
    [clampOffset],
  );

  const step = useCallback(
    (delta: number) => zoomTo(Math.round((scale + delta) * 100) / 100),
    [scale, zoomTo],
  );

  const go = useCallback(
    (delta: number) => {
      if (index === null || items.length < 2) return;
      reset();
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange, reset],
  );

  // Keep the native dialog in step with `index`, and lock the page behind it.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  // Wheel has to be bound by hand: React's onWheel is passive, so it cannot
  // preventDefault the browser's own zoom/scroll.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !open) return;

    function onWheel(event: WheelEvent) {
      event.preventDefault();
      zoomTo(scale * (event.deltaY < 0 ? 1.12 : 1 / 1.12));
    }

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [open, scale, zoomTo]);

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") go(1);
    if (event.key === "ArrowLeft") go(-1);
    if (event.key === "+" || event.key === "=") step(0.5);
    if (event.key === "-") step(-0.5);
    if (event.key === "0") reset();
  }

  function onPointerDown(event: React.PointerEvent) {
    if (scale === MIN_SCALE) return;
    dragRef.current = {
      x: event.clientX - offset.x,
      y: event.clientY - offset.y,
    };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent) {
    const start = dragRef.current;
    if (!start) return;
    setOffset(
      clampOffset(
        { x: event.clientX - start.x, y: event.clientY - start.y },
        scale,
      ),
    );
  }

  function onPointerUp() {
    dragRef.current = null;
    setDragging(false);
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className="fixed inset-0 m-0 h-full max-h-full w-full max-w-full bg-neutral-50 p-0 text-neutral-900 backdrop:bg-neutral-950/40 backdrop:backdrop-blur-sm"
    >
      {item && (
        <div className="flex h-full flex-col">
          <header className="xs:px-6 flex items-start justify-between gap-4 border-b border-neutral-200 px-4 py-3">
            <div className="min-w-0 space-y-0.5">
              <h2 className="font-serif text-base leading-snug italic">
                {item.title}
              </h2>
              {item.author && (
                <p className="text-2xs text-neutral-500">{item.author}</p>
              )}
              {item.description && (
                <p className="max-w-prose pt-1 text-xs leading-relaxed text-neutral-600">
                  {item.description}
                </p>
              )}
              {item.href && (
                <p className="text-2xs pt-1">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-400 underline decoration-neutral-300 underline-offset-2 transition-colors hover:text-neutral-900"
                  >
                    source
                  </a>
                </p>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <button
                onClick={() => step(-0.5)}
                disabled={scale <= MIN_SCALE}
                aria-label="Zoom out"
                className="cursor-pointer text-base leading-none text-neutral-400 transition-colors hover:text-neutral-900 disabled:cursor-default disabled:opacity-40 disabled:hover:text-neutral-400"
              >
                &minus;
              </button>
              <button
                onClick={reset}
                aria-label="Reset zoom"
                className="text-2xs w-10 cursor-pointer text-center font-mono text-neutral-500 tabular-nums transition-colors hover:text-neutral-900"
              >
                {Math.round(scale * 100)}%
              </button>
              <button
                onClick={() => step(0.5)}
                disabled={scale >= MAX_SCALE}
                aria-label="Zoom in"
                className="cursor-pointer text-base leading-none text-neutral-400 transition-colors hover:text-neutral-900 disabled:cursor-default disabled:opacity-40 disabled:hover:text-neutral-400"
              >
                +
              </button>
              <button
                onClick={onClose}
                aria-label="Close"
                className="ml-1 cursor-pointer text-base leading-none text-neutral-400 transition-colors hover:text-neutral-900"
              >
                &times;
              </button>
            </div>
          </header>

          <div
            ref={stageRef}
            onDoubleClick={() =>
              zoomTo(scale > MIN_SCALE ? MIN_SCALE : DOUBLE_CLICK_SCALE)
            }
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className={cn(
              "relative flex-1 touch-none overflow-hidden",
              scale > MIN_SCALE
                ? dragging
                  ? "cursor-grabbing"
                  : "cursor-grab"
                : "cursor-zoom-in",
            )}
          >
            <Image
              src={item.image || ""}
              alt={item.title}
              fill
              sizes="100vw"
              quality={90}
              draggable={false}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
              }}
              className={cn(
                "object-contain p-4",
                !dragging && "transition-transform duration-200",
              )}
            />
          </div>

          <footer className="xs:px-6 flex items-center justify-between gap-4 border-t border-neutral-200 px-4 py-3">
            <p className="text-2xs text-neutral-400">
              scroll or double-click to zoom
              {items.length > 1 && " · ← → to move"} · esc to close
            </p>
            {items.length > 1 && (
              <div className="flex shrink-0 items-center gap-4 text-neutral-400">
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous image"
                  className="cursor-pointer transition-colors hover:text-neutral-900"
                >
                  <em>prev</em>
                </button>
                <span className="text-2xs font-mono tabular-nums">
                  {position}/{items.length}
                </span>
                <button
                  onClick={() => go(1)}
                  aria-label="Next image"
                  className="cursor-pointer transition-colors hover:text-neutral-900"
                >
                  <em>next</em>
                </button>
              </div>
            )}
          </footer>
        </div>
      )}
    </dialog>
  );
}
