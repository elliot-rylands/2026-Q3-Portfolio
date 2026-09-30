"use client";

import { useRef, useState } from "react";
import type { PointerEvent } from "react";
import { FlowFrame, flowStyles as s, nodeProps } from "./FlowFrame";

// A broadcast-style run sheet: several rings running at once across a day.
// Drag the playhead and the strip above answers the only question a fan has:
// what's live right now? Classes, rings and times are illustrative.
type Cls = { id: string; ring: number; from: number; to: number; name: string; tour: "gct" | "gcl" };
const DAY = { from: 8, to: 18 };
const CLASSES: Cls[] = [
  { id: "a", ring: 0, from: 8, to: 10, name: "CSI2* 1.35m", tour: "gct" },
  { id: "b", ring: 0, from: 10.5, to: 13, name: "CSI5* 1.45m", tour: "gct" },
  { id: "c", ring: 0, from: 14, to: 17, name: "Grand Prix", tour: "gct" },
  { id: "d", ring: 1, from: 9, to: 11.5, name: "League, round 1", tour: "gcl" },
  { id: "e", ring: 1, from: 12.5, to: 15.5, name: "League, round 2", tour: "gcl" },
  { id: "f", ring: 1, from: 16, to: 18, name: "Youngster Tour", tour: "gct" },
  { id: "g", ring: 2, from: 8.5, to: 10.5, name: "Youngster Tour", tour: "gct" },
  { id: "h", ring: 2, from: 11, to: 12.5, name: "CSI2* 1.25m", tour: "gct" },
  { id: "i", ring: 2, from: 13, to: 16.5, name: "CSI5* 1.50m", tour: "gct" },
];
const COL = { gct: "#2f6bff", gcl: "#ff3b4a" };
const X0 = 96;
const X1 = 700;
const tx = (h: number) => X0 + ((h - DAY.from) / (DAY.to - DAY.from)) * (X1 - X0);
const LANE_Y = (r: number) => 96 + r * 52;
const fmt = (h: number) => `${String(Math.floor(h)).padStart(2, "0")}:${String(Math.round((h % 1) * 60)).padStart(2, "0")}`;

