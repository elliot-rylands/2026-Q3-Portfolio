"use client";

import { useState } from "react";
import { FlowFrame, Toggle, flowStyles as s, nodeProps } from "./FlowFrame";

// A transit map of the order. Pick a metric and only the stations built to
// move it stay lit. "Before" shows the dead end the redesign removed.
type Metric = "start" | "finish" | "basket" | "rating";
type Stop = { id: string; x: number; y: number; label: string; m: Metric[]; big?: boolean; after?: boolean; before?: boolean; up?: boolean; text: string };

const Y = 150;
const STOPS: Stop[] = [
  { id: "home", x: 50, y: Y, label: "Home", m: ["start"], big: true, text: "Where and when first: delivery or collection, now or Saturday at 11:45, changed with one tap." },
  { id: "close", x: 100, y: 72, label: "Closing soon", m: ["finish"], after: true, up: true, text: "A bottom sheet with a way forward, not an error at checkout." },
  { id: "open", x: 170, y: 72, label: "Opening soon", m: ["finish"], after: true, up: true, text: "Pick a time when the store opens, before the basket fills." },
  { id: "time", x: 240, y: 72, label: "Change time", m: ["finish"], after: true, up: true, text: "Change the delivery time in place." },
  { id: "deals", x: 290, y: Y, label: "Deals", m: ["start"], big: true, text: "What's inside each deal as icons, the saving in a badge, the old price struck through." },
  { id: "menu", x: 370, y: Y, label: "Menu", m: ["start"], text: "Allergen icons before you tap, an Added state, and the long-title edge case designed in." },
  { id: "pizza", x: 450, y: Y, label: "Pizza", m: ["basket"], big: true, text: "The decision point, where extras belong." },
  { id: "extra", x: 500, y: 228, label: "Treat yourself", m: ["basket"], after: true, text: "One tap adds it, the row flips to Added, and the button price updates. No surprises later." },
  { id: "basket", x: 550, y: Y, label: "Basket", m: ["finish", "basket"], big: true, text: "Ten quantity controls explored so fixing a mistake is obvious, but never accidental." },
  { id: "more", x: 600, y: 228, label: "Want more?", m: ["basket"], after: true, text: "A 45p dip or a reward you've earned, and Apple Pay above Checkout." },
  { id: "pay", x: 650, y: Y, label: "Checkout", m: ["finish"], big: true, text: "Pay without typing a card number." },
  { id: "dead", x: 650, y: 236, label: "Store closed", m: ["finish"], before: true, text: "The worst time to find out the store is shut: at checkout, with a full basket." },
  { id: "rate", x: 760, y: Y, label: "Enjoying it?", m: ["rating"], big: true, text: "What shipped asked “Enjoying the app?” before the store review prompt." },
  { id: "review", x: 815, y: 90, label: "Review", m: ["rating"], after: true, up: true, text: "What shipped: happy customers were invited to review. Today I'd give everyone the same chance." },
  { id: "fb", x: 815, y: 210, label: "Feedback", m: ["rating"], after: true, text: "What shipped: unhappy customers were offered a private form. Today I'd offer it alongside the review, not instead." },
];

// Labels that sit above the line, clear of the branches that drop below it.
const ABOVE = ["menu", "pizza", "basket", "pay"];

const METRICS: { value: "all" | Metric; label: string }[] = [
  { value: "all", label: "All" },
  { value: "start", label: "Orders started" },
  { value: "finish", label: "Orders finished" },
  { value: "basket", label: "Basket value" },
  { value: "rating", label: "Rating" },
];

