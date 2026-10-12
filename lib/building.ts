import type { PostBlock } from "./posts";

// "What I'm building": side projects in progress, shown on the homepage and
// at /building/[slug]. Copy is drawn from each project's own docs, and says
// plainly what isn't finished yet.
export type Build = {
  slug: string;
  name: string;
  tagline: string;
  summary: string; // homepage card, keep it to about 75 to 80 characters
  title: string;
  dek: string;
  status: string;
  stack: string;
  meta: { label: string; value: string }[];
  work: { value: string; label: string }[];
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
    title: "A meeting notetaker that shows its receipts",
    tagline: "Small, dependable, quietly collecting your thoughts.",
    dek: "pebbl. is a small macOS app I designed and built with Claude in a day. It records, transcribes on your Mac, and links every decision and promise back to the second it was said.",
    summary: "A macOS meeting companion that shows its work, down to the second it was said.",
    status: "In progress",
    stack: "macOS · Tauri, Rust, React, Whisper, Claude",
    cover: { src: "/building/pebbl/light-and-dark.jpg", alt: "pebbl. meeting notes in light and dark mode, with the transcript beside them" },
    meta: [
      { label: "Role", value: "Product, design and build, with Claude" },
      { label: "Timeline", value: "October 2026, first build in a day" },
      { label: "Platform", value: "macOS 13+, menu bar first" },
      { label: "Stack", value: "Tauri 2, Rust, React, Whisper, Claude" },
    ],
    work: [
      { value: "1 day", label: "from written spec to a decision graph" },
      { value: "200", label: "automated tests, 97 Rust and 103 frontend" },
      { value: "33", label: "design decisions written down as they were made" },
      { value: "0", label: "audio files leave your Mac" },
    ],
    body: [
      {
        type: "p",
        text: "pebbl. lives in the menu bar. It records your microphone and, on newer Macs, the call audio as a separate track. It turns speech into text on your Mac, then writes notes where every decision and action links to the exact moment it was said.",
      },
      {
        type: "callout",
        label: "The bet",
        text: "Every meeting tool can write a summary now. The gap is trust: you can't tell what was said from what was guessed. pebbl. competes on **proof, not prose**.",
      },
      img("light-and-dark", "A meeting in pebbl., in light and dark mode", "Notes, chapters, promises and decisions, with the transcript alongside. All screenshots use sample data."),

      { type: "h2", text: "The problem" },
      {
        type: "p",
        text: "Notetakers fail quietly, in three ways. They look like they're recording when they aren't, and you find out afterwards. They write confident summaries you can't check, so one wrong action poisons the rest. And they overwrite last week's decision with this week's, as if it never happened. Many also join your call as a bot, which changes the room before anyone has spoken.",
      },
      {
        type: "compare",
        text: "",
        compare: {
          before: { label: "A typical notetaker", items: ["A bot joins the call", "A summary you can't check", "Actions assigned to “the team”", "Yesterday's decision overwritten", "Audio uploaded by default"] },
          after: { label: "pebbl.", items: ["Starts quietly from the menu bar", "Every claim links to the second it was said", "My promises, from your own mic", "Both versions kept, and linked", "Audio never leaves the Mac"] },
        },
      },

      { type: "h2", text: "The journey" },
      {
        type: "p",
        text: "I mapped one meeting and the week after it against the five jobs in the spec: capture, understand, remember, verify and act. The meeting itself isn't where it hurts. The pain sits afterwards, when you need to trust, find or act on what was said. So that's where pebbl. spends its effort.",
      },
      { type: "demo", text: "pebbl-journey" },

      { type: "h2", text: "Five principles" },
      {
        type: "ul",
        text: "",
        items: [
          "**Small.** No clutter, no performative complexity.",
          "**Dependable.** Accurate state, resilient capture, recoverable data.",
          "**Quiet.** Useful when needed, invisible when not.",
          "**Grounded.** Show the evidence, never invent certainty.",
          "**Actionable.** Turn remembered conversations into work.",
        ],
      },
      {
        type: "p",
        text: "Each one settled real arguments later. Grounded is why a paraphrase can't become a quote. Dependable is why the word Recording waits for real audio. Quiet is why nothing joins your call.",
      },

      { type: "h2", text: "1. Evidence Mode" },
      {
        type: "p",
        text: "**What:** every decision, action and chapter carries a citation: a transcript line and the words quoted from it. Click it and you hear that moment. **Why:** a summary you can't check is a rumour. The fastest way to lose someone is one confident, wrong action item.",
      },
      { type: "demo", text: "pebbl-evidence" },
      {
        type: "p",
        text: "The important call was where the check lives. Asking a model to be honest is a hope; checking its answer is a guarantee. So the model returns citations, and native code decides. A quote found word for word is **verified**. A real line with different words is shown as **AI interpretation**. A citation to a line that doesn't exist is dropped, and the count is shown rather than hidden.",
      },
      img("meeting", "Meeting notes with a promise and a decision, each linked to a timestamp", "The cited line lights up in the transcript. Click any line to hear it."),

      { type: "h2", text: "2. My promises" },
      {
        type: "p",
        text: "**What:** a list of the things you said you'd do, across every meeting, with due dates. **Why:** that's the list people actually need on a Friday afternoon, and models are generous with ownership. So the rule is strict and written in code: the model says you own it, the quote is verified, and the line came from your own microphone track.",
      },
      { type: "demo", text: "pebbl-promises" },
      img("today", "The Today screen, with capture options and My promises", "Today: start a capture, see what you owe."),

      { type: "h2", text: "3. Honest capture" },
      {
        type: "p",
        text: "**What:** the recording lifecycle lives in the native layer, and the interface only shows what it reports. **Why:** the worst failure a notetaker has is silent. It only says Recording once the first real audio arrives. Pure silence becomes “No sound coming in” after 1.5 seconds. Audio is written in 30-second chunks with the header rewritten every second, so a crash costs about a second.",
      },
      { type: "demo", text: "pebbl-capture" },
      img("menu-bar", "The menu bar popover while recording", "The timer sits in the menu bar. Two meters, two tracks."),

      { type: "h2", text: "4. Private by default" },
      {
        type: "p",
        text: "**What:** speech becomes text on the Mac with Whisper. Notes are optional, use your own Anthropic key from the Keychain, and send transcript text only. **Why:** people are recording their colleagues, so the default has to be that nothing goes anywhere. Separate tracks also mean “you” and “others” come from the track, not from guessing voices.",
      },
      { type: "demo", text: "pebbl-privacy" },
      img("settings", "Settings for on-device transcription and notes", "Settings say what runs where, what it costs, and what leaves."),

      { type: "h2", text: "5. Decisions that keep their history" },
      {
        type: "p",
        text: "**What:** a trail of decisions across meetings, with links like Replaces it, Builds on it and Conflicts with it. **Why:** plans change, and a tool that quietly overwrites the old answer makes every argument about who said what. pebbl. never rewrites history. It suggests a connection from shared wording, changes nothing until you choose, and keeps an append-only record.",
      },
      { type: "demo", text: "pebbl-decisions" },
      img("decisions", "The decisions trail with a suggestion to review and a confirmed replacement", "Trail: a suggestion waiting for a choice, and a replacement that kept the old decision."),
      img("decision-map", "The decision map, with meetings by date and links between decisions", "Map: superseded decisions stay visible, struck through, still clickable."),
      {
        type: "p",
        text: "The Trail shipped first and the Map second, on purpose. A graph drawn before the data model works is decoration. Once links and history held up in tests, the Map became a second way into the same facts, with a screen-reader list stating every connection in words.",
      },

      { type: "h2", text: "Wireframes" },
      {
        type: "p",
        text: "I wireframed nine screens on the same grid as the final build, so each numbered note sits on the same element in both. Switch between Wireframe and Built to see what changed, and what didn't.",
      },
      { type: "demo", text: "pebbl-wireframes" },
      img("walkthrough", "A screen recording walkthrough with sharing options", "Walkthroughs go through the same pipeline, so a video arrives with a transcript and chapters."),
      img("search", "Searching meetings", "⌘K search across titles, notes and every transcript line."),

      { type: "h2", text: "The design system" },
      {
        type: "ul",
        text: "",
        items: [
          "**Mineral warmth.** Chalk and paper surfaces, ink text. Moss means live and healthy, clay means recording, slate-blue means evidence.",
          "**Never colour alone.** Every status pairs a colour with a word and a shape. Problems use a square marker.",
          "**Contrast is tested.** The muted grey was darkened until it passed WCAG AA on every surface, and a test checks the pairs in both themes.",
          "**Motion has a job.** Still when idle, breathing while listening, a slow drift while processing, and static for errors. Reduce Motion is respected.",
          "**Licensed type.** Geist, bundled locally under the OFL. Timestamps in the system mono.",
        ],
      },

      { type: "h2", text: "How it was built" },
      {
        type: "p",
        text: "I wrote the spec first, and that's where most of the design happened: positioning, jobs to be done, what V1 must do, what it must not pretend to do, and phases with exit gates. Then I built it with Claude in one sitting, logging each decision as it was made.",
      },
      {
        type: "timeline",
        text: "",
        steps: [
          { when: "Phase 0", title: "Foundation", text: "Tauri shell, menu bar, popover, design tokens with contrast tests." },
          { when: "Phase 1", title: "Capture", text: "Microphone and call audio to crash-safe files, with recovery." },
          { when: "Phase 2", title: "Evidence", text: "On-device transcription, checked notes, Evidence Mode, My promises." },
          { when: "Phase 3", title: "Library", text: "Search, editing, export, retention, shortcuts." },
          { when: "Then", title: "Screen and brand", text: "Screen recording, the brand system, chapters, the decisions trail." },
          { when: "Phase 5", title: "Decision graph", text: "Links, append-only history, suggestions and the Map." },
        ],
      },
      {
        type: "p",
        text: "The non-goals mattered as much as the features. V1 refuses to pretend it can capture every meeting automatically, tell every voice apart, be perfectly accurate, or get consent on your behalf. Saying no is what kept a one-day build honest.",
      },

      { type: "h2", text: "Validation" },
      {
        type: "p",
        text: "An app about not overclaiming shouldn't overclaim about itself. The status file uses one rule: “tested” means verified by a named command in a named environment. Here's where each piece stands.",
      },
      { type: "demo", text: "pebbl-validation" },
      {
        type: "callout",
        label: "Not yet",
        text: "No real meeting has been run end to end, there's no accuracy evaluation, and the app isn't signed. Next, in that order: a real-meeting test pass, an evaluation set, then a signed download for other Macs.",
      },

      { type: "h2", text: "What I learned" },
      {
        type: "ul",
        text: "",
        items: [
          "**The spec was the design work.** Writing down the non-goals and exit gates did more for the product than any screen.",
          "**Trust is mostly what you refuse to show.** A dropped citation, a hidden echo line and a missing promises list are all features.",
          "**Building in the real material surfaces real decisions.** “Recording only after the first buffer” and echo removal never come up in a mockup.",
        ],
      },
    ],
  },
];

export function getBuild(slug: string) {
  return builds.find((b) => b.slug === slug);
}