export default function GctvFlow() {
  const [now, setNow] = useState(13.5);
  const [sel, setSel] = useState<string | null>(null);
  const svg = useRef<SVGSVGElement>(null);

  const live = CLASSES.filter((c) => c.from <= now && now < c.to);
  const replay = [...CLASSES].filter((c) => c.to <= now).sort((a, b) => b.to - a.to)[0];
  const next = [...CLASSES].filter((c) => c.from > now).sort((a, b) => a.from - b.from)[0];
  const picked = CLASSES.find((c) => c.id === sel);

  const drag = (e: PointerEvent<SVGSVGElement>) => {
    if (e.buttons !== 1 || !svg.current) return;
    const r = svg.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 720;
    const h = DAY.from + ((x - X0) / (X1 - X0)) * (DAY.to - DAY.from);
    setNow(Math.min(DAY.to - 0.25, Math.max(DAY.from, Math.round(h * 4) / 4)));
  };

  const chip = (label: string, c: Cls | undefined, red: boolean, x: number) => (
    <g transform={`translate(${x} 18)`}>
      <rect width="196" height="40" rx="4" fill="var(--f-panel)" />
      <rect x="8" y="8" width={label.length * 7 + 10} height="14" rx="2" fill={red ? "#ff3b4a" : "#3a3a44"} />
      <text x="13" y="18.5" fontSize="9" fontWeight="700" fill="#fff" letterSpacing="0.06em">{label}</text>
      <text x="8" y="34" fontSize="11" fill={c ? "var(--f-ink)" : "var(--f-dim)"}>{c ? `${c.name} · Ring ${c.ring + 1}` : "Nothing yet"}</text>
    </g>
  );

  return (
    <FlowFrame
      skin="gctv"
      eyebrow="GCTV · concurrently watching races during large events"
      problem="At the big events, classes run side by side across the weekend. A fan shouldn't have to go looking for the one that's live."
      minWidth={600}
      detail={
        picked
          ? { tag: picked.tour === "gcl" ? "League" : "Tour", title: `${picked.name}, Ring ${picked.ring + 1}, ${fmt(picked.from)} to ${fmt(picked.to)}`, text: picked.to <= now ? "Finished: results take over, and every ride in the table has a replay for each round." : picked.from <= now ? "Live now: one tap from the strip on every page, with Listen for fans on the move." : "Coming up: set a reminder from its row, next to the course plan." }
          : { tag: `${fmt(now)}`, title: `${live.length} live at once`, text: live.length ? live.map((c) => `${c.name} (Ring ${c.ring + 1})`).join(", ") + ". Every one is a tap away." : "Between classes. The strip shows the latest replay and what's next." }
      }
      ship={{ ordered: true, steps: ["Coded prototypes, kept in GitHub", "Sign-up and pass picker v1", "Pass picker v2 replaced it", "Live on the site"] }}
    >
      <svg ref={svg} viewBox="0 0 720 280" role="group" aria-label="Illustrative schedule of classes across three rings" onPointerDown={drag} onPointerMove={drag} style={{ touchAction: "pan-y" }}>
        {chip("LIVE", live[0], true, 96)}
        {chip("REPLAY", replay, false, 300)}
        {chip("NEXT", next, false, 504)}

        {[8, 10, 12, 14, 16, 18].map((h) => (
          <g key={h}>
            <path d={`M${tx(h)} 76 V250`} stroke="var(--f-line)" />
            <text x={tx(h)} y="268" textAnchor="middle" fontSize="10" fontFamily="var(--mono)" fill="var(--f-dim)">{fmt(h)}</text>
          </g>
        ))}
        {[0, 1, 2].map((r) => (
          <text key={r} x="12" y={LANE_Y(r) + 20} fontSize="11" fontFamily="var(--mono)" fill="var(--f-dim)">RING {r + 1}</text>
        ))}

        {CLASSES.map((c) => {
          const on = sel === c.id;
          const isLive = c.from <= now && now < c.to;
          const done = c.to <= now;
          return (
            <g key={c.id} {...nodeProps(`${c.name}, ring ${c.ring + 1}`, on, () => setSel(on ? null : c.id))}>
              <rect className={`ring ${s.fade}`} x={tx(c.from) + 1} y={LANE_Y(c.ring)} width={tx(c.to) - tx(c.from) - 2} height="34" rx="4" fill={COL[c.tour]} opacity={done ? 0.35 : isLive ? 1 : 0.6} stroke={on ? "#fff" : "none"} strokeWidth="2" />
              <text x={tx(c.from) + 8} y={LANE_Y(c.ring) + 21} fontSize="10.5" fill="#fff" fontWeight={isLive ? 700 : 400}>{c.name}</text>
            </g>
          );
        })}

        <g className={s.fade} style={{ transform: `translateX(${tx(now)}px)` }}>
          <path d="M0 70 V252" stroke="#ff3b4a" strokeWidth="2" />
          <rect x="-24" y="62" width="48" height="16" rx="3" fill="#ff3b4a" />
          <text y="74" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" fontFamily="var(--mono)">{fmt(now)}</text>
        </g>
      </svg>
      <input className={s.range} type="range" min={DAY.from} max={DAY.to - 0.25} step={0.25} value={now} onChange={(e) => setNow(Number(e.target.value))} aria-label="Time of day" aria-valuetext={fmt(now)} />
      <p style={{ margin: "4px 0 0", fontSize: 11, color: "var(--f-dim)", fontFamily: "var(--mono)" }}>Drag the time. Blue: Tour · Red: League · Illustrative schedule</p>
    </FlowFrame>
  );
}
