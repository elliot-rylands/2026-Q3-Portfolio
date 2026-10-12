"use client";

import { useState } from "react";
import { FlowFrame, Toggle } from "../FlowFrame";
import p from "./pebbl.module.css";

// What stays on the Mac, and the one thing that can leave it.
const BOXES = [
  { id: "tracks", title: "Two tracks", sub: "Mic and call audio, saved separately", text: "“You” and “others” come from which track a line is on, not from guessing voices in mixed audio." },
  { id: "whisper", title: "Whisper", sub: "Speech to text, on this Mac", text: "whisper.cpp runs locally. The model is downloaded once; audio is never uploaded." },
  { id: "transcript", title: "Transcript", sub: "Echo removed, lines with ids", text: "Lines where your mic just heard the call are marked echo and kept out of the evidence." },
  { id: "store", title: "Library", sub: "SQLite in Application Support", text: "Audio, transcripts, notes and search all live in one local folder. Audio can expire after 7, 30 or 90 days, but only once a transcript is saved." },
];

export default function PebblPrivacy() {
  const [notes, setNotes] = useState<"off" | "on">("off");
  const [sel, setSel] = useState<string | null>(null);
  const on = notes === "on";
  const box = BOXES.find((b) => b.id === sel);
  const detail = box
    ? { tag: "On this Mac", title: box.title, text: box.text }
    : on
      ? { tag: "Notes on", title: "Only transcript text leaves", text: "Sent to Anthropic under your own API key, stored in the Keychain, after a plain-language disclosure. Usage is billed to you, not hidden in a subscription." }
      : { tag: "Notes off", title: "Nothing leaves the Mac", text: "You still get a searchable transcript you can replay. Notes are opt-in." };

  return (
    <FlowFrame
      skin="pebbl"
      eyebrow="Privacy · what leaves this Mac"
      problem="People are recording their colleagues. The default has to be that nothing goes anywhere."
      controls={<Toggle label="AI notes" value={notes} onChange={setNotes} options={[{ value: "off", label: "Notes off" }, { value: "on", label: "Notes on" }]} />}
      detail={detail}
      minWidth={0}
    >
      <div className={p.mac}>
        <span className={p.macLabel}>Your Mac</span>
        <div className={p.pipe}>
          {BOXES.map((b) => (
            <button key={b.id} type="button" className={p.box} aria-pressed={sel === b.id} onClick={() => setSel(sel === b.id ? null : b.id)}>
              <strong>{b.title}</strong>
              <small>{b.sub}</small>
            </button>
          ))}
        </div>
      </div>
      <div className={p.outside}>
        <span className={p.cloud} style={{ opacity: on ? 1 : 0.35 }}>Transcript text only</span>
        <span className={p.wire} style={{ width: 60, opacity: on ? 1 : 0.15 }} aria-hidden="true" />
        <span className={p.cloud} style={{ opacity: on ? 1 : 0.35 }}>Claude, with your key</span>
      </div>
      <p className={p.leaves}>
        Leaves this Mac: <span>{on ? "transcript text, to write notes." : "nothing."}</span> Audio: <span>never.</span>
      </p>
    </FlowFrame>
  );
}