export default function PapaFlow() {
  const [mode, setMode] = useState<"before" | "after">("before");
  const [metric, setMetric] = useState<"all" | Metric>("all");
  const [sel, setSel] = useState<string | null>(null);
  const after = mode === "after";
  const visible = (st: Stop) => (after ? !st.before : !st.after);
  const lit = (st: Stop) => metric === "all" || st.m.includes(metric);
  const stop = STOPS.find((x) => x.id === sel);

  const line = (d: string, show: boolean, key: string, on = true) => (
    <path key={key} className={s.fade} d={d} fill="none" stroke={on ? "var(--f-accent)" : "var(--f-line)"} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: show ? 1 : 0 }} />
  );
  const branchOn = (m: Metric) => metric === "all" || metric === m;

  return (
    <FlowFrame
      skin="papa"
      eyebrow="Papa John's · hungry to “Add to order”"
      problem="A simple order can still fail in small places: a closing store, an unreadable deal, a basket that's hard to fix."
      minWidth={620}
      controls={
        <>
          <Toggle label="Journey" value={mode} onChange={(v) => { setMode(v); setSel(null); }} options={[{ value: "before", label: "Before" }, { value: "after", label: "After" }]} />
          <Toggle label="Built to move" value={metric} onChange={setMetric} options={METRICS} />
        </>
      }
      detail={stop ? { tag: stop.m.map((m) => METRICS.find((x) => x.value === m)?.label).join(" · "), title: stop.label, text: stop.text } : null}
      ship={{ steps: ["Coded prototypes, kept in GitHub", "A/B tested", "Shipped one change at a time"] }}
    >
      <svg viewBox="0 44 880 236" role="group" aria-label="Papa John's ordering journey as a transit map">
        {line(`M50 ${Y} H760`, true, "main", metric === "all")}
        {line(`M50 ${Y} V92 Q50 72 70 72 H270 Q290 72 290 92 V${Y}`, after, "timing", branchOn("finish"))}
        {line(`M450 ${Y} V208 Q450 228 470 228 H530 Q550 228 550 208 V${Y}`, after, "extra", branchOn("basket"))}
        {line(`M550 ${Y} V208 Q550 228 570 228 H630 Q650 228 650 208 V${Y}`, after, "more", branchOn("basket"))}
        {line(`M760 ${Y} Q780 ${Y} 790 125 L815 90`, after, "rev", branchOn("rating"))}
        {line(`M760 ${Y} Q780 ${Y} 790 175 L815 210`, after, "fb", branchOn("rating"))}
        {line(`M650 ${Y} V236`, !after, "dead", false)}

        {STOPS.map((st) => {
          const show = visible(st);
          const on = sel === st.id;
          const glow = lit(st);
          const r = st.big ? 11 : 8;
          return (
            <g key={st.id} className={s.fade} style={{ opacity: show ? (glow ? 1 : 0.35) : 0, pointerEvents: show ? "auto" : "none" }}>
              <g {...nodeProps(st.label, on, () => setSel(st.id))}>
                {st.id === "dead" ? (
                  <g>
                    <circle className="ring" cx={st.x} cy={st.y} r="11" fill="#c8102e" />
                    <path d={`M${st.x - 5} ${st.y - 5} l10 10 M${st.x + 5} ${st.y - 5} l-10 10`} stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
                  </g>
                ) : (
                  <circle className="ring" cx={st.x} cy={st.y} r={on ? r + 2 : r} fill={on ? "var(--f-accent)" : "var(--f-bg)"} stroke={glow ? "var(--f-accent)" : "var(--f-line)"} strokeWidth={st.big ? 4 : 3} />
                )}
                <text x={st.id === "dead" ? st.x + 18 : st.id === "rate" ? st.x + 8 : st.x} y={st.id === "dead" ? st.y + 4 : st.id === "open" ? st.y + 26 : st.up || ABOVE.includes(st.id) ? st.y - (st.big ? 20 : 16) : st.y + (st.big ? 30 : 26)} textAnchor={st.id === "dead" ? "start" : st.id === "rate" ? "end" : "middle"} fontSize={st.big ? 12.5 : 11} fontWeight={st.big ? 700 : 500} fill="var(--f-ink)">
                  {st.label}
                </text>
              </g>
            </g>
          );
        })}
        <text x="630" y="240" textAnchor="end" fontSize="10.5" fill="var(--f-dim)" className={s.fade} style={{ opacity: after ? 0 : 1 }}>
          Found out at checkout, with a full basket
        </text>
      </svg>
    </FlowFrame>
  );
}
