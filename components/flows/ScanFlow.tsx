"use client";

import { useEffect, useState } from "react";
import { FlowFrame, Toggle, flowStyles as s, nodeProps } from "./FlowFrame";

// Two swimlanes, one order: the patient books above, the imaging centre works
// the same order below. "Before" collapses everything into an email inbox.
type Node = { id: string; lane: "p" | "c"; x: number; label: string; title: string; text: string };

const LANE = { p: 92, c: 232 };
const AFTER: Node[] = [
  { id: "ref", lane: "p", x: 78, label: "Referral", title: "Arrive already known", text: "The welcome names who referred you, what for, and the three things that happen next." },
  { id: "det", lane: "p", x: 168, label: "Details", title: "Pre-filled from the referral", text: "Your details are editable. The scan is locked, with a note on who to contact if it looks wrong." },
  { id: "cmp", lane: "p", x: 258, label: "Compare", title: "Price before payment", text: "Every centre shows its price with “What's included?” from the first comparison, the fix for the first version failing on price." },
  { id: "saf", lane: "p", x: 348, label: "Safety", title: "Safety questions, summary on screen", text: "The centre, time, scan, inclusions and total stay visible. Nothing changes between here and payment." },
  { id: "pay", lane: "p", x: 438, label: "Pay", title: "Book and pay first", text: "The booking happens before any account exists." },
  { id: "acc", lane: "p", x: 528, label: "Account", title: "Account second", text: "Set a password on the confirmation page, where the account has an obvious job: managing the booking and getting results." },
  { id: "res", lane: "p", x: 648, label: "Results", title: "Results in the same place", text: "The account the booking created is where results arrive." },
  { id: "ord", lane: "c", x: 438, label: "Order in", title: "One worklist, not an inbox", text: "The order lands in the centre's worklist as pending, with an SLA clock running." },
  { id: "flg", lane: "c", x: 518, label: "Flagged", title: "Safety answers arrive flagged", text: "A pacemaker answer from step 3 is flagged on the order, so nobody finds out at the scanner." },
  { id: "wrk", lane: "c", x: 588, label: "9 statuses", title: "Pending to results sent", text: "Nine statuses with at-risk flags, so the centre sees what's late before the patient does." },
  { id: "snt", lane: "c", x: 668, label: "Sent", title: "Back to the referrer", text: "Results go back to the referring provider, closing the loop the referral opened." },
];
const ORDER = ["ref", "det", "cmp", "saf", "pay", "ord", "acc", "flg", "wrk", "snt", "res"];
const LINKS: [string, string, boolean][] = [
  ["pay", "ord", false],
  ["saf", "flg", true],
  ["snt", "res", false],
];
const pos = (n: Node) => ({ x: n.x, y: LANE[n.lane] });
const byId = Object.fromEntries(AFTER.map((n) => [n.id, n]));

const BEFORE = [
  { id: "b1", x: 150, y: 92, label: "Find a centre", text: "The website could show you a scan near you. That was where the product stopped." },
  { id: "b2", x: 300, y: 92, label: "Email to book", text: "Booking, changing and cancelling all happened by email." },
  { id: "b3", x: 450, y: 232, label: "Retype it", text: "Centres typed every request into their own systems by hand." },
  { id: "b4", x: 600, y: 232, label: "Chase by email", text: "Every status question was another thread." },
];

