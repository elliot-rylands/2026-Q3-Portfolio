"use client";

import { useState } from "react";
import { FlowFrame, Toggle, flowStyles as s, nodeProps } from "./FlowFrame";

// A loop drawn over a court. The ball travels round the drill loop one shot at
// a time; "Before" swaps it for the old controller's grid of numbered buttons.
const C = { x: 360, y: 192 };
const RX = 272;
const RY = 132;
const STEPS = [
  { id: "connect", label: "Connect", title: "Auto connect", text: "Open the app and it looks for the machine straight away. If it can't find it, onboarding points at the real On/Off button." },
  { id: "pick", label: "Pick a drill", title: "Sports and names, not slots", text: "A tennis ball or a pickleball, and the name you gave the drill. D1 to D8 became an engineering detail." },
  { id: "see", label: "See it", title: "The court, not a table", text: "The target zone lights up and each ball's arc is drawn. Height, speed, direction, delay and spin, per ball." },
  { id: "sim", label: "Simulate", title: "Watch it before it fires", text: "Play the drill out on screen before a single ball leaves the machine." },
  { id: "session", label: "MegaDrill", title: "One tap, a whole session", text: "Tick several drills and they queue in a tray, in order, with one Start." },
  { id: "share", label: "Share by QR", title: "Drills that travel", text: "A coach builds a session and posts it with a QR code. Anyone watching scans it straight onto their machine." },
  { id: "coach", label: "Community", title: "Where players already are", text: "Search shared drills, find players who play like you, and jump out to the channels where coaches post. Then back to picking a drill." },
];
const at = (i: number) => {
  const a = (i / STEPS.length) * Math.PI * 2 - Math.PI * 0.62;
  return { x: C.x + Math.cos(a) * RX, y: C.y + Math.sin(a) * RY };
};

export default function TitanFlow() {
  const [mode, setMode] = useState<"before" | "after">("before");
  const [i, setI] = useState(0);
  const [sel, setSel] = useState<number | null>(null);
  const after = mode === "after";
  const ball = at(i);
  const step = sel !== null ? STEPS[sel] : null;

  const go = (n: number) => {
    setI(n);
    setSel(n);
  };

  return (
    <FlowFrame
      skin="titan"
      eyebrow="Titan · the drill loop"
      problem="A serious ball machine with a spreadsheet for a remote: numbered buttons, a table of raw values, and a help page to decode them."
      minWidth={580}
      controls={
        <>
          <Toggle label="App" value={mode} onChange={(v) => { setMode(v); setSel(null); }} options={[{ value: "before", label: "Before" }, { value: "after", label: "Titan Drills" }]} />
          {after ? (
            <button type="button" className={s.btn} onClick={() => go((i + 1) % STEPS.length)}>
              Next shot →
            </button>
          ) : null}
        </>
      }
      detail={after ? (step ? { tag: `Step ${STEPS.indexOf(step) + 1} of ${STEPS.length}`, title: step.title, text: step.text } : null) : { tag: "Before", title: "Drill Maker", text: "Twelve grey numbered buttons, a grid of numbers per ball, and a help screen explaining what each button did." }}
      ship={{ steps: ["Coded prototypes, kept in GitHub", "Drill list, three versions", "Visual drill editor", "MegaDrill sessions", "Live on iOS and Android"] }}
    >
      <svg viewBox="0 0 720 390" role="group" aria-label="The Titan drill loop">
        {/* the court */}
        <g stroke="var(--f-accent)" strokeOpacity="0.28" fill="none" strokeWidth="1.4">
          <path d="M250 110 L470 110 L560 280 L160 280 Z" />
          <path d="M268 110 L186 280 M452 110 L534 280" />
          <path d="M360 110 V280 M232 190 H488" />
          <path d="M214 190 H506" strokeOpacity="0.5" strokeWidth="3" />
        </g>

        {/* after: the loop */}
        <g className={s.fade} style={{ opacity: after ? 1 : 0, pointerEvents: after ? "auto" : "none" }}>
          <ellipse cx={C.x} cy={C.y} rx={RX} ry={RY} fill="none" stroke="var(--f-line)" strokeWidth="2" strokeDasharray="2 6" strokeLinecap="round" />
          {STEPS.map((st, n) => {
            const p = at(n);
            const on = sel === n;
            const passed = n <= i;
            return (
              <g key={st.id} {...nodeProps(st.label, on, () => go(n))}>
                <circle className={`ring ${s.fade}`} cx={p.x} cy={p.y} r={on ? 26 : 22} fill={passed ? "var(--f-accent)" : "var(--f-panel)"} stroke="var(--f-accent)" strokeWidth="1.6" />
                <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={passed ? "var(--f-on-accent)" : "var(--f-accent)"}>{n + 1}</text>
                <text x={p.x} y={p.y + (p.y > C.y ? 44 : -34)} textAnchor="middle" fontSize="12" fill="var(--f-ink)" fontWeight={on ? 700 : 400}>{st.label}</text>
              </g>
            );
          })}
          <g className={s.fade} style={{ transform: `translate(${ball.x + 18}px, ${ball.y - 18}px)` }}>
            <circle r="8" fill="#e6ff5c" stroke="#11140c" strokeWidth="1.2" />
            <path d="M-6 -4 Q0 0 -6 4 M6 -4 Q0 0 6 4" stroke="#11140c" strokeWidth="1" fill="none" />
          </g>
        </g>

        {/* before: the old controller */}
        <g className={s.fade} style={{ opacity: after ? 0 : 1, pointerEvents: "none" }}>
          <rect x="170" y="70" width="380" height="250" rx="16" fill="#e9e9e4" />
          {Array.from({ length: 12 }, (_, n) => (
            <g key={n}>
              <circle cx={218 + (n % 4) * 42} cy={122 + Math.floor(n / 4) * 42} r="16" fill="#c2c2bd" />
              <text x={218 + (n % 4) * 42} y={126 + Math.floor(n / 4) * 42} textAnchor="middle" fontSize="11" fill="#fff">{n + 1}</text>
            </g>
          ))}
          {Array.from({ length: 5 }, (_, r) => (
            <text key={r} x="400" y={116 + r * 26} fontSize="11" fontFamily="var(--mono)" fill="#77776f">{`${r + 1}   9  18  0  9  7`}</text>
          ))}
          <text x="400" y="96" fontSize="10" fontFamily="var(--mono)" fill="#9a9a92">Ball Horz Spd Spin Hght</text>
          <rect x="198" y="262" width="120" height="30" rx="15" fill="#9bc95a" />
          <text x="258" y="281" textAnchor="middle" fontSize="11" fill="#fff">Connect</text>
          <text x="360" y="352" textAnchor="middle" fontSize="12" fill="var(--f-dim)">Numbers in, numbers out.</text>
        </g>
      </svg>
    </FlowFrame>
  );
}
