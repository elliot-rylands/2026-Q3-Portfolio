"use client";

import { useEffect, useState } from "react";
import { FlowFrame, flowStyles as fs } from "../FlowFrame";
import p from "./pebbl.module.css";

// The capture lifecycle lives in Rust; the UI only renders what it reports.
// Each scenario steps through the real states with the copy the app shows.

type StateId = "idle" | "preparing" | "recording" | "stopping" | "finalizing" | "problem";
const STATES: { id: StateId; label: string }[] = [
  { id: "idle", label: "Idle" },
  { id: "preparing", label: "Preparing" },
  { id: "recording", label: "Recording" },
  { id: "stopping", label: "Stopping" },
  { id: "finalizing", label: "Finalizing" },
  { id: "problem", label: "Problem" },
];

type Step = { state: StateId; label: string; text: string; log: string; mic: number; call: number; breathing?: boolean };
type Scenario = { id: string; name: string; steps: Step[] };

const SCENARIOS: Scenario[] = [
  {
    id: "normal",
    name: "A normal meeting",
    steps: [
      { state: "idle", label: "Ready to record", text: "Always let people know before you record them.", log: "Start capture pressed.", mic: 0, call: 0 },
      { state: "preparing", label: "Getting ready", text: "Opening the microphone and call audio.", log: "Devices opened. **Not** “Recording” yet: no audio has arrived.", mic: 0, call: 0 },
      { state: "recording", label: "Recording", text: "Collecting the conversation. Recording to this Mac only.", log: "First real buffer arrived, so now it says **Recording**.", mic: 68, call: 46, breathing: true },
      { state: "stopping", label: "Stopping", text: "Finishing the last chunk.", log: "Stop pressed. The open 30-second chunk is closed.", mic: 20, call: 10 },
      { state: "finalizing", label: "Saving", text: "Checking the files.", log: "Manifest written, a checksum for every chunk.", mic: 0, call: 0 },
      { state: "idle", label: "Saved", text: "Queued for transcription.", log: "**Saved.** Transcription starts; you can record again straight away.", mic: 0, call: 0 },
    ],
  },
  {
    id: "denied",
    name: "Mic access is off",
    steps: [
      { state: "idle", label: "Ready to record", text: "Always let people know before you record them.", log: "Start capture pressed.", mic: 0, call: 0 },
      { state: "preparing", label: "Getting ready", text: "Opening the microphone.", log: "macOS refuses the device.", mic: 0, call: 0 },
      { state: "problem", label: "Microphone access is off", text: "Open System Settings › Privacy › Microphone.", log: "Says **which** problem and links to the exact settings pane. Never shows “Recording”.", mic: 0, call: 0 },
    ],
  },
  {
    id: "silent",
    name: "A silent mic",
    steps: [
      { state: "preparing", label: "Getting ready", text: "Opening the microphone.", log: "Device opened.", mic: 0, call: 0 },
      { state: "preparing", label: "No sound coming in", text: "Check your input in Sound settings.", log: "1.5 seconds of exact zeros: the label changes to **No sound coming in**.", mic: 0, call: 0 },
      { state: "idle", label: "Saved as silent", text: "Not treated as a meeting.", log: "Stopped. Saved with status **silent**, never summarised as a meeting.", mic: 0, call: 0 },
    ],
  },
  {
    id: "crash",
    name: "The app crashes",
    steps: [
      { state: "recording", label: "Recording", text: "Collecting the conversation.", log: "Recording, 14 minutes in.", mic: 62, call: 50, breathing: true },
      { state: "problem", label: "pebbl. quit unexpectedly", text: "", log: "Crash. The file header was rewritten a second ago, so about **one second** is at risk.", mic: 0, call: 0 },
      { state: "idle", label: "Recovered", text: "This recording was interrupted and repaired.", log: "Next launch: the unfinished file is repaired and marked **recovered**.", mic: 0, call: 0 },
    ],
  },
  {
    id: "quit",
    name: "Quit mid-meeting",
    steps: [
      { state: "recording", label: "Recording", text: "Collecting the conversation.", log: "Recording.", mic: 64, call: 40, breathing: true },
      { state: "stopping", label: "Stopping", text: "Saving before quitting.", log: "⌘Q pressed. pebbl. stops the recording **first**.", mic: 10, call: 5 },
      { state: "finalizing", label: "Saving", text: "", log: "Files finalised.", mic: 0, call: 0 },
      { state: "idle", label: "Saved, then quit", text: "", log: "Only then does it quit. Nothing is lost.", mic: 0, call: 0 },
    ],
  },
];

function Rich({ text }: { text: string }) {
  return <>{text.split(/(\*\*[^*]+\*\*)/).map((t, i) => (t.startsWith("**") ? <strong key={i}>{t.slice(2, -2)}</strong> : t))}</>;
}

export default function PebblCapture() {
  const [sid, setSid] = useState("normal");
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const sc = SCENARIOS.find((s) => s.id === sid)!;
  const step = sc.steps[i];

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      if (i >= sc.steps.length - 1) setPlaying(false);
      else setI(i + 1);
    }, 1500);
    return () => clearTimeout(t);
  }, [playing, i, sc.steps.length]);

  const run = (id: string) => {
    setSid(id);
    setI(0);
    setPlaying(true);
  };

  return (
    <FlowFrame
      skin="pebbl"
      eyebrow="Capture · say Recording only when it's true"
      problem="The worst thing a notetaker can do is look like it's recording when it isn't. You only find out after the meeting."
      controls={
        <button type="button" className={fs.btn} onClick={() => (i >= sc.steps.length - 1 ? run(sid) : setPlaying(!playing))}>
          {playing ? "Pause" : i >= sc.steps.length - 1 ? "↻ Replay" : "▶ Play"}
        </button>
      }
      detail={{ tag: `${sc.name} · step ${i + 1} of ${sc.steps.length}`, title: step.label, text: step.text || "Nothing shown." }}
      minWidth={0}
    >
      <div className={p.presets} role="radiogroup" aria-label="Scenarios">
        {SCENARIOS.map((s) => (
          <button key={s.id} type="button" role="radio" aria-checked={sid === s.id} aria-pressed={sid === s.id} className={fs.btn} onClick={() => run(s.id)}>
            {s.name}
          </button>
        ))}
      </div>
      <ol className={p.states} aria-label="Capture states">
        {STATES.map((s) => (
          <li key={s.id}>
            <span className={`${p.state} ${s.id === "recording" ? p.rec : ""} ${s.id === "problem" ? p.fail : ""} ${step.state === s.id ? p.on : ""}`}>
              <span className={p.dot} />
              {s.label}
            </span>
          </li>
        ))}
      </ol>
      <div className={p.pop} aria-live="polite">
        <span className={`${p.pebble} ${step.breathing ? p.breathing : ""}`} aria-hidden="true" />
        <span className={p.popLabel}>{step.label}</span>
        <span className={p.popText}>{step.text}</span>
        <div className={p.meters}>
          <span>Microphone</span>
          <span className={p.meter}><i style={{ width: `${step.mic}%` }} /></span>
          <span>Call audio</span>
          <span className={p.meter}><i style={{ width: `${step.call}%` }} /></span>
        </div>
      </div>
      <ol className={p.log}>
        {sc.steps.slice(0, i + 1).map((s, k) => (
          <li key={`${sid}-${k}`}><Rich text={s.log} /></li>
        ))}
      </ol>
    </FlowFrame>
  );
}
