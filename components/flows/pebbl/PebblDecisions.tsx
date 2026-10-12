"use client";

import { useState } from "react";
import { FlowFrame, Toggle, flowStyles as fs } from "../FlowFrame";
import p from "./pebbl.module.css";

// Living decision trail. pebbl. suggests a connection from shared wording,
// on the Mac, and changes nothing until you choose. History is append-only:
// undoing a link adds a new entry rather than deleting the old one.

type Rel = "replaces" | "same" | "builds" | "conflicts" | "related" | "none";
const RELS: { id: Rel; label: string }[] = [
  { id: "replaces", label: "Replaces it" },
  { id: "same", label: "Same decision" },
  { id: "builds", label: "Builds on it" },
  { id: "conflicts", label: "Conflicts with it" },
  { id: "related", label: "Related" },
];

const MEETINGS = [
  { id: "m1", date: "Sat, Oct 10", name: "Design crit: onboarding flow", ds: [{ id: "a", t: "Onboarding becomes three screens", q: "20:04 “Let's cut it to three screens”" }, { id: "b", t: "Test with five clinics next week", q: "39:50 “five clinics is enough to see the patterns”" }] },
  { id: "m2", date: "Sun, Oct 11", name: "Booking cards: dates upfront", ds: [{ id: "c", t: "Show availability dates upfront on booking cards", q: "0:25 “Let's show availability dates upfront on the card itself”" }, { id: "old", t: "Ship on web first in October", q: "0:41 “October works if we keep it to web first”" }] },
  { id: "m3", date: "Sun, Oct 11", name: "Walkthrough: new booking cards", ds: [{ id: "new", t: "Ship to staging on Friday, web only", q: "2:31 “I'll ship them to staging on Friday”" }, { id: "e", t: "Show three slots per card", q: "1:36 “three slots felt like the right balance”" }] },
];

const STATUS: Record<string, string> = { a: "agreed", b: "agreed", c: "agreed", old: "proposed", new: "agreed", e: "proposed" };
const REL_TEXT: Record<Rel, string> = { replaces: "Replaces", same: "Same decision as", builds: "Builds on", conflicts: "Conflicts with", related: "Related to", none: "" };

