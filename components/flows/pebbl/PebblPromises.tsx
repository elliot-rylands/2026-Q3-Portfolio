"use client";

import { useState } from "react";
import { FlowFrame, flowStyles as fs } from "../FlowFrame";
import p from "./pebbl.module.css";

// D19: an action is yours only if the model says the owner is "me", the quote
// is verified in the transcript, and it came from your own microphone track
// (not echo). Microphone-only recordings can't tell voices apart, so the list
// isn't offered there at all.

type Case = {
  id: string;
  label: string;
  quote: string;
  where: string;
  owner: boolean;
  verified: boolean;
  mic: boolean | null; // null: can't know (mic-only recording)
  result: string;
};

const CASES: Case[] = [
  { id: "mine", label: "You promised", quote: "I'll send the revised booking cards by Friday.", where: "0:41 · your microphone", owner: true, verified: true, mic: true, result: "Added to My promises, due Friday, with the quote you can replay." },
  { id: "theirs", label: "Someone else did", quote: "Yep, I'll look into it today.", where: "0:57 · call audio", owner: false, verified: true, mic: false, result: "An action for someone else. It stays in the notes, not in your list." },
  { id: "echo", label: "Echo from your speakers", quote: "I'll look into it today.", where: "0:57 · your mic, overlapping the call", owner: true, verified: true, mic: false, result: "Your mic heard the call through your speakers. The line is marked echo, hidden, and can't count as evidence." },
  { id: "para", label: "Paraphrased", quote: "Elliot to share the cards this week.", where: "model wording, not in the transcript", owner: true, verified: false, mic: true, result: "No line says this. It can appear as an AI interpretation, but never as your promise." },
  { id: "solo", label: "Mic-only recording", quote: "I'll send it over tomorrow.", where: "in-person, one track", owner: true, verified: true, mic: null, result: "With one track pebbl. can't tell voices apart, so it doesn't offer the list and says why, instead of guessing." },
];

function Tick({ v }: { v: boolean | null }) {
  if (v === null) return <span className={`${p.tick} ${p.na}`} aria-label="can't tell">?</span>;
  return <span className={`${p.tick} ${v ? p.yes : p.no}`} aria-label={v ? "yes" : "no"}>{v ? "✓" : "✕"}</span>;
}

export default function PebblPromises() {
  const [id, setId] = useState("mine");
  const c = CASES.find((x) => x.id === id)!;
  const ok = c.owner && c.verified && c.mic === true;

  return (
    <FlowFrame
      skin="pebbl"
      eyebrow="My promises · decided by code, not the model"
      problem="The list people actually need after a meeting is what they said they'd do. A wrong entry there costs trust fast."
      detail={{ tag: ok ? "In My promises" : "Not in My promises", title: ok ? "All three checks pass" : "At least one check fails", text: c.result }}
      minWidth={0}
    >
      <div className={p.presets} role="radiogroup" aria-label="Example lines">
        {CASES.map((x) => (
          <button key={x.id} type="button" role="radio" aria-checked={id === x.id} className={fs.btn} aria-pressed={id === x.id} onClick={() => setId(x.id)}>
            {x.label}
          </button>
        ))}
      </div>
      <p className={p.quote}>
        “{c.quote}”<small>{c.where}</small>
      </p>
      <ol className={p.checks}>
        <li className={p.check}><Tick v={c.owner} /> The model says the owner is me <span>owner = me</span></li>
        <li className={p.check}><Tick v={c.verified} /> The quote is word for word in a real line <span>verified</span></li>
        <li className={p.check}><Tick v={c.mic} /> That line is on my microphone track, not echo <span>speaker = you</span></li>
      </ol>
    </FlowFrame>
  );
}
