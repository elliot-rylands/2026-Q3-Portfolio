"use client";

import { useEffect, useState } from "react";
import { FlowFrame, Toggle, flowStyles as s, nodeProps } from "./FlowFrame";

// Three lanes: the tenant, the AI agent, the property manager. "Before"
// shows every channel landing on one person.
type Lane = "t" | "a" | "m";
type Node = { id: string; lane: Lane; x: number; label: string; title: string; text: string };

const LANE: Record<Lane, number> = { t: 92, a: 172, m: 252 };
const LANE_NAME: Record<Lane, string> = { t: "Tenant", a: "AI agent", m: "Manager" };
const NODES: Node[] = [
  { id: "ask", lane: "t", x: 130, label: "Asks", title: "Any channel", text: "A tenant asks when their lease ends, by text, email or a call." },
  { id: "und", lane: "a", x: 225, label: "Understands", title: "Context across channels", text: "A call after an email isn't a fresh start. The agent keeps the thread." },
  { id: "lease", lane: "a", x: 320, label: "Reads lease", title: "Answers from the document", text: "Leases are read with OCR and visual models for expiry dates and payment terms." },
  { id: "ans", lane: "t", x: 415, label: "Answered", title: "Their own terms", text: "The tenant gets an answer from their lease, not a generic reply." },
  { id: "log", lane: "m", x: 415, label: "Logged", title: "On the dashboard", text: "It lands as resolved, with the question and the answer side by side to check." },
  { id: "step", lane: "m", x: 510, label: "Steps in", title: "Only the exceptions", text: "Anything the agent can't answer stays unresolved, with Send Email and Send SMS to hand." },
  { id: "renew", lane: "m", x: 605, label: "Renewal alert", title: "Before the tenant asks", text: "Lease expiry spotted early, so the manager hears about a renewal first." },
  { id: "book", lane: "m", x: 700, label: "Booked", title: "Into the calendar", text: "Inspections and works go into the calendar, tied to the unit and tenant." },
];
const ORDER = NODES.map((n) => n.id);
const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));
const LINKS: [string, string][] = [
  ["ask", "und"],
  ["lease", "ans"],
  ["lease", "log"],
];
const P = (id: string) => ({ x: byId[id].x, y: LANE[byId[id].lane] });

const BEFORE = [
  { id: "b1", x: 190, y: LANE.t, label: "Phone", text: "Calls interrupt whatever the manager was doing." },
  { id: "b2", x: 330, y: LANE.t, label: "SMS", text: "Texts arrive on a personal phone, at any hour." },
  { id: "b3", x: 470, y: LANE.t, label: "Email", text: "The same questions again, in a third inbox." },
  { id: "b4", x: 610, y: LANE.t, label: "Lease PDF", text: "Every answer means digging out the lease by hand." },
];
const MANAGER = { x: 400, y: LANE.m };

