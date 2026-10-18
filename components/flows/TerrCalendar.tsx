"use client";

import { useState } from "react";
import { FlowFrame, flowStyles as s } from "./FlowFrame";

// Six calendar versions plus the month view, in the order they were made.
const STEPS = [
  { v: "V1", file: "02-cal-week.webp", title: "Week view", text: "Inspections and works on a week grid, colour-coded by type, with a now line. The calendar lives in the same sidebar as the channels." },
  { v: "V2", file: "03-cal-event.webp", title: "The event card", text: "Click an event for one card: unit, building, tenant, time and an urgency tag, plus who was invited and who has replied." },
  { v: "V3", file: "04-cal-edit.webp", title: "Edit where you read", text: "Every field gets its own edit control, with Update at the bottom. No separate edit screen." },
  { v: "V4", file: "05-cal-dates.webp", title: "Reschedule in the card", text: "Dates change through an inline range picker, so the week behind stays in view." },
  { v: "V5", file: "06-cal-inline.webp", title: "Edit one field at a time", text: "A single field opens with its own Update, so a quick fix doesn't commit the whole event." },
  { v: "V5.1", file: "07-cal-new.webp", title: "Add an event", text: "New events use the same card, empty: date, time, building, unit and tenant." },
  { v: "Month", file: "08-cal-month.webp", title: "Month view", text: "The same card opens over a month grid, for planning further ahead." },
  { v: "Month", file: "09-cal-month-dates.webp", title: "Rescheduling across weeks", text: "The range picker works the same in month view." },
];

export default function TerrCalendar() {
  const [i, setI] = useState(0);
  const st = STEPS[i];
  return (
    <FlowFrame
      skin="terr"
      eyebrow="Terr.ai · inspections and works calendar"
      problem="Six versions, one rule that held: the event card is where everything happens."
      controls={
        <>
          <button type="button" className={s.btn} onClick={() => setI((i - 1 + STEPS.length) % STEPS.length)} aria-label="Previous version">←</button>
          <button type="button" className={s.btn} onClick={() => setI((i + 1) % STEPS.length)} aria-label="Next version">→</button>
        </>
      }
      detail={{ tag: `${st.v} · ${i + 1} of ${STEPS.length}`, title: st.title, text: st.text }}
      minWidth={0}
    >
      <div style={{ position: "relative", aspectRatio: "3 / 2", borderRadius: 10, overflow: "hidden", background: "var(--f-panel)" }}>
        {STEPS.map((x, k) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={x.file} src={`/work/terr-ai/media/${x.file}`} alt={`${x.v}: ${x.title}`} loading={k < 2 ? "eager" : "lazy"} decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: k === i ? 1 : 0, transition: "opacity .35s ease" }} />
        ))}
      </div>
      <input className={s.range} type="range" min={0} max={STEPS.length - 1} step={1} value={i} onChange={(e) => setI(+e.target.value)} aria-label="Calendar version" />
    </FlowFrame>
  );
}
