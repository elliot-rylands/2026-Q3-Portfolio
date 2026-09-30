"use client";

import { useEffect, useState } from "react";
import { FlowFrame, Toggle, flowStyles as s, nodeProps } from "./FlowFrame";

// Two lanes, one order. Numbers show the order things happen in, across both
// sides. "Before" shows the single inbox everything used to run through.
type Node = { id: string; lane: "p" | "c"; x: number; label: string; title: string; text: string };

const LANE = { p: 96, c: 226 };
const NODES: Node[] = [
  { id: "ref", lane: "p", x: 120, label: "Referral", title: "Arrive already known", text: "The welcome names who referred you, what for, and what happens next." },
  { id: "det", lane: "p", x: 205, label: "Details", title: "Pre-filled from the referral", text: "Your details are editable. The scan is locked, because the clinician ordered it." },
  { id: "cmp", lane: "p", x: 290, label: "Compare", title: "Price before payment", text: "Every centre shows its price and what's included, from the first comparison. The first version failed on price in testing, so this came first." },
  { id: "saf", lane: "p", x: 375, label: "Safety", title: "Safety questions", text: "The booking summary stays on screen, and nothing changes between here and payment." },
  { id: "pay", lane: "p", x: 460, label: "Pay", title: "Book and pay first", text: "The booking is made before any account exists." },
  { id: "ord", lane: "c", x: 460, label: "Order in", title: "The order reaches the centre", text: "It lands in one worklist as pending, with a clock on it. No email thread." },
  { id: "acc", lane: "p", x: 545, label: "Account", title: "Account second", text: "Set a password on the confirmation page, where the account has a clear job: managing the booking and getting results." },
  { id: "flg", lane: "c", x: 545, label: "Flagged", title: "Safety answers arrive flagged", text: "A pacemaker answer from the safety step is flagged on the order, so nobody finds out at the scanner." },
  { id: "wrk", lane: "c", x: 630, label: "Tracked", title: "Nine statuses", text: "From pending to results sent, with at-risk flags so the centre sees what's late first." },
  { id: "snt", lane: "c", x: 715, label: "Sent", title: "Results to the referrer", text: "Results go back to the clinician who made the referral." },
  { id: "res", lane: "p", x: 715, label: "Results", title: "Results for the patient", text: "In the same account the booking created." },
];
const ORDER = NODES.map((n) => n.id);
const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));
const LINKS: [string, string][] = [
  ["pay", "ord"],
  ["saf", "flg"],
  ["snt", "res"],
];
const P = (id: string) => ({ x: byId[id].x, y: LANE[byId[id].lane] });

