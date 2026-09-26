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
  about: [
    "Essex born, now in Cochrane with my wife, daughter, and two dogs. Forever in pursuit of an incredible wildlife sighting, maybe a little overconfidently. That confidence also extends to my balance. A few too many broken bones later, Alberta healthcare and I are on first-name terms.",
    "I snowboard, paddleboard the Bow, and skateboard with my daughter, who’s getting better than me rather quickly. I write and record music, collect vinyl and gig posters, and own more guitars than my local guitar store, needlessly. There’s usually a camera within reach when I’m not wielding a laptop or guitar, given the unpredictability of every corner I turn in the Rockies.",
  ],
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
  url: string;
  locked: boolean;
};

// Order is the grid order: three across.
export const projects: Project[] = [
  { slug: "scan", title: "Scan.com", summary: "Booking and charting portals for imaging.", url: "https://scan.com", locked: true },
  { slug: "squiz", title: "Squiz", summary: "Merging a suite of CMS products into one DXP.", url: "https://squiz.net", locked: true },
  { slug: "uk-government", title: "UK Government", summary: "17 departments, one hub, £300m saved.", url: "https://www.gov.uk", locked: true },
  { slug: "papa-johns", title: "Papa John's", summary: "Ordering flow and global design system.", url: "https://papajohns.com", locked: true },
  { slug: "gctv", title: "GCTV", summary: "Onboarding and multi-race live viewing.", url: "https://gctv.gcglobalchampions.com", locked: true },
  { slug: "titan-tennis", title: "Titan Tennis", summary: "Native app for a smart ball machine.", url: "https://titanballmachines.com/", locked: true },
];

// "Also worked with" line. Leave url empty to show a name without a link.
export const clients: { name: string; url: string }[] = [
  { name: "Coca-Cola", url: "https://www.coca-cola.com" },
  { name: "Santander", url: "https://www.santander.co.uk" },
  { name: "William Hill", url: "https://www.williamhill.com" },
  { name: "Suzuki", url: "https://www.suzuki.co.uk" },
  { name: "SnipIt", url: "" },
];

export type Post = { slug: string; title: string; summary: string };

// Words: empty until the first post is written.
export const posts: Post[] = [];
