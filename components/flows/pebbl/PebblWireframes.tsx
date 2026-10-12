"use client";

import { useState } from "react";
import { FlowFrame, Toggle, flowStyles as fs } from "../FlowFrame";
import p from "./pebbl.module.css";

// Low-fidelity wireframes drawn on the same grid as the shipped screenshots,
// so each numbered note sits on the same element in both views.
// Coordinates are percentages of a 3:2 frame.

type K = "win" | "side" | "bar" | "text" | "box" | "fill" | "btn" | "pill" | "circle" | "menubar" | "desk" | "dashed";
type B = [K, number, number, number, number];
type Pin = [number, number, string, string];
type View = { id: string; name: string; img: string; alt: string; blocks: B[]; pins: Pin[]; why: string };

const NAV = [24.8, 27.9, 31, 34.1, 37.2];
const shell = (active: number | "settings"): B[] => [
  ["desk", 0, 0, 100, 100],
  ["win", 11.25, 11.4, 77.5, 77.2],
  ["side", 11.25, 11.4, 13.1, 77.2],
  ["bar", 12.6, 19.4, 4.5, 1.4],
  ...(active === "settings" ? ([["fill", 12, 84.6, 11.6, 2.6]] as B[]) : ([["fill", 12, NAV[active] - 1.2, 11.6, 2.6]] as B[])),
  ...NAV.map((y, i): B => ["text", 12.7, y - 0.4, [3.2, 4.4, 3.8, 4.4, 5.2][i], 0.9]),
  ["text", 12.7, 85.3, 3.6, 0.9],
];

