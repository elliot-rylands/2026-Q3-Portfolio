import type { PostBlock } from "./posts";

// "What I'm building": side projects in progress, shown on the homepage and
// at /building/[slug]. Copy is drawn from each project's own docs, and says
// plainly what isn't finished yet.
export type Build = {
  slug: string;
  name: string;
  tagline: string;
  summary: string; // homepage card, keep it to about 75 to 80 characters
  status: string;
  stack: string;
  cover: { src: string; alt: string };
  body: PostBlock[];
};

const img = (file: string, alt: string, caption?: string): PostBlock => ({
  type: "image",
  text: "",
  image: { src: `/building/pebbl/${file}.jpg`, alt, caption },
});

export const builds: Build[] = [
  {
    slug: "pebbl",
    name: "pebbl.",
    tagline: "Small, dependable, quietly collecting your thoughts.",
    summary: "A macOS meeting companion that shows its work, down to the second it was said.",
    status: "In progress",
    stack: "macOS · Tauri, Rust, React, Whisper, Claude",
    cover: { src: "/building/pebbl/light-and-dark.jpg", alt: "pebbl. meeting notes in light and dark mode, with the transcript beside them" },
    body: [
      {
        type: "p",
        text: "pebbl. lives in the menu bar. It records your microphone and, on newer Macs, the call audio as a separate track. It transcribes on your Mac, then writes notes where every decision and action links to the exact moment it was said, so you can replay it.",
      },
      {
        type: "p",
        text: "Most meeting tools hand you a confident summary you can't check. pebbl. is built around one rule: **nothing appears without the line it came from.**",
      },
      img("light-and-dark", "A meeting in pebbl., in light and dark mode", "Summary, chapters, promises and decisions, with the transcript alongside."),
      {
        type: "stats",
        text: "",
        stats: [
          { value: "0", label: "audio files leave your Mac" },
          { value: "3", label: "evidence labels: verified, interpretation, insufficient" },
          { value: "~1s", label: "the most a crash can lose, in 30-second chunks" },
        ],
      },
      { type: "h2", text: "Evidence, checked by code" },
      {
        type: "p",
        text: "Claude writes the notes, but pebbl. doesn't take its citations on trust. Native code checks every quote against the transcript and labels each item verified, interpretation or insufficient. Bad citations are dropped and counted, never repaired or invented.",
      },
      img("meeting", "Meeting notes with a promise and a decision, each linked to a timestamp", "Click any timestamp to hear that moment."),
      {
        type: "p",
        text: "**My promises** are decided by code too. An action only becomes yours if a verified quote came from your own microphone track. If the recording can't tell who said it, pebbl. says so rather than guessing.",
      },
      img("today", "The Today screen, with capture options and My promises", "Today: start a capture, see what you said you'd do."),
      img("decisions", "A timeline of decisions, each with the quote it came from", "Decisions: a trail of what changed, and where each choice was made."),
      { type: "h2", text: "Private by default" },
      {
        type: "p",
        text: "Speech turns into text on the Mac with Whisper, so audio never leaves it. Notes are optional and use your own Anthropic API key, kept in the Keychain. Only transcript text is sent, and only after a plain-language disclosure.",
      },
      {
        type: "p",
        text: "Microphone and call audio are recorded as separate tracks, so \"you\" and \"others\" come from the track, not from guessing voices. When call audio leaks into the mic through speakers, those lines are marked as echo and kept out of the evidence.",
      },
      img("settings", "Settings for on-device transcription models and notes", "Settings explain exactly what leaves the Mac, and when."),
      { type: "h2", text: "Small, and honest about recording" },
      {
        type: "p",
        text: "Click the pebble in the menu bar for a popover with live levels for each track, and the timer stays in the menu bar while it records. It only says Recording once real audio arrives. Silence gets flagged, with a link to fix it.",
      },
      img("menu-bar", "The menu bar popover while recording, with microphone and call audio levels", "Pause, stop, or stop and delete, from the menu bar."),
      img("recording", "The Today screen while recording", "Recording to this Mac only."),
      {
        type: "p",
        text: "On macOS 15 it also records your screen with a camera bubble for quick walkthroughs. They come with chapters and a transcript, and you share them by Mail, copy or Finder. Nothing is uploaded.",
      },
      img("walkthrough", "A screen recording walkthrough with sharing options and a transcript", "Walkthroughs, shared without a server."),
      img("search", "Searching meetings for availability upfront", "Search across titles, notes and transcripts."),
      { type: "h2", text: "How it's built" },
      {
        type: "ul",
        text: "",
        items: [
          "A Tauri 2 shell with a platform-free Rust core, so the recording state machine is unit tested.",
          "A React and TypeScript interface that never decides recording state itself: the native side does.",
          "Capture through Core Audio, written in 30-second chunks with crash recovery on the next launch.",
          "whisper.cpp on device, and Claude with structured outputs for the notes.",
          "Design tokens tested for WCAG AA contrast in light and dark.",
        ],
      },
      { type: "h2", text: "Where it is" },
      {
        type: "p",
        text: "It runs on my Mac. It isn't signed or released yet, and there's no accuracy evaluation yet, so I don't make accuracy claims. Next up: testing on real meetings, signing, and a public download for other Macs.",
      },
    ],
  },
];

export function getBuild(slug: string) {
  return builds.find((b) => b.slug === slug);
}
