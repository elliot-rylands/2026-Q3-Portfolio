// All homepage copy lives here, so edits never touch layout code.

export const site = {
  name: "Elliot Rylands",
  url: "https://elliotrylands.com",
  role: "Design engineer",
  intro: "A design engineer with 16 years in product and growth, helping ideas find their feet and pushing them to production.",
  current: {
    before: "Currently designing and building at ",
    link: { label: "Jane", href: "https://jane.app" },
    after: " from Cochrane, near the Canadian Rockies.",
  },
  alsoLine: "Also Coca-Cola, Santander, William Hill, Suzuki and SnipIt.",
  now: [
    "A Brit in the Bow Valley, rebuilding this site in the open and writing up the work one case study at a time.",
    "Making music when the laptop closes, usually on a guitar I don't need and a synth I'm still learning.",
  ],
  nowQuote: "I'd rather show you the data than the deck.",
  links: {
    linkedin: "#",
    github: "https://github.com/elliot-rylands",
    dribbble: "#",
    email: "#",
  },
  footer: "Made by hand in the Rockies.",
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  locked: boolean;
};

// Order is the grid order: three across.
export const projects: Project[] = [
  { slug: "scan", title: "Scan.com", summary: "Booking and charting portals for imaging.", locked: true },
  { slug: "squiz", title: "Squiz", summary: "Merging a suite of CMS products into one DXP.", locked: true },
  { slug: "uk-government", title: "UK Government", summary: "17 departments, one hub, £300m saved.", locked: true },
  { slug: "papa-johns", title: "Papa John's", summary: "Ordering flow and global design system.", locked: true },
  { slug: "gctv", title: "GCTV", summary: "Onboarding and multi-race live viewing.", locked: true },
  { slug: "titan-tennis", title: "Titan Tennis", summary: "Native app for a smart ball machine.", locked: true },
];

export type Post = { slug: string; title: string; summary: string };

// Words: empty until the first post is written.
export const posts: Post[] = [];