const VIEWS: View[] = [
  {
    id: "popover",
    name: "Menu bar",
    img: "/building/pebbl/menu-bar.jpg",
    alt: "The menu bar popover while recording",
    why: "The menu bar is the product. Everything you need mid-meeting fits in one popover, and it works with the main window closed.",
    blocks: [
      ["desk", 0, 0, 100, 100],
      ["menubar", 0, 0, 100, 3.1],
      ["text", 1.2, 1.1, 3, 1],
      ["text", 5.2, 1.1, 14, 1],
      ["pill", 80.4, 0.6, 5.7, 2],
      ["win", 66.4, 4.1, 27.5, 59.3],
      ["text", 67.8, 7, 3.8, 1.3],
      ["text", 87.2, 7, 4.4, 1.3],
      ["circle", 78.3, 16.8, 3.5, 4.6],
      ["pill", 74, 23.6, 7.8, 2.8],
      ["bar", 82.5, 24.3, 3.6, 1.4],
      ["text", 68.6, 28, 23, 1.2],
      ["text", 76.8, 30.4, 6.2, 1.2],
      ["text", 68.1, 34.7, 5, 1],
      ["fill", 75.6, 34.8, 16.6, 0.8],
      ["text", 68.1, 37.6, 4.6, 1],
      ["fill", 75.6, 37.7, 16.6, 0.8],
      ["box", 68.1, 41.1, 11.8, 4.6],
      ["btn", 80.5, 41.1, 11.6, 4.6],
      ["text", 72.3, 48, 15.8, 1.3],
      ["bar", 66.4, 57.2, 27.5, 0.15],
      ["text", 68.3, 59.8, 6.3, 1.2],
      ["text", 89.8, 59.8, 2.1, 1.2],
    ],
    pins: [
      [83.3, 1.6, "Timer in the menu bar", "You can tell it's recording without opening anything."],
      [80, 19, "The pebble", "Still when idle, breathing only while audio is confirmed. No looping animation during a meeting."],
      [76, 25, "Status pill", "A word, a dot and a colour together. Never colour alone."],
      [84, 36.3, "Two meters, two tracks", "If call audio is flat, you see it now, not after the meeting."],
      [86.3, 43.4, "Stop", "The primary action while recording."],
      [80, 48.6, "Stop and delete", "For “I shouldn't have recorded that”. One click, no hunting."],
    ],
  },
  {
    id: "today",
    name: "Today",
    img: "/building/pebbl/today.jpg",
    alt: "The Today screen",
    why: "Home answers two questions: am I ready to capture, and what did I say I'd do?",
    blocks: [
      ...shell(0),
      ["bar", 36, 17, 15, 2.3],
      ["text", 36, 20.4, 20, 1.1],
      ["box", 36, 24.2, 41, 29.5],
      ["circle", 37.8, 27.2, 4, 4.6],
      ["pill", 42.8, 26.4, 3.3, 1.8],
      ["text", 42.8, 29.5, 23, 1.1],
      ["box", 42.8, 32, 24, 5],
      ["box", 42.8, 37.6, 24, 6.6],
      ["box", 42.8, 44.8, 24, 6.6],
      ["btn", 68.4, 26.4, 7.2, 3.3],
      ["bar", 36, 57, 6, 1],
      ["box", 36, 59.4, 41, 18.3],
      ["text", 39, 60.8, 12, 1.1],
      ["text", 39, 62.9, 20, 0.8],
      ["text", 39, 66.8, 13, 1.1],
      ["text", 39, 68.9, 18, 0.8],
      ["text", 39, 72.9, 18, 1.1],
      ["text", 39, 75, 18, 0.8],
      ["bar", 36, 81, 7, 1],
      ["box", 36, 83.4, 41, 6],
    ],
    pins: [
      [72, 28, "One capture button", "Nothing competes with it. Starting is always a deliberate act."],
      [54.4, 30.3, "Consent, on the screen", "“Always let people know before you record them.” Not buried in a policy."],
      [55, 41, "Modes say what they need", "macOS 14.6 for call audio, macOS 15 for screen. Explained before you pick, not after it fails."],
      [39.8, 29.5, "The pebble is the state", "One mark carries idle, listening and processing."],
      [40, 61.5, "My promises", "What you owe, across every meeting, with due dates. Tick them off here."],
      [40, 85.5, "Real states only", "Recent meetings show Transcribing while they are. Never a fake finished summary."],
      [13.5, 25.2, "Five places", "Today, Meetings, Memory, Decisions, Deliverables. Named for jobs, not features."],
    ],
  },
  {
    id: "recording",
    name: "Recording",
    img: "/building/pebbl/recording.jpg",
    alt: "The Today screen while recording",
    why: "While it records, the screen proves it: elapsed time, live levels, the devices in use.",
    blocks: [
      ...shell(0),
      ["bar", 36, 17, 15, 2.3],
      ["text", 36, 20.4, 20, 1.1],
      ["box", 36, 24.2, 41, 17.6],
      ["circle", 37.8, 27.2, 4, 4.6],
      ["pill", 42.8, 26.4, 5.5, 2],
      ["bar", 48.8, 26.8, 2.6, 1.3],
      ["text", 42.8, 29.6, 18, 1.1],
      ["text", 42.8, 31.6, 2, 1.1],
      ["text", 42.8, 34.2, 3.6, 0.9],
      ["fill", 48.1, 34.3, 13.8, 0.7],
      ["text", 42.8, 36.2, 3, 0.9],
      ["fill", 48.1, 36.3, 13.8, 0.7],
      ["text", 42.8, 38.6, 16.4, 0.9],
      ["box", 63.3, 26.4, 5.9, 3.3],
      ["btn", 69.8, 26.4, 5.8, 3.3],
      ["text", 64, 31.2, 11, 1],
      ["bar", 36, 45.2, 6, 1],
      ["box", 36, 47.6, 41, 18.2],
      ["bar", 36, 69.2, 7, 1],
      ["box", 36, 71.6, 41, 16.6],
    ],
    pins: [
      [45.5, 27.4, "Recording, and how long", "Only shown once real audio arrives. Before that it says Getting ready."],
      [55, 35.3, "Live levels per track", "Both sides being heard, at a glance."],
      [72.7, 28, "Stop is primary", "Pause sits beside it, quieter."],
      [69.5, 31.7, "Stop and delete", "The same escape hatch as the menu bar."],
      [51, 39, "Named devices", "A wrong microphone is obvious before the meeting ends."],
    ],
  },
  {
    id: "meeting",
    name: "Meeting",
    img: "/building/pebbl/meeting.jpg",
    alt: "A meeting with notes and transcript",
    why: "Notes on the left, the transcript on the right. Checking a claim never means leaving the page.",
    blocks: [
      ...shell(1),
      ["text", 26.8, 17.2, 4, 1],
      ["bar", 26.8, 19.8, 22, 2.6],
      ["text", 26.8, 25.4, 22, 1.1],
      ["bar", 26.8, 29.6, 37, 1.4],
      ["bar", 26.8, 32, 7, 1.4],
      ["text", 26.8, 37.2, 36, 1.1],
      ["text", 26.8, 39.3, 24, 1.1],
      ["pill", 26.8, 43.9, 5.8, 1.9],
      ["pill", 33.2, 43.9, 4.8, 1.9],
      ["pill", 38.4, 43.9, 6.5, 1.9],
      ["bar", 26.8, 48.6, 4, 1],
      ["text", 27.2, 51.8, 12, 1.1],
      ["fill", 26.8, 53.8, 37, 3],
      ["text", 27.2, 57.8, 10, 1.1],
      ["bar", 26.8, 62.6, 6, 1],
      ["box", 26.8, 67, 37, 8.9],
      ["pill", 56.1, 68.2, 6.7, 1.8],
      ["pill", 29.5, 72.6, 3, 1.8],
      ["bar", 26.8, 78.7, 4, 1],
      ["box", 26.8, 81, 37, 8],
      ["box", 65.8, 29.3, 20.5, 59.3],
      ["text", 67, 31.2, 5, 1],
      ["text", 67, 37.4, 16, 1],
      ["text", 67, 44.4, 16, 1],
      ["text", 67, 51.4, 16, 1],
      ["fill", 66.2, 55, 19.6, 7],
      ["text", 67, 65.4, 16, 1],
      ["text", 67, 70.6, 16, 1],
      ["text", 67, 77.4, 16, 1],
    ],
    pins: [
      [27.2, 31, "One sentence first", "The meeting in a line, before anything else."],
      [28, 55.3, "Chapters are receipts", "Each must point at a real line, or it's dropped."],
      [31, 73.5, "Play the proof", "Every quote has a timestamp chip that plays that moment."],
      [59.5, 69, "From transcript", "Verified and interpreted items are labelled, not implied."],
      [67.4, 58.5, "The transcript, beside", "The cited line lights up. Click any line to hear it."],
      [28, 81.5, "Decisions with status", "Agreed or proposed, from the first meeting onward."],
    ],
  },
  {
    id: "walkthrough",
    name: "Walkthrough",
    img: "/building/pebbl/walkthrough.jpg",
    alt: "A screen recording walkthrough",
    why: "Screen recordings run through the same pipeline, so a three-minute video arrives skimmable.",
    blocks: [
      ...shell(1),
      ["text", 26.8, 17.2, 4, 1],
      ["bar", 26.8, 19.8, 25, 2.6],
      ["text", 26.8, 25.4, 21, 1.1],
      ["box", 26.8, 29.3, 37, 31.2],
      ["fill", 27.6, 32.5, 10.5, 7],
      ["fill", 39.4, 32.5, 10.5, 7],
      ["fill", 51.2, 32.5, 10.5, 7],
      ["circle", 58.4, 52.4, 4.4, 6.4],
      ["box", 26.8, 62, 37, 8.9],
      ["btn", 27.8, 63.3, 3.7, 2.4],
      ["pill", 31.9, 63.3, 5.5, 2.4],
      ["pill", 37.7, 63.3, 5.8, 2.4],
      ["text", 27.8, 66.8, 33, 1],
      ["bar", 26.8, 74, 34, 1.4],
      ["text", 26.8, 81.5, 34, 1.1],
      ["box", 65.8, 29.3, 20.5, 59.3],
      ["fill", 66.2, 41.2, 19.6, 8.8],
      ["text", 67, 37.4, 16, 1],
      ["text", 67, 53.4, 16, 1],
      ["text", 67, 62.4, 16, 1],
    ],
    pins: [
      [44, 46, "Screen and camera", "macOS 15's own recorder, with a floating camera bubble."],
      [29.6, 64.5, "Share without a server", "Mail, copy, Save or Finder. Nothing is uploaded."],
      [45, 67.3, "Say what happens", "Large videos go through Mail Drop, and the panel says so."],
      [67.4, 45.5, "Transcript and chapters", "Jump to the moment instead of scrubbing."],
    ],
  },
  {
    id: "search",
    name: "Search",
    img: "/building/pebbl/search.jpg",
    alt: "Searching meetings",
    why: "Memory is only useful if you can find things. Search reaches every line ever said.",
    blocks: [
      ...shell(1),
      ["bar", 36, 17, 8, 2.4],
      ["text", 36, 20.4, 18, 1.1],
      ["box", 36, 24.2, 41, 3.6],
      ["text", 36.9, 25.4, 8, 1],
      ["pill", 74.8, 25.2, 1.6, 1.4],
      ["box", 36, 29.3, 41, 14.7],
      ["bar", 37, 30.8, 12, 1.1],
      ["text", 37.3, 33.6, 2.4, 0.8],
      ["text", 42.3, 33.6, 13, 1],
      ["fill", 50.2, 33.4, 2.9, 1.4],
      ["text", 37.3, 36.4, 2, 0.8],
      ["text", 42.3, 36.4, 31, 1],
      ["fill", 60.2, 36.2, 3.6, 1.4],
      ["text", 37.3, 41.2, 2.4, 0.8],
      ["text", 42.3, 41.2, 18, 1],
      ["box", 36, 45, 41, 7.1],
      ["bar", 37, 46.4, 12, 1.1],
      ["text", 42.3, 49.6, 22, 1],
    ],
    pins: [
      [37.4, 25.9, "⌘K from anywhere", "Titles, notes and every transcript line."],
      [61.6, 37, "Matches, highlighted safely", "Highlights are marked by code and never rendered as HTML."],
      [38.4, 34, "Deep links", "Each hit opens the exact line, not just the meeting."],
    ],
  },
  {
    id: "trail",
    name: "Decisions: Trail",
    img: "/building/pebbl/decisions.jpg",
    alt: "The decisions trail",
    why: "A chronological feed came first. The graph waited until the data model worked.",
    blocks: [
      ...shell(3),
      ["bar", 36, 17, 7, 2.4],
      ["text", 36, 20.4, 23, 1.1],
      ["pill", 70.7, 18.9, 6.4, 3],
      ["pill", 36, 24.2, 3, 2.4],
      ["pill", 39.4, 24.2, 6.6, 2.4],
      ["pill", 46.5, 24.2, 6.6, 2.4],
      ["pill", 53.5, 24.2, 5.3, 2.4],
      ["bar", 36.4, 29.6, 0.1, 59],
      ["text", 38, 28.8, 15, 1.1],
      ["box", 38, 30.9, 39, 23.3],
      ["bar", 39, 32.5, 10, 1.2],
      ["pill", 71.1, 32.1, 5, 2],
      ["text", 39, 35.3, 15, 1],
      ["dashed", 39, 37.7, 37, 12],
      ["pill", 39.8, 43.3, 5.4, 2.4],
      ["pill", 45.6, 43.3, 6.7, 2.4],
      ["pill", 52.6, 43.3, 5.4, 2.4],
      ["pill", 58.4, 43.3, 7.1, 2.4],
      ["pill", 65.9, 43.3, 4.1, 2.4],
      ["box", 38, 55.1, 39, 17],
      ["bar", 39, 56.5, 14, 1.2],
      ["bar", 38.9, 63.9, 37.3, 0.12],
      ["text", 39, 65.6, 30, 1.1],
      ["box", 38, 77.5, 39, 10],
    ],
    pins: [
      [74, 20.4, "Trail, then Map", "The feed is the primary view. The graph is a second way in."],
      [46, 25.4, "Filter by what to do", "Needs a look, Still standing, Changed."],
      [57, 40, "Suggested, never applied", "Says why (shared words) and waits for your choice."],
      [73.6, 33.2, "Status as words and shapes", "Proposed is a hollow dot, Agreed a filled one."],
      [55, 66.2, "Replaces keeps the past", "The old decision stays, superseded, with Unlink to undo."],
    ],
  },
  {
    id: "map",
    name: "Decisions: Map",
    img: "/building/pebbl/decision-map.jpg",
    alt: "The decision map",
    why: "The map shows how decisions changed across meetings. Every node links back to the moment it was said.",
    blocks: [
      ...shell(3),
      ["bar", 36, 17, 7, 2.4],
      ["text", 36, 20.4, 23, 1.1],
      ["pill", 70.7, 18.9, 6.4, 3],
      ["box", 36, 24.2, 41, 18.2],
      ["bar", 37.2, 25.4, 9.6, 1.1],
      ["bar", 50.5, 25.4, 9.8, 1.1],
      ["bar", 63.8, 25.4, 10.6, 1.1],
      ["box", 37.2, 29.3, 11.9, 4],
      ["box", 50.5, 29.3, 11.9, 4],
      ["box", 63.8, 29.3, 11.9, 4],
      ["box", 37.2, 35.1, 11.9, 4],
      ["box", 50.5, 35.1, 11.9, 4],
      ["box", 63.8, 35.1, 11.9, 4],
      ["bar", 62.6, 37.1, 1.2, 0.15],
      ["text", 36, 43.9, 40, 1],
    ],
    pins: [
      [43, 27.6, "Meetings by date", "Left to right, oldest first."],
      [56.4, 37.2, "Superseded stays", "Struck through, still clickable, still sourced."],
      [63.2, 35.8, "Line style is meaning", "Solid replaces, dashed conflicts, dotted is only a suggestion."],
      [56, 44.4, "Said in words too", "A legend, and a screen-reader list of every connection."],
    ],
  },
  {
    id: "settings",
    name: "Settings",
    img: "/building/pebbl/settings.jpg",
    alt: "Settings in dark mode",
    why: "Settings are where trust is earned: what runs where, what it costs, and what leaves.",
    blocks: [
      ...shell("settings"),
      ["bar", 36, 18.6, 6, 1],
      ["box", 36, 21.3, 41, 25],
      ["text", 37.2, 23, 37, 1.1],
      ["text", 37.2, 24.8, 6, 1.1],
      ["box", 37.2, 27.5, 38.6, 5.3],
      ["box", 37.2, 33.5, 38.6, 5.3],
      ["box", 37.2, 39.5, 38.6, 5.3],
      ["pill", 70, 34.5, 5, 2.2],
      ["pill", 70, 40.5, 5, 2.2],
      ["bar", 36, 49.3, 3, 1],
      ["box", 36, 52, 41, 19.5],
      ["text", 37.2, 53.8, 38, 1.1],
      ["text", 37.2, 55.6, 38, 1.1],
      ["text", 37.2, 57.4, 30, 1.1],
      ["pill", 49.7, 60, 2.8, 2.4],
      ["text", 37.2, 64.4, 2.4, 1],
      ["text", 38.4, 66.6, 12, 1],
      ["text", 38.4, 68.6, 13, 1],
      ["bar", 36, 74.6, 9, 1],
      ["box", 36, 77.2, 41, 12],
    ],
    pins: [
      [55, 23.8, "Where it runs", "Says “on this Mac” before you choose a model."],
      [72.4, 35.6, "Sizes up front", "142 MB or 466 MB, downloaded once."],
      [56, 55.6, "The disclosure", "Exactly what's sent, and that usage bills to your own account."],
      [40, 61, "Your key, your Keychain", "Saved securely, with Test and Remove."],
      [55, 81, "Plain rows", "Where your data lives. What leaves this Mac."],
    ],
  },
];