const BEFORE = [
  { id: "b1", x: 190, y: LANE.p, label: "Find a centre", text: "The website could show you a scan near you. That's where the product stopped." },
  { id: "b2", x: 330, y: LANE.p, label: "Email to book", text: "Booking, changing and cancelling were all emails." },
  { id: "b3", x: 470, y: LANE.c, label: "Retype it", text: "Centres typed every request into their own systems by hand." },
  { id: "b4", x: 640, y: LANE.c, label: "Chase by email", text: "Every “where's my scan?” was another thread." },
];
const INBOX = { x: 400, y: 161 };

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
    }, 1400);
    return () => clearInterval(t);
  }, [playing]);

  const after = mode === "after";
  const reached = sel ? ORDER.indexOf(sel) : -1;
  const node = sel ? byId[sel] : null;
  const b = BEFORE.find((x) => x.id === sel);

  const detail = after
    ? node
      ? { tag: `Step ${ORDER.indexOf(node.id) + 1} · ${node.lane === "p" ? "Patient" : "Centre"}`, title: node.title, text: node.text }
      : { tag: "After", title: "One order, shared by both sides", text: "Press “Follow an order”, or pick a number. Patient steps run along the top, the centre's along the bottom." }
    : b
      ? { tag: "Before", title: b.label, text: b.text }
      : { tag: "Before", title: "Everything ran through one inbox", text: "Patients emailed to book, change and cancel. Centres retyped every request and chased by email." };

  return (
    <FlowFrame
      skin="scan"
      eyebrow="Scan.com · one order, two sides"
      problem="Patients stuck on NHS waiting lists could find a private scan. Everything after that ran on email, on both sides."
      controls={
        <>
          <Toggle label="View" value={mode} onChange={(v) => { setMode(v); setSel(null); setPlaying(false); }} options={[{ value: "before", label: "Before" }, { value: "after", label: "After" }]} />
          {after ? (
            <button type="button" className={s.btn} aria-pressed={playing} onClick={() => { setSel(ORDER[0]); setPlaying(true); }}>
              {playing ? "Following…" : "▶ Follow an order"}
            </button>
          ) : null}
        </>
      }
      detail={detail}
      ship={{ steps: ["Coded prototypes in GitHub, on the real tokens", "Usability sessions with patients and centre staff", "Referral journey", "Booking flow", "Mobile search", "Centre worklist, piloted with centres"] }}
    >
      <svg viewBox="0 40 760 240" role="group" aria-label="Scan.com patient and centre journey">
        <rect x="0" y="52" width="760" height="88" rx="14" fill="var(--f-panel)" />
        <rect x="0" y="182" width="760" height="88" rx="14" fill="var(--f-panel)" />
        <text x="16" y={LANE.p + 4} fontSize="11" fontWeight="600" fontFamily="var(--mono)" fill="var(--f-ink)">PATIENT</text>
        <text x="16" y={LANE.c + 4} fontSize="11" fontWeight="600" fontFamily="var(--mono)" fill="var(--f-ink)">CENTRE</text>

        {/* After */}
        <g className={s.fade} style={{ opacity: after ? 1 : 0, pointerEvents: after ? "auto" : "none" }}>
          <path d={`M120 ${LANE.p} H715`} stroke="var(--f-line)" strokeWidth="2" />
          <path d={`M460 ${LANE.c} H715`} stroke="var(--f-line)" strokeWidth="2" />
          {LINKS.map(([a, z]) => {
            const p = P(a);
            const q = P(z);
            const lit = reached >= Math.max(ORDER.indexOf(a), ORDER.indexOf(z));
            const d = q.y > p.y ? 1 : -1;
            return <path key={a + z} className={s.fade} d={`M${p.x} ${p.y + 12 * d} C${p.x} ${(p.y + q.y) / 2}, ${q.x} ${(p.y + q.y) / 2}, ${q.x} ${q.y - 14 * d}`} fill="none" stroke={lit ? "var(--f-accent)" : "var(--f-dim)"} strokeWidth="1.6" markerEnd="url(#scanArrow)" opacity={lit ? 1 : 0.55} />;
          })}
          {NODES.map((n, i) => {
            const { x, y } = P(n.id);
            const on = sel === n.id;
            const done = reached >= i;
            return (
              <g key={n.id} {...nodeProps(`Step ${i + 1}, ${n.label}: ${n.title}`, on, () => { setPlaying(false); setSel(n.id); })}>
                <circle className={`ring ${s.fade}`} cx={x} cy={y} r={on ? 14 : 12} fill={done ? "var(--f-accent)" : "var(--f-bg)"} stroke="var(--f-accent)" strokeWidth="1.8" />
                <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={done ? "var(--f-on-accent)" : "var(--f-accent)"}>{i + 1}</text>
                <text x={x} y={n.lane === "p" ? y - 22 : y + 32} textAnchor="middle" fontSize="12.5" fontWeight={on ? 700 : 500} fill="var(--f-ink)">{n.label}</text>
              </g>
            );
          })}
        </g>

        {/* Before */}
        <g className={s.fade} style={{ opacity: after ? 0 : 1, pointerEvents: after ? "none" : "auto" }}>
          {BEFORE.map((x) => (
            <path key={x.id} d={`M${x.x} ${x.y} L${INBOX.x} ${INBOX.y}`} stroke="var(--f-dim)" strokeWidth="1.4" strokeDasharray="4 4" />
          ))}
          <g transform={`translate(${INBOX.x} ${INBOX.y})`}>
            <rect x="-86" y="-19" width="172" height="38" rx="19" fill="var(--f-bg)" stroke="var(--f-ink)" strokeWidth="1.6" />
            <path d="M-66 -7 h22 v14 h-22 z M-66 -7 l11 8 l11 -8" fill="none" stroke="var(--f-ink)" strokeWidth="1.4" />
            <text x="-34" y="5" fontSize="12.5" fontWeight="600" fill="var(--f-ink)">One email inbox</text>
          </g>
          {BEFORE.map((x, i) => {
            const on = sel === x.id;
            return (
              <g key={x.id} {...nodeProps(x.label, on, () => setSel(x.id))}>
                <circle className="ring" cx={x.x} cy={x.y} r={on ? 14 : 12} fill={on ? "var(--f-ink)" : "var(--f-bg)"} stroke="var(--f-ink)" strokeWidth="1.6" />
                <text x={x.x} y={x.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={on ? "var(--f-bg)" : "var(--f-ink)"}>{i + 1}</text>
                <text x={x.x} y={x.y < 150 ? x.y - 22 : x.y + 32} textAnchor="middle" fontSize="12.5" fontWeight="500" fill="var(--f-ink)">{x.label}</text>
              </g>
            );
          })}
        </g>

        <defs>
          <marker id="scanArrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L8 4 L0 8 z" fill="var(--f-accent)" />
          </marker>
        </defs>
      </svg>
    </FlowFrame>
  );
}
