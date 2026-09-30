"use client";

import { useState } from "react";
import { FlowFrame, Toggle, flowStyles as s, nodeProps } from "./FlowFrame";

// A ring of 29 departments. Before, every one of them routes to the contact
// centre. After, they all route into one hub, which ends in a finished task.
const C = { x: 240, y: 170 };
const R = 118;
const DEPTS = Array.from({ length: 29 }, (_, i) => {
  const a = (i / 29) * Math.PI * 2 - Math.PI / 2;
  return { x: C.x + Math.cos(a) * R, y: C.y + Math.sin(a) * R };
});
const PHONE = { x: 600, y: 170 };
const DONE = { x: 600, y: 120 };
const CHAT = { x: 600, y: 226 };

const TASKS = [
  { id: "pay", label: "My payslip", before: "Where's my payslip? Depends where you work, and what your department's portal calls it.", after: "One search, whichever department you're in, because the structure is built around the task, not the org chart." },
  { id: "form", label: "Find a form", before: "Finding a form meant knowing your department's name for it. Easier to ring and ask.", after: "The same form, found the same way from all 29 departments. From Nov 2022, completed end to end without a call." },
  { id: "help", label: "Get help", before: "The contact centre was the fastest route, so that's where everyone went.", after: "Help and live chat inside the hub, so a question doesn't have to become a call." },
];

const INFO: Record<string, { title: string; text: string }> = {
  depts: { title: "29 departments, 29 vocabularies", text: "Each had its own intranet or portal, its own words for things and its own way of doing admin." },
  phone: { title: "The contact centre", text: "Every call that could have been a click lands here, as contact centre time." },
  hub: { title: "myHub", text: "A shared framework under the departmental hubs (nine when Squiz published its story), with one structure and one search, designed first for the person most likely to phone." },
  fed: { title: "Two instances, one search", text: "Security meant two separate instances of the Squiz DXP. Federated search means nobody has to know that." },
  done: { title: "Done online", text: "The measure that mattered: tasks finished without a call." },
  chat: { title: "Live chat", text: "For the questions that still need a person, without a phone queue." },
};