export default function PebblWireframes() {
  const [vid, setVid] = useState("popover");
  const [mode, setMode] = useState<"wire" | "built">("wire");
  const [pin, setPin] = useState<number | null>(null);
  const v = VIEWS.find((x) => x.id === vid)!;
  const pick = (id: string) => {
    setVid(id);
    setPin(null);
  };
  const detail = pin !== null ? { tag: `${v.name} · ${pin + 1}`, title: v.pins[pin][2], text: v.pins[pin][3] } : { tag: v.name, title: "Why this screen", text: v.why };

  return (
    <FlowFrame
      skin="pebbl"
      eyebrow="Wireframes · nine screens, one grid"
      problem="Drawn low-fi first, then built on the same grid. Every number sits on the same element in both views."
      controls={<Toggle label="Fidelity" value={mode} onChange={setMode} options={[{ value: "wire", label: "Wireframe" }, { value: "built", label: "Built" }]} />}
      detail={detail}
      minWidth={0}
    >
      <div className={p.tabs} role="tablist" aria-label="Screens">
        {VIEWS.map((x) => (
          <button key={x.id} type="button" role="tab" aria-selected={vid === x.id} aria-pressed={vid === x.id} className={fs.btn} onClick={() => pick(x.id)}>
            {x.name}
          </button>
        ))}
      </div>
      <div className={p.frame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={v.img} alt={v.alt} loading="lazy" decoding="async" style={{ opacity: mode === "built" ? 1 : 0 }} />
        <div className={p.wf} style={{ opacity: mode === "wire" ? 1 : 0 }} aria-hidden={mode !== "wire"}>
          {v.blocks.map(([k, x, y, w, h], i) => (
            <span key={i} className={`${p.b} ${p[k]}`} style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }} />
          ))}
        </div>
        {v.pins.map(([x, y, title], i) => (
          <button key={i} type="button" className={p.pin} style={{ left: `${x}%`, top: `${y}%` }} aria-pressed={pin === i} aria-label={`${i + 1}: ${title}`} onClick={() => setPin(pin === i ? null : i)}>
            {i + 1}
          </button>
        ))}
      </div>
    </FlowFrame>
  );
}
