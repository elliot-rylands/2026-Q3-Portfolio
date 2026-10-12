"use client";

import { useState } from "react";
import { FlowFrame, Toggle } from "../FlowFrame";

// One meeting, start to "what did we decide?" a week later. Mapped from the
// five jobs in the spec (capture, understand, remember, verify, act). It's the
// journey pebbl. was designed around, not research findings.

type Stage = { id: string; name: string; job: string; doing: string; without: string; withP: string; e0: number; e1: number };
const STAGES: Stage[] = [
  { id: "start", name: "Starting", job: "Capture", doing: "Joins the call. Wonders whether to record.", without: "A bot joins as a participant. Everyone sees “AI notetaker” and the room goes formal.", withP: "Starts from the menu bar, nothing joins the call. The consent line reminds them to say so out loud.", e0: -1, e1: 1 },
  { id: "during", name: "During", job: "Capture", doing: "Talks, half-types notes just in case.", without: "Can't tell if audio is really coming in, so keeps typing as a backup.", withP: "Timer in the menu bar, live meters for both tracks. Stops typing and listens.", e0: -2, e1: 2 },
  { id: "wrap", name: "Wrapping up", job: "Act", doing: "Agrees next steps. Says “I'll send it Friday”.", without: "The promise is buried in a paragraph of summary, assigned to “the team”.", withP: "Said on their own mic and verified, so it lands in My promises with a due date.", e0: -1, e1: 1 },
  { id: "after", name: "Right after", job: "Verify", doing: "Reads the notes, forwards them.", without: "It sounds right but can't be checked. One wrong action and they stop trusting all of it.", withP: "Clicks a decision and hears 0:25. Anything unproven is labelled AI interpretation.", e0: -2, e1: 2 },
  { id: "later", name: "Days later", job: "Remember", doing: "Gets asked “what did we decide?”.", without: "Scrolls old summaries, then rewatches a recording to find one sentence.", withP: "⌘K, types two words, lands on the exact line.", e0: -2, e1: 2 },
  { id: "next", name: "Next meeting", job: "Understand", doing: "The plan changes.", without: "The old answer is silently overwritten. Someone asks who said what.", withP: "pebbl. suggests the link. They choose Replaces it, and both versions stay on record.", e0: -1, e1: 1 },
];

const W = 720;
const colW = W / STAGES.length;
const y = (e: number) => 46 - e * 16;

export default function PebblJourney() {
  const [mode, setMode] = useState<"without" | "with">("without");
  const [sel, setSel] = useState<string | null>(null);
  const withP = mode === "with";
  const st = STAGES.find((s) => s.id === sel);
  const pts = STAGES.map((s, i) => `${colW * i + colW / 2},${y(withP ? s.e1 : s.e0)}`).join(" ");

  return (
    <FlowFrame
      skin="pebbl"
      eyebrow="Journey map · one meeting, and the week after"
      problem="The pain isn't the meeting. It's the moments after, when you need to trust, find or act on what was said."
      controls={<Toggle label="Journey" value={mode} onChange={setMode} options={[{ value: "without", label: "A typical notetaker" }, { value: "with", label: "With pebbl." }]} />}
      detail={st ? { tag: `${st.name} · job: ${st.job}`, title: st.doing, text: withP ? st.withP : st.without } : { tag: withP ? "With pebbl." : "Typical notetaker", title: "Pick a stage", text: "Mapped from the five jobs in the spec: capture, understand, remember, verify, act." }}
      minWidth={600}
    >
      <svg viewBox={`0 0 ${W} 300`} role="group" aria-label="Journey map stages">
        {STAGES.map((s, i) => {
          const x = colW * i;
          const on = sel === s.id;
          return (
            <g key={s.id} role="button" tabIndex={0} aria-pressed={on} aria-label={`${s.name}: ${s.doing}`} onClick={() => setSel(s.id)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setSel(s.id))} style={{ cursor: "pointer", outline: "none" }}>
              <rect x={x + 3} y="0" width={colW - 6} height="300" rx="12" fill={on ? "var(--p-ev-soft)" : "transparent"} />
              <text x={x + colW / 2} y="104" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--f-ink)">{s.name}</text>
              <text x={x + colW / 2} y="120" textAnchor="middle" fontSize="10" fontFamily="var(--mono)" fill="var(--f-dim)">{s.job.toUpperCase()}</text>
              <foreignObject x={x + 8} y="132" width={colW - 16} height="160">
                <div style={{ fontSize: 11, lineHeight: 1.35, color: "var(--f-dim)" }}>
                  <div style={{ color: "var(--f-ink)", marginBottom: 6 }}>{s.doing}</div>
                  <div style={{ padding: "6px 7px", borderRadius: 8, background: withP ? "var(--p-moss-soft)" : "var(--p-clay-soft)", color: "var(--f-ink)", transition: "background-color .3s" }}>{withP ? s.withP : s.without}</div>
                </div>
              </foreignObject>
            </g>
          );
        })}
        <line x1="0" x2={W} y1={y(0)} y2={y(0)} stroke="var(--f-line)" strokeDasharray="3 4" />
        <text x="4" y="12" fontSize="10" fontFamily="var(--mono)" fill="var(--f-dim)">CONFIDENT</text>
        <text x="4" y="86" fontSize="10" fontFamily="var(--mono)" fill="var(--f-dim)">ANXIOUS</text>
        <polyline points={pts} fill="none" stroke={withP ? "var(--p-moss)" : "var(--p-clay)"} strokeWidth="2.2" strokeLinejoin="round" style={{ transition: "all .5s cubic-bezier(.2,.7,.2,1)" }} />
        {STAGES.map((s, i) => (
          <circle key={s.id} cx={colW * i + colW / 2} cy={y(withP ? s.e1 : s.e0)} r="4.5" fill="var(--f-bg)" stroke={withP ? "var(--p-moss)" : "var(--p-clay)"} strokeWidth="2" style={{ transition: "all .5s cubic-bezier(.2,.7,.2,1)" }} />
        ))}
      </svg>
    </FlowFrame>
  );
}