export default function TerrFlow() {
  const [mode, setMode] = useState<"before" | "after">("before");
  const [sel, setSel] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setSel((cur) => {
        const i = cur ? ORDER.indexOf(cur) : -1;
        if (i >= ORDER.length - 1) {
          setPlaying(false);
          return cur;
        }
        return ORDER[i + 1];
      });
    }, 1400);
    return () => clearInterval(t);
  }, [playing]);

  const after = mode === "after";
  const reached = sel ? ORDER.indexOf(sel) : -1;
  const node = sel ? byId[sel] : null;
  const b = BEFORE.find((x) => x.id === sel);

  const detail = after
    ? node
      ? { tag: `Step ${ORDER.indexOf(node.id) + 1} · ${LANE_NAME[node.lane]}`, title: node.title, text: node.text }
      : { tag: "After", title: "The agent answers, the manager checks", text: "Press “Follow a question”, or pick a step. Tenant on top, agent in the middle, manager below." }
    : b
      ? { tag: "Before", title: b.label, text: b.text }
      : { tag: "Before", title: "Every channel lands on one person", text: "Up to 75% of a manager's day can go on tenant inquiries, most of them repeats." };

  return (
    <FlowFrame
      skin="terr"
      eyebrow="Terr.ai · one question, three lanes"
      problem="Tenants ask the same questions on every channel. Managers answer all of them, by hand, from the lease."
      controls={
        <>
          <Toggle label="View" value={mode} onChange={(v) => { setMode(v); setSel(null); setPlaying(false); }} options={[{ value: "before", label: "Before" }, { value: "after", label: "After" }]} />
          {after ? (
            <button type="button" className={s.btn} aria-pressed={playing} onClick={() => { setSel(ORDER[0]); setPlaying(true); }}>
              {playing ? "Following…" : "▶ Follow a question"}
            </button>
          ) : null}
        </>
      }
      detail={detail}
      ship={{ steps: ["Prototypes validated by the AI architect", "Dashboard", "Calendar, six versions", "Flow videos for each cycle", "Website and illustration system"] }}
    >
      <svg viewBox="0 40 780 268" role="group" aria-label="Terr.ai tenant, agent and manager journey">
        {(["t", "a", "m"] as Lane[]).map((l) => (
          <g key={l}>
            <rect x="0" y={LANE[l] - 34} width="780" height="68" rx="14" fill="var(--f-panel)" />
            <text x="16" y={LANE[l] + 4} fontSize="11" fontWeight="600" fontFamily="var(--mono)" fill="var(--f-ink)">{LANE_NAME[l].toUpperCase()}</text>
          </g>
        ))}

        <g className={s.fade} style={{ opacity: after ? 1 : 0, pointerEvents: after ? "auto" : "none" }}>
          <path d={`M225 ${LANE.a} H320`} stroke="var(--f-line)" strokeWidth="2" />
          <path d={`M415 ${LANE.m} H700`} stroke="var(--f-line)" strokeWidth="2" />
          <path d={`M130 ${LANE.t} H415`} stroke="var(--f-line)" strokeWidth="2" strokeDasharray="3 5" />
          {LINKS.map(([a, z]) => {
            const p = P(a);
            const q = P(z);
            const lit = reached >= Math.max(ORDER.indexOf(a), ORDER.indexOf(z));
            const d = q.y > p.y ? 1 : -1;
            return <path key={a + z} className={s.fade} d={`M${p.x} ${p.y + 12 * d} C${p.x} ${(p.y + q.y) / 2}, ${q.x} ${(p.y + q.y) / 2}, ${q.x} ${q.y - 14 * d}`} fill="none" stroke={lit ? "var(--f-accent)" : "var(--f-dim)"} strokeWidth="1.6" markerEnd="url(#terrArrow)" opacity={lit ? 1 : 0.55} />;
          })}
          {NODES.map((n, i) => {
            const { x, y } = P(n.id);
            const on = sel === n.id;
            const done = reached >= i;
            return (
              <g key={n.id} {...nodeProps(`Step ${i + 1}, ${n.label}: ${n.title}`, on, () => { setPlaying(false); setSel(n.id); })}>
                <circle className={`ring ${s.fade}`} cx={x} cy={y} r={on ? 14 : 12} fill={done ? "var(--f-accent)" : "var(--f-bg)"} stroke="var(--f-accent)" strokeWidth="1.8" />
                <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={done ? "var(--f-on-accent)" : "var(--f-accent)"}>{i + 1}</text>
                <text x={x} y={y - 20} textAnchor="middle" fontSize="12" fontWeight={on ? 700 : 500} fill="var(--f-ink)">{n.label}</text>
              </g>
            );
          })}
        </g>

        <g className={s.fade} style={{ opacity: after ? 0 : 1, pointerEvents: after ? "none" : "auto" }}>
          {BEFORE.map((x) => (
            <path key={x.id} d={`M${x.x} ${x.y + 12} L${MANAGER.x} ${MANAGER.y - 18}`} stroke="var(--f-dim)" strokeWidth="1.4" strokeDasharray="4 4" />
          ))}
          <g transform={`translate(${MANAGER.x} ${MANAGER.y})`}>
            <rect x="-96" y="-18" width="192" height="36" rx="18" fill="var(--f-bg)" stroke="var(--f-ink)" strokeWidth="1.6" />
            <text x="0" y="5" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="var(--f-ink)">One property manager</text>
          </g>
          <text x={MANAGER.x} y={LANE.a + 4} textAnchor="middle" fontSize="11.5" fill="var(--f-dim)">no agent, no shared record</text>
          {BEFORE.map((x, i) => {
            const on = sel === x.id;
            return (
              <g key={x.id} {...nodeProps(x.label, on, () => setSel(x.id))}>
                <circle className="ring" cx={x.x} cy={x.y} r={on ? 14 : 12} fill={on ? "var(--f-ink)" : "var(--f-bg)"} stroke="var(--f-ink)" strokeWidth="1.6" />
                <text x={x.x} y={x.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={on ? "var(--f-bg)" : "var(--f-ink)"}>{i + 1}</text>
                <text x={x.x} y={x.y - 20} textAnchor="middle" fontSize="12" fontWeight="500" fill="var(--f-ink)">{x.label}</text>
              </g>
            );
          })}
        </g>

        <defs>
          <marker id="terrArrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L8 4 L0 8 z" fill="var(--f-accent)" />
          </marker>
        </defs>
      </svg>
    </FlowFrame>
  );
}