export default function PebblDecisions() {
  const [view, setView] = useState<"trail" | "map">("trail");
  const [rel, setRel] = useState<Rel | null>(null);
  const [resolved, setResolved] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const oldStatus = rel === "replaces" || (rel === "conflicts" && resolved === "later") ? "superseded" : "proposed";
  const status = (id: string) => (id === "old" ? oldStatus : STATUS[id]);

  const choose = (r: Rel) => {
    setRel(r);
    setResolved(null);
    if (r === "none") setHistory((h) => [...h, "Suggestion dismissed. It won't be offered again for this pair."]);
    else if (r === "replaces") setHistory((h) => [...h, "Linked: “Ship to staging on Friday” replaces “Ship on web first in October”.", "“Ship on web first in October”: proposed → superseded. The original notes are untouched."]);
    else if (r === "conflicts") setHistory((h) => [...h, "Marked as a possible change in decision. Needs a look."]);
    else setHistory((h) => [...h, `Linked: ${REL_TEXT[r].toLowerCase()} “Ship on web first in October”.`]);
  };
  const resolve = (how: "later" | "both") => {
    setResolved(how);
    setHistory((h) => [...h, how === "later" ? "Resolved: the later decision stands. The earlier one is superseded." : "Resolved: both stand, different scope."]);
  };
  const undo = () => {
    setHistory((h) => [...h, rel === "replaces" || resolved === "later" ? "Unlinked. A new entry restores “Ship on web first in October” to proposed; the earlier entries stay." : "Unlinked. The earlier entries stay in the history."]);
    setRel(null);
    setResolved(null);
  };

  const detail =
    rel === null
      ? { tag: "Suggestion", title: "Possibly connected to an earlier decision", text: "Similar wording: ship, web. Computed on the Mac from the words alone, shown on the newer decision only. Pick how they relate." }
      : rel === "none"
        ? { tag: "Dismissed", title: "Not related", text: "Nothing changes, and the pair won't be suggested again." }
        : rel === "conflicts" && !resolved
          ? { tag: "Needs a look", title: "Possible change in decision", text: "Worded as a possible change, never “someone contradicted themselves”. Decide whether the later one stands or both do." }
          : { tag: "Linked", title: `${REL_TEXT[rel]} “Ship on web first in October”`, text: rel === "replaces" || resolved === "later" ? "The older decision is shown superseded, struck through on the map, and still links to the moment it was said." : "Both decisions keep their status. The link shows in both meetings." };

  const linkStyle = rel === "conflicts" ? "6 5" : undefined;

  return (
    <FlowFrame
      skin="pebbl"
      eyebrow="Decisions · never silently rewrite history"
      problem="Decisions drift across meetings. Notes tools overwrite the old answer. pebbl. keeps both, and asks you how they relate."
      controls={
        <>
          <Toggle label="View" value={view} onChange={setView} options={[{ value: "trail", label: "Trail" }, { value: "map", label: "Map" }]} />
          {rel ? <button type="button" className={fs.btn} onClick={undo}>Unlink</button> : null}
        </>
      }
      detail={detail}
      minWidth={0}
    >
      {view === "trail" ? (
        <div className={p.trail}>
          {[...MEETINGS].reverse().filter((m) => m.id !== "m1").map((m) => (
            <div key={m.id} className={p.meeting}>
              <span className={p.meetingHead}>{m.date} · <strong>{m.name}</strong></span>
              {m.ds.filter((d) => d.id === "new" || d.id === "old" || d.id === "c").map((d) => (
                <div key={d.id} className={`${p.dcard} ${status(d.id) === "superseded" ? p.gone : ""}`}>
                  <span className={p.itemRow}>
                    <span className={p.dtitle}>{d.t}</span>
                    <span className={`${p.status} ${p[status(d.id)]}`}>{status(d.id)[0].toUpperCase() + status(d.id).slice(1)}</span>
                  </span>
                  <span className={p.cite}>{d.q}</span>
                  {d.id === "new" && rel === null ? (
                    <div className={p.suggest}>
                      <span>Possibly connected to “Ship on web first in October”. Similar wording: ship, web.</span>
                      <div className={p.chips}>
                        {RELS.map((r) => (
                          <button key={r.id} type="button" className={p.chip} onClick={() => choose(r.id)}>{r.label}</button>
                        ))}
                        <button type="button" className={`${p.chip} ${p.quiet}`} onClick={() => choose("none")}>Not related</button>
                      </div>
                    </div>
                  ) : null}
                  {d.id === "new" && rel === "conflicts" && !resolved ? (
                    <div className={p.suggest}>
                      <span>Possible change in decision. Which stands?</span>
                      <div className={p.chips}>
                        <button type="button" className={p.chip} onClick={() => resolve("later")}>The later one stands</button>
                        <button type="button" className={p.chip} onClick={() => resolve("both")}>Both stand, different scope</button>
                      </div>
                    </div>
                  ) : null}
                  {d.id === "new" && rel && rel !== "none" && !(rel === "conflicts" && !resolved) ? <span className={p.cite}>{REL_TEXT[rel]} “Ship on web first in October”</span> : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <svg className={p.map} viewBox="0 0 720 230" role="group" aria-label="Decision map: meetings by date, decisions linked across them">
          {MEETINGS.map((m, mi) => {
            const x = 10 + mi * 240;
            return (
              <g key={m.id}>
                <text x={x} y="20" fontSize="12.5" fontWeight="600" fill="var(--f-ink)">{m.name.length > 30 ? m.name.slice(0, 29) + "…" : m.name}</text>
                <text x={x} y="38" fontSize="11" fontFamily="var(--mono)" fill="var(--f-dim)">{m.date.replace(/^\w+, /, "")}</text>
                {m.ds.map((d, di) => {
                  const y = 56 + di * 84;
                  const st = status(d.id);
                  return (
                    <g key={d.id}>
                      <rect x={x} y={y} width="220" height="58" rx="10" fill="var(--p-paper)" stroke="var(--f-line)" />
                      <text x={x + 12} y={y + 24} fontSize="12" fill={st === "superseded" ? "var(--f-dim)" : "var(--f-ink)"} textDecoration={st === "superseded" ? "line-through" : undefined}>{d.t.length > 30 ? d.t.slice(0, 29) + "…" : d.t}</text>
                      <text x={x + 12} y={y + 43} fontSize="11" fill="var(--f-dim)">{st[0].toUpperCase() + st.slice(1)}</text>
                    </g>
                  );
                })}
              </g>
            );
          })}
          {/* new (m3, row 0) → old (m2, row 1) */}
          <path d="M490 85 C 478 85, 482 169, 472 169" fill="none" stroke={rel === null ? "var(--p-quiet)" : rel === "none" ? "transparent" : rel === "conflicts" ? "var(--p-clay)" : "var(--f-ink)"} strokeWidth="1.6" strokeDasharray={rel === null ? "2 4" : linkStyle} markerEnd={rel && rel !== "none" ? "url(#pbArrow)" : undefined} />
          <defs>
            <marker id="pbArrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" fill={rel === "conflicts" ? "var(--p-clay)" : "var(--f-ink)"} />
            </marker>
          </defs>
        </svg>
      )}
      {history.length ? (
        <>
          <p className={p.panelHead} style={{ marginTop: 12 }}>History, append-only</p>
          <ol className={p.history}>
            {history.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ol>
        </>
      ) : null}
    </FlowFrame>
  );
}