export default function GovFlow() {
  const [mode, setMode] = useState<"before" | "after">("before");
  const [task, setTask] = useState<string | null>(null);
  const [sel, setSel] = useState<string | null>(null);
  const after = mode === "after";
  const t = TASKS.find((x) => x.id === task);
  const detail = sel ? { ...INFO[sel], tag: after ? "After" : "Before" } : t ? { tag: t.label, title: after ? "One route" : "Twenty-nine routes", text: after ? t.after : t.before } : null;
  const hot = task ? DEPTS[task === "pay" ? 3 : task === "form" ? 12 : 21] : null;

  return (
    <FlowFrame
      skin="gov"
      eyebrow="UK Government · SSCL myHub"
      problem="29 departments, each with its own intranet and its own words for the same task. So civil servants picked up the phone."
      minWidth={580}
      controls={
        <>
          <Toggle label="Route" value={mode} onChange={(v) => { setMode(v); setSel(null); }} options={[{ value: "before", label: "Before" }, { value: "after", label: "After" }]} />
          {TASKS.map((x) => (
            <button key={x.id} type="button" className={s.btn} aria-pressed={task === x.id} onClick={() => { setTask(x.id); setSel(null); }}>
              {x.label}
            </button>
          ))}
        </>
      }
      detail={detail}
      ship={{ ordered: true, steps: ["Discovery with SSCL, 2019", "Research across departments", "IA and core flows", "Features released a step at a time", "Nov 2022: first connected form"] }}
    >
      <svg viewBox="0 0 720 340" role="group" aria-label="Departments routing to the phone, or to myHub">
        {/* before: every department to the phone */}
        <g className={s.fade} style={{ opacity: after ? 0 : 1 }}>
          {DEPTS.map((d, i) => (
            <path key={i} d={`M${d.x} ${d.y} Q ${(d.x + PHONE.x) / 2} ${d.y}, ${PHONE.x - 30} ${PHONE.y}`} fill="none" stroke={hot === d ? "var(--f-ink)" : "var(--f-line)"} strokeWidth={hot === d ? 2.4 : 1} />
          ))}
        </g>
        {/* after: every department into the hub */}
        <g className={s.fade} style={{ opacity: after ? 1 : 0 }}>
          {DEPTS.map((d, i) => (
            <path key={i} d={`M${d.x} ${d.y} L${C.x + (d.x - C.x) * 0.42} ${C.y + (d.y - C.y) * 0.42}`} stroke={hot === d ? "var(--f-ink)" : "var(--f-line)"} strokeWidth={hot === d ? 2.4 : 1.2} />
          ))}
          <path d={`M${C.x + 50} ${C.y} C 470 ${C.y}, 470 ${DONE.y}, ${DONE.x - 34} ${DONE.y}`} fill="none" stroke="var(--f-ink)" strokeWidth={task ? 3 : 2} />
          <path d={`M${C.x + 50} ${C.y} C 470 ${C.y}, 470 ${CHAT.y}, ${CHAT.x - 34} ${CHAT.y}`} fill="none" stroke="var(--f-line)" strokeWidth="1.4" />
        </g>

        <g {...nodeProps("29 departments", sel === "depts", () => setSel("depts"))}>
          {DEPTS.map((d, i) => (
            <circle key={i} className={i === 0 ? "ring" : undefined} cx={d.x} cy={d.y} r={hot === d ? 7 : 5} fill={hot === d ? "var(--f-ink)" : "var(--f-bg)"} stroke="var(--f-ink)" strokeWidth="1.6" />
          ))}
          <text x={C.x} y={C.y - R - 18} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--f-ink)">29 DEPARTMENTS</text>
        </g>

        {/* before: the phone */}
        <g className={s.fade} style={{ opacity: after ? 0 : 1, pointerEvents: after ? "none" : "auto" }}>
          <g {...nodeProps("Contact centre", sel === "phone", () => setSel("phone"))}>
            <rect className="ring" x={PHONE.x - 30} y={PHONE.y - 30} width="60" height="60" fill="var(--f-ink)" />
            <path d={`M${PHONE.x - 12} ${PHONE.y - 14} q -4 18 14 30 l 8 -8 -8 -8 -6 4 q -8 -6 -6 -14 l 6 -2 -2 -10 z`} fill="var(--f-bg)" />
            <text x={PHONE.x} y={PHONE.y + 50} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--f-ink)">Contact centre</text>
            <text x={PHONE.x} y={PHONE.y + 66} textAnchor="middle" fontSize="11" fill="var(--f-dim)">the fastest route</text>
          </g>
        </g>

        {/* after: the hub */}
        <g className={s.fade} style={{ opacity: after ? 1 : 0, pointerEvents: after ? "auto" : "none" }}>
          <g {...nodeProps("myHub", sel === "hub", () => setSel("hub"))}>
            <circle className="ring" cx={C.x} cy={C.y} r="50" fill="var(--f-ink)" />
            <text x={C.x} y={C.y - 12} textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--f-bg)">myHub</text>
          </g>
          <g {...nodeProps("Federated search across two instances", sel === "fed", () => setSel("fed"))}>
            <circle className="ring" cx={C.x - 14} cy={C.y + 14} r="10" fill="none" stroke="var(--f-bg)" strokeWidth="1.6" />
            <circle cx={C.x + 14} cy={C.y + 14} r="10" fill="none" stroke="var(--f-bg)" strokeWidth="1.6" />
            <path d={`M${C.x - 4} ${C.y + 14} H${C.x + 4}`} stroke="var(--f-bg)" strokeWidth="2" />
          </g>
          <g {...nodeProps("Done online", sel === "done", () => setSel("done"))}>
            <rect className="ring" x={DONE.x - 38} y={DONE.y - 16} width="112" height="32" fill="var(--f-ink)" />
            <text x={DONE.x + 18} y={DONE.y + 5} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--f-bg)">Done online ✓</text>
          </g>
          <g {...nodeProps("Live chat", sel === "chat", () => setSel("chat"))}>
            <rect className="ring" x={CHAT.x - 34} y={CHAT.y - 14} width="100" height="28" fill="var(--f-bg)" stroke="var(--f-ink)" strokeWidth="1.6" />
            <text x={CHAT.x + 16} y={CHAT.y + 5} textAnchor="middle" fontSize="12" fill="var(--f-ink)">Live chat</text>
          </g>
        </g>
      </svg>
    </FlowFrame>
  );
}
