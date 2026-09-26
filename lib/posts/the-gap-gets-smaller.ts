import type { Post } from "../posts";

export const theGapGetsSmaller: Post = {
    slug: "the-gap-gets-smaller",
    title: "The gap gets smaller when you build both sides",
    dek: "Faster engineering doesn't make craft optional. It makes the quality of your decisions impossible to hide.",
    date: "2026-08-19",
    readTime: 6,
    body: [
      {
        type: "demo",
        text: "gap",
        demo: "gap",
      },
      {
        type: "p",
        text: "I wanted to see how quickly I could move from **an idea, to Figma, to an actual architecture, to something working in a browser** without treating design and engineering as two separate jobs.",
      },
      {
        type: "p",
        text: "The object at the top is a row that removes someone's access. In Figma it's a dead Delete button. In the browser you get eight seconds to take it back. That flip is the whole argument.",
      },
      {
        type: "p",
        text: "I wasn't trying to ship a product. I was trying to ship a **component that changes the experience**: a consequential action with a window, not a cliff.",
      },
      {
        type: "p",
        text: "The row is a specimen. The impact was the loop.",
      },
      {
        type: "p",
        text: "I stopped waiting for a handoff. I found the wrong things while I could still change them. And once implementation got cheaper, I had less cover for lazy product decisions.",
      },
      { type: "h2", text: "I still started in Figma" },
      {
        type: "p",
        text: "AI hasn't made me want to skip design.",
      },
      {
        type: "p",
        text: "Quite the opposite.",
      },
      {
        type: "p",
        text: "I started in Figma because I wanted somewhere cheap to make decisions: hierarchy, density, type, what the row is, what Remove actually does, and what absolutely should not live in a confirm dialog.",
      },
      {
        type: "p",
        text: "I wasn't trying to design every possible screen before touching code.",
      },
      {
        type: "p",
        text: "I was trying to establish the **grammar of the control**.",
      },
      {
        type: "ul",
        text: "",
        items: [
          "What does a member look like in the system?",
          "What does revoked look like?",
          "What deserves interruption?",
          "What should happen without asking?",
          "What can you still undo?",
        ],
      },
      {
        type: "p",
        text: "That gave me enough of a visual and behavioural language to start building.",
      },
      {
        type: "p",
        text: "Then I stopped designing the picture.",
      },
      { type: "h2", text: "The picture needed a system underneath it" },
      {
        type: "p",
        text: "The handoff used to be the line.",
      },
      {
        type: "p",
        text: "Design finished here. Engineering started there.",
      },
      {
        type: "p",
        text: "For this build, the line was deliberately blurry.",
      },
      {
        type: "p",
        text: "Before asking Claude to write much of anything, I worked out the shape underneath the interface: the entities, relationships, states and rules the UI would eventually have to represent.",
      },
      {
        type: "code",
        lang: "text",
        text: "Member\n  └── Seat\n       └── Access\n            ├── Role\n            ├── Revoke\n            ├── Undo window\n            └── Commit",
      },
      {
        type: "p",
        text: "That little diagram matters more than quite a lot of pixels.",
      },
      {
        type: "p",
        text: "Because once `Access` can become `Revoked`, and revoke has a consequence, a window, and a commit you cannot rewind, the interface stops being a collection of frames.",
      },
      {
        type: "p",
        text: "It becomes a view onto a system.",
      },
      {
        type: "p",
        text: "That's the first impact. You stop decorating screens and start designing consequences. Remove isn't red because it looks important. It's a window because the person on the other side of it still has a job to do. Undo isn't a toast. It has to restore the seat.",
      },
      { type: "h2", text: "Then Claude became part of the loop" },
      {
        type: "p",
        text: "I used Claude heavily during the build.",
      },
      {
        type: "p",
        text: "Not as a **make app** button.",
      },
      {
        type: "p",
        text: "More like an extremely fast engineering partner with no objection to me changing my mind every eleven minutes.",
      },
      {
        type: "p",
        text: "I'd give it the intent, architecture, constraints and existing code. It could help scaffold the row, reason through motion, find boring TypeScript problems and get me from an interaction in my head to something I could actually touch.",
      },
      {
        type: "p",
        text: "Then I'd use the working thing to design again.",
      },
      {
        type: "code",
        lang: "text",
        text: "Figma\n   ↓\nProduct model\n   ↓\nArchitecture\n   ↓\nClaude\n   ↓\nWorking software\n   ↓\n\"Oh. That's wrong.\"\n   ↓\nDesign again",
      },
      {
        type: "p",
        text: "That last bit is doing quite a lot of work.",
      },
      {
        type: "p",
        text: "The impact of a loop that fast is not that you produce more screens. It's that **wrong** arrives while you still have the nerve, and the time, to change it. Minutes, not meetings. No deck to defend. No week of implementation sunk into a composition that was never going to survive a thumb on Remove.",
      },
      { type: "h2", text: "The browser pushed back" },
      {
        type: "p",
        text: "A static design is extraordinarily polite.",
      },
      {
        type: "p",
        text: "It sits exactly where you left it.",
      },
      {
        type: "p",
        text: "Software is less accommodating.",
      },
      {
        type: "p",
        text: "Press Remove and the row has to leave, say what just happened, and mean it. Leave undo as a badge and you realise it was supposed to bring her back. Leave the name as “Member name” and the object stays a wireframe pretending to be a decision.",
      },
      {
        type: "p",
        text: "Those moments changed the design.",
      },
      {
        type: "p",
        text: "Not because I'd failed to design it properly in Figma, but because **the component had started answering back**.",
      },
      {
        type: "p",
        text: "That's the bit I've become slightly addicted to.",
      },
      {
        type: "p",
        text: "The picture cannot tell you that eight seconds is long enough to notice a mistake and short enough to feel like a door. The working row can. Once you've felt that, going back to arguing about frames starts to feel like describing a meal instead of tasting it.",
      },
      { type: "h2", text: "The stack was ordinary. The movement wasn't." },
      {
        type: "p",
        text: "The final thing wasn't particularly exotic, which was intentional.",
      },
      {
        type: "ul",
        text: "",
        items: [
          "**Figma** for the initial product language and interaction thinking",
          "**Next.js + React + TypeScript** for the component",
          "**CSS** for the surface",
          "**Motion** for the swap, the countdown, and reduced motion",
          "**Claude** throughout the engineering loop",
        ],
      },
      {
        type: "p",
        text: "The interesting technology wasn't any one item on that list.",
      },
      {
        type: "p",
        text: "It was the speed at which I could move **between them**.",
      },
      {
        type: "p",
        text: "A spacing decision in Figma could become a token. A product rule could become a state machine. A state machine could expose a bad interaction. That interaction could send me back to the design.",
      },
      {
        type: "p",
        text: "Minutes, not meetings.",
      },
      {
        type: "image",
        text: "",
        image: {
          src: "/words/the-gap-gets-smaller/workspace.jpg",
          alt: "A tablet with an architecture diagram in front of a monitor of code.",
          caption: "Grammar on the tablet. Code on the monitor. The interesting bit is moving between them.",
        },
      },
      { type: "h2", text: "Faster engineering made the decisions louder" },
      {
        type: "p",
        text: "This is probably the bit worth saying.",
      },
      {
        type: "p",
        text: "Claude made me dramatically faster at producing code.",
      },
      {
        type: "p",
        text: "It did not decide what the component should be.",
      },
      {
        type: "p",
        text: "It didn't know that Remove should undo, not confirm. It didn't care that the copy should say what Maya loses, not that a row disappeared. It didn't decide that committed needs an empty well, not a toast.",
      },
      {
        type: "p",
        text: "Those are product decisions.",
      },
      {
        type: "p",
        text: "If anything, faster engineering gives me **less excuse not to sweat them**.",
      },
      {
        type: "p",
        text: "When implementation becomes cheaper, the quality of the decisions becomes more visible.",
      },
      {
        type: "p",
        text: "That's the actual impact. Not that I can produce a settings-shaped thing. That I can no longer hide a vague idea behind a beautiful file, or a weak interaction behind \"engineering will figure it out.\" The loop will expose it before lunch.",
      },
      { type: "h2", text: "Somewhere in the middle" },
      {
        type: "p",
        text: "I've spent a lot of my career around the supposed gap between design and engineering.",
      },
      {
        type: "p",
        text: "I'm increasingly unconvinced the interesting place is either side of it.",
      },
      {
        type: "p",
        text: "For me, it's the bit in the middle.",
      },
      {
        type: "p",
        text: "Design enough to know what you're trying to make. Understand enough engineering to give it a sensible shape. Use tools like Claude to collapse the expensive bits. Get a real component into the browser as quickly as possible.",
      },
      {
        type: "p",
        text: "Then look at the real thing.",
      },
      {
        type: "p",
        text: "Argue with it.",
      },
      {
        type: "p",
        text: "Change it.",
      },
      {
        type: "p",
        text: "The gap between design and engineering gets considerably smaller when you're willing to work on both sides of it.",
      },
    ],
  };
