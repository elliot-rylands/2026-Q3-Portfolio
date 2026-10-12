"use client";

import { useState } from "react";
import { FlowFrame, Toggle } from "../FlowFrame";
import p from "./pebbl.module.css";

// Evidence Mode in miniature. The model hands back notes with citations
// (a line id and a quote). pebbl. checks each one against the transcript
// before anything is shown, the same way pebbl_core::notes::validate does.

type Line = { id: string; t: string; who: "You" | "Others"; text: string };
const LINES: Line[] = [
  { id: "s1", t: "0:07", who: "Others", text: "Morning. So the main thing today is the booking cards and whether we show availability up front." },
  { id: "s2", t: "0:15", who: "You", text: "Right. From the research sessions, people kept opening every card just to see the next free slot." },
  { id: "s3", t: "0:25", who: "Others", text: "That matches what support is hearing. Let's show availability dates upfront on the card itself." },
  { id: "s4", t: "0:34", who: "Others", text: "Can we ship that in October, or is that too tight?" },
  { id: "s5", t: "0:41", who: "You", text: "October works if we keep it to web first. I'll send the revised booking cards by Friday." },
  { id: "s6", t: "0:50", who: "Others", text: "Great. Can you check whether the API returns the next slot already?" },
  { id: "s7", t: "0:57", who: "Others", text: "Yep, I'll look into it today." },
];
const byId = Object.fromEntries(LINES.map((l) => [l.id, l]));

type Verdict = "verified" | "interp" | "insufficient";
type Item = { id: string; kind: string; title: string; cite: string; quote: string; verdict: Verdict; why: string };
const ITEMS: Item[] = [
  { id: "d1", kind: "Decision", title: "Show availability dates upfront on booking cards", cite: "s3", quote: "Let's show availability dates upfront on the card itself", verdict: "verified", why: "The quote appears word for word in the 0:25 line, so it's marked verified and the timestamp plays that moment." },
  { id: "a1", kind: "My promise", title: "Send the revised booking cards by Friday", cite: "s5", quote: "I'll send the revised booking cards by Friday", verdict: "verified", why: "Verified, and it was said on your own microphone track, so it becomes one of your promises." },
  { id: "d2", kind: "Decision", title: "Ship on web first in October", cite: "s5", quote: "October works if we keep it to web first", verdict: "verified", why: "Verified against 0:41. The decision stays 'proposed' until someone changes its status." },
  { id: "a2", kind: "Action", title: "Check the API returns the next slot", cite: "s7", quote: "I'll check the API today", verdict: "interp", why: "The line exists, but those words don't. The model paraphrased, so pebbl. shows it as AI interpretation, not as a quote." },
  { id: "x1", kind: "Claim", title: "Mobile follows in November", cite: "s42", quote: "mobile ships in November", verdict: "insufficient", why: "There is no line s42. The citation is dropped and counted, never repaired or swapped for a nearby line." },
];

const LABEL: Record<Verdict, string> = { verified: "Verified", interp: "AI interpretation", insufficient: "Dropped" };
const CLASS: Record<Verdict, string> = { verified: p.verified, interp: p.interp, insufficient: p.insufficient };

function Highlight({ text, quote }: { text: string; quote: string }) {
  const i = text.toLowerCase().indexOf(quote.toLowerCase());
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className={p.mark}>{text.slice(i, i + quote.length)}</mark>
      {text.slice(i + quote.length)}
    </>
  );
}

export default function PebblEvidence() {
  const [mode, setMode] = useState<"raw" | "checked">("raw");
  const [sel, setSel] = useState<string | null>(null);
  const checked = mode === "checked";
  const item = ITEMS.find((i) => i.id === sel) ?? null;
  const line = item ? byId[item.cite] : null;
  const dropped = ITEMS.filter((i) => i.verdict === "insufficient").length;

  const detail = item
    ? checked
      ? { tag: LABEL[item.verdict], title: item.title, text: item.why }
      : { tag: `Model says · ${item.cite}`, title: `“${item.quote}”`, text: line ? `It points at the ${line.t} line. Switch to “After pebbl. checks” to see if that holds.` : "It points at a line that doesn't exist. Nothing has checked that yet." }
    : null;

  return (
    <FlowFrame
      skin="pebbl"
      eyebrow="Evidence Mode · every claim needs a receipt"
      problem="A model will happily cite a line that doesn't say what it claims. So pebbl. checks every citation before you see it."
      controls={<Toggle label="View" value={mode} onChange={(v) => setMode(v)} options={[{ value: "raw", label: "What the model returns" }, { value: "checked", label: "After pebbl. checks" }]} />}
      detail={detail}
      hint="Pick a note on the left to find where it came from."
      minWidth={0}
    >
      <div className={p.split}>
        <div className={p.panel}>
          <p className={p.panelHead}>Notes</p>
          <ul className={p.items}>
            {ITEMS.map((it) => (
              <li key={it.id}>
                <button type="button" className={`${p.item} ${checked && it.verdict === "insufficient" ? p.dropped : ""}`} aria-pressed={sel === it.id} onClick={() => setSel(it.id)}>
                  <span className={p.itemRow}>
                    <span className={p.itemKind}>{it.kind}</span>
                    {checked ? <span className={`${p.badge} ${CLASS[it.verdict]}`}>{LABEL[it.verdict]}</span> : <span className={`${p.badge} ${p.raw}`}>cites {it.cite}</span>}
                  </span>
                  <span>{it.title}</span>
                </button>
              </li>
            ))}
          </ul>
          {checked ? (
            <p className={p.count}>
              <strong>{dropped} citation dropped</strong>, shown to you rather than hidden.
            </p>
          ) : null}
        </div>
        <div className={p.panel}>
          <p className={p.panelHead}>Transcript</p>
          <ol className={p.lines}>
            {LINES.map((l) => {
              const hit = line?.id === l.id;
              return (
                <li key={l.id} className={`${p.line} ${hit ? p.hit : ""}`}>
                  <span className={p.time}>{l.t}</span>
                  <span>
                    <span className={p.who}>{l.who}</span>
                    {hit && checked && item?.verdict === "verified" ? <Highlight text={l.text} quote={item.quote} /> : l.text}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </FlowFrame>
  );
}
