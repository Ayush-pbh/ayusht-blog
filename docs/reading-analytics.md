# Active reading time

Seeing Music emits the Vercel Web Analytics custom event `active_reading_time`.
Each event contains two properties:

- `path`: `/thoughts/seeing-music`
- `seconds`: whole seconds accrued since the previous report (a delta)

Time accrues only while the document is visible and focused. After 60 seconds
without scrolling, pointer movement, a click/touch, or keyboard activity, accrual
pauses until the next interaction. Opening or refocusing the article starts a
new 60-second activity window. This is an engagement estimate, not proof of reading.

Reports are sent every 15 active seconds, with any remaining whole seconds sent
when the page is hidden, loses focus, navigates away, or unmounts. Final delivery
is best-effort: blockers, network loss, or closing the browser can lose events.
No identifiers, cookies, or persistent storage are added.

After merging and deploying, open the project's **Analytics → Events** panel
and select `active_reading_time`. Custom events require Vercel Pro or Enterprise.
The event count is a count of reports, **not seconds or reading sessions**. Sum
the `seconds` deltas for total measured active time; when querying grouped event
data, multiply each seconds value by its event count. There is no per-session
identifier or session-average calculation. No historical data can be recovered.

Run the focused behavior checks with:

```sh
node --test scripts/active-reading-time.test.cjs
```