export default function ScanFlow() {
  const [mode, setMode] = useState<"after" | "before">("before");
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
    }, 1300);
    return () => clearInterval(t);
  }, [playing]);

  const after = mode === "after";
  const reached = sel ? ORDER.indexOf(sel) : -1;
  const node = sel ? byId[sel] : null;
  const bNode = BEFORE.find((b) => b.id === sel);

  return (
    <FlowFrame
      skin="scan"
      eyebrow="Scan.com · one order, two sides"
      problem="Patients stuck on NHS waiting lists could find a private scan. Everything after that ran on email, on both sides."
      controls={
        <>
          <Toggle label="View" value={mode} onChange={(v) => { setMode(v); setSel(null); setPlaying(false); }} options={[{ value: "before", label: "Before: email" }, { value: "after", label: "After" }]} />
          {after ? (
            <button type="button" className={s.btn} onClick={() => { setSel(ORDER[0]); setPlaying(true); }}>
              {playing ? "Following…" : "Follow an order"}
            </button>
          ) : null}
        </>
      }
      detail={after ? (node ? { tag: node.lane === "p" ? "Patient" : "Centre", title: node.title, text: node.text } : null) : bNode ? { tag: "Before", title: bNode.label, text: bNode.text } : null}
      ship={{ steps: ["Coded prototypes in GitHub, on the real tokens", "Usability sessions with patients and centre staff", "Referral journey", "Booking flow", "Mobile search", "Centre worklist, piloted with centres"] }}
    >
      <svg viewBox="0 0 720 300" role="group" aria-label="Scan.com patient and centre journey">
        <rect x="8" y="48" width="704" height="88" rx="14" fill="var(--f-panel)" />
        <rect x="8" y="188" width="704" height="88" rx="14" fill="var(--f-panel)" />
        <text x="22" y="128" fontSize="10.5" fontFamily="var(--mono)" fill="var(--f-dim)">PATIENT</text>
        <text x="22" y="268" fontSize="10.5" fontFamily="var(--mono)" fill="var(--f-dim)">IMAGING CENTRE</text>

        {/* After */}
        <g className={s.fade} style={{ opacity: after ? 1 : 0, pointerEvents: after ? "auto" : "none" }}>
          <path d={`M78 ${LANE.p} H648`} stroke="var(--f-line)" strokeWidth="2" />
          <path d={`M438 ${LANE.c} H668`} stroke="var(--f-line)" strokeWidth="2" />
          {LINKS.map(([a, b, dashed]) => {
            const p = pos(byId[a]);
            const q = pos(byId[b]);
            const lit = reached >= Math.max(ORDER.indexOf(a), ORDER.indexOf(b));
            return (
              <path key={a + b} className={s.fade} d={`M${p.x} ${p.y} C${p.x} ${(p.y + q.y) / 2}, ${q.x} ${(p.y + q.y) / 2}, ${q.x} ${q.y}`} fill="none" stroke={lit ? "var(--f-accent)" : "var(--f-line)"} strokeWidth="1.6" strokeDasharray={dashed ? "4 4" : undefined} />
            );
          })}
          {AFTER.map((n) => {
            const { x, y } = pos(n);
            const on = sel === n.id;
            const done = reached >= ORDER.indexOf(n.id);
            return (
              <g key={n.id} {...nodeProps(`${n.label}: ${n.title}`, on, () => { setPlaying(false); setSel(n.id); })}>
                <circle cx={x} cy={y} r="16" fill="transparent" />
                <circle className={`ring ${s.fade}`} cx={x} cy={y} r={on ? 9 : 7} fill={done ? "var(--f-accent)" : "var(--f-bg)"} stroke={done ? "var(--f-accent)" : "var(--f-dim)"} strokeWidth="1.6" />
                <text x={x} y={n.lane === "p" ? y - 16 : y + 24} textAnchor="middle" fontSize="11.5" fill={on ? "var(--f-ink)" : "var(--f-dim)"} fontWeight={on ? 600 : 400}>
                  {n.label}
                </text>
              </g>
            );
          })}
          {Array.from({ length: 7 }, (_, i) => (
            <circle key={i} cx={548 + i * 9.5} cy={LANE.c} r="1.6" fill="var(--f-dim)" />
          ))}
        </g>

        {/* Before */}
        <g className={s.fade} style={{ opacity: after ? 0 : 1, pointerEvents: after ? "none" : "auto" }}>
          {BEFORE.map((b) => (
            <path key={b.id} d={`M${b.x} ${b.y} L375 162`} stroke="var(--f-line)" strokeWidth="1.4" strokeDasharray="3 4" />
          ))}
          <g transform="translate(375 162)">
            <rect x="-34" y="-17" width="68" height="34" rx="6" fill="var(--f-bg)" stroke="var(--f-dim)" />
            <path d="M-34 -17 L0 4 L34 -17" fill="none" stroke="var(--f-dim)" />
            <text y="32" textAnchor="middle" fontSize="11" fill="var(--f-dim)">Email</text>
          </g>
          {BEFORE.map((b) => {
            const on = sel === b.id;
            return (
              <g key={b.id} {...nodeProps(b.label, on, () => setSel(b.id))}>
                <circle className="ring" cx={b.x} cy={b.y} r={on ? 9 : 7} fill={on ? "var(--f-ink)" : "var(--f-bg)"} stroke="var(--f-dim)" strokeWidth="1.6" />
                <text x={b.x} y={b.y < 150 ? b.y - 16 : b.y + 24} textAnchor="middle" fontSize="11.5" fill="var(--f-dim)">
                  {b.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </FlowFrame>
  );
}
