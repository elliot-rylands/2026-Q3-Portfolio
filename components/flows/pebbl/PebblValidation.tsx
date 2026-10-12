"use client";

import { useState } from "react";
import { FlowFrame, Toggle } from "../FlowFrame";
import p from "./pebbl.module.css";

// The project shows its own receipts. From IMPLEMENTATION_STATUS.md: each row
// says how far it has been checked, and "tested" always names the command.

type Level = 0 | 1 | 2 | 3; // 1 built, 2 automated tests, 3 run on a Mac
type Row = { area: string; name: string; level: Level; how: string };
const ROWS: Row[] = [
  { area: "Foundation", name: "Menu bar, popover, windows, themes", level: 3, how: "Launched on Elliot's Mac with npm run app:dev; npm test." },
  { area: "Foundation", name: "Design tokens pass WCAG AA in both themes", level: 2, how: "tokens.test.ts checks seven contrast pairs per theme." },
  { area: "Capture", name: "Capture state machine", level: 2, how: "8 Rust tests in session.rs." },
  { area: "Capture", name: "Crash recovery", level: 2, how: "Simulated crash: the unfinished file is repaired and marked recovered." },
  { area: "Capture", name: "Silence and permission detection", level: 2, how: "Signal health tested in Rust; the UI tested against a mocked native layer." },
  { area: "Capture", name: "Microphone and call audio capture", level: 1, how: "Compiles, clippy clean. Needs a run on real hardware." },
  { area: "Evidence", name: "Citation checks: verified, interpretation, insufficient", level: 2, how: "notes.rs tests, including invented and mismatched citations." },
  { area: "Evidence", name: "My promises rule", level: 2, how: "Needs a verified quote from your own mic; tested in Rust." },
  { area: "Evidence", name: "Echo removal", level: 2, how: "transcript.rs tests." },
  { area: "Evidence", name: "Whisper transcription", level: 1, how: "Compiles. Model download was blocked in the build sandbox." },
  { area: "Evidence", name: "Claude notes request", level: 1, how: "Error mapping unit tested. Needs a real API key run." },
  { area: "Library", name: "Search that can't be injected", level: 2, how: "store.rs tests with hostile inputs." },
  { area: "Library", name: "Export with evidence marks", level: 2, how: "export.test.ts." },
  { area: "Library", name: "Audio retention, never before the transcript", level: 2, how: "Rule tested in Rust." },
  { area: "Decisions", name: "Links, append-only history, re-attach after rewrite", level: 2, how: "decisions.rs; exit gate met in tests." },
  { area: "Decisions", name: "Trail and Map", level: 2, how: "DecisionsPage.test.tsx." },
  { area: "Screen", name: "Screen recording helper (Swift)", level: 1, how: "Written and reviewed; first compile happens on a Mac." },
];
const STEPS = ["Built", "Automated tests", "Run on a Mac"];

export default function PebblValidation() {
  const [filter, setFilter] = useState<"all" | "next">("all");
  const [sel, setSel] = useState<number | null>(null);
  const rows = ROWS.map((r, i) => ({ ...r, i })).filter((r) => filter === "all" || r.level < 3);
  const counts = [1, 2, 3].map((l) => ROWS.filter((r) => r.level >= l).length);
  const r = sel !== null ? ROWS[sel] : null;

  return (
    <FlowFrame
      skin="pebbl"
      eyebrow="Validation · the project shows its receipts too"
      problem="An app about not overclaiming shouldn't overclaim about itself. Every feature says how far it has been checked."
      controls={<Toggle label="Rows" value={filter} onChange={setFilter} options={[{ value: "all", label: "Everything" }, { value: "next", label: "Still to prove" }]} />}
      detail={r ? { tag: `${r.area} · ${STEPS[r.level - 1]}`, title: r.name, text: r.how } : { tag: "200 automated tests", title: "97 Rust, 103 frontend", text: "“Tested” only ever means verified by a named command, in a named environment. Pick a row to see how." }}
      minWidth={520}
    >
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) repeat(3, 76px)", alignItems: "end", gap: "4px 0", fontSize: 11, color: "var(--f-dim)", fontFamily: "var(--mono)", textTransform: "uppercase", letterSpacing: ".04em", padding: "0 8px 6px" }}>
        <span>Feature</span>
        {STEPS.map((s, i) => (
          <span key={s} style={{ textAlign: "center", lineHeight: 1.2 }}>{s}<br /><b style={{ color: "var(--f-ink)", fontSize: 13 }}>{counts[i]}/{ROWS.length}</b></span>
        ))}
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 3 }}>
        {rows.map((row) => (
          <li key={row.i}>
            <button type="button" className={p.item} aria-pressed={sel === row.i} onClick={() => setSel(row.i)} style={{ gridTemplateColumns: "minmax(0,1fr) repeat(3, 76px)", alignItems: "center", padding: "6px 8px" }}>
              <span>
                <span className={p.itemKind} style={{ marginRight: 8 }}>{row.area}</span>
                {row.name}
              </span>
              {[1, 2, 3].map((l) => (
                <span key={l} style={{ display: "grid", placeItems: "center" }} aria-label={`${STEPS[l - 1]}: ${row.level >= l ? "yes" : "not yet"}`}>
                  <span style={{ width: 12, height: 12, borderRadius: "50%", border: `2px solid ${row.level >= l ? "var(--p-moss)" : "var(--p-quiet)"}`, background: row.level >= l ? "var(--p-moss)" : "transparent", borderStyle: row.level >= l ? "solid" : "dashed" }} />
                </span>
              ))}
            </button>
          </li>
        ))}
      </ul>
    </FlowFrame>
  );
}
