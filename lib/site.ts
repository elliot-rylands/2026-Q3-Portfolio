// All homepage copy lives here, so edits never touch layout code.

export const site = {
  name: "Elliot Rylands",
  url: "https://elliotrylands.com",
  role: "Design engineer",
  intro: "A product designer and design engineer with 16 years in product and growth, helping ideas find their feet and pushing them to production.",
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
    linkedin: "https://www.linkedin.com/in/elliotrylands",
    github: "https://github.com/elliot-rylands",
    dribbble: "https://dribbble.com/elliotrylands",
    email: "mailto:ui.dsgner@gmail.com",
    accessEmail: "mailto:ui.dsgner@gmail.com?subject=Case%20study%20access",
  },
  // Nations and wording follow the Town of Cochrane's own land acknowledgement.
  landAcknowledgement:
    "I live and work on Treaty 7 territory, the traditional lands of the Iyarhe Nakoda peoples of the Chiniki, Bearspaw and Goodstoney First Nations, and home to the Tsuut’ina, the Niitsitapi peoples of Siksika, Piikani and Kainai, and the Métis of the Rocky View Métis District.",
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  url: string;
  locked: boolean;
  current?: boolean; // shown as the wide "Now" card, not in the Previously grid
};

// The three locked strands inside the wide Jane card. All open the Jane
// password lightbox; descriptions stay high level on purpose.
export const janeWork = [
  { title: "Deployed", summary: "The jane.app relaunch: homepage, feature pages and mega menu." },
  { title: "Building", summary: "What's next for jane.app, prototyped in code before it ships." },
  { title: "Internal", summary: "An AI-assisted UX lab for card sorts and decision trees." },
];

// Order is the grid order: three across.
export const projects: Project[] = [
  { slug: "jane", title: "Jane", summary: "Current work, shared on request.", url: "https://jane.app", locked: true, current: true },
  { slug: "scan", title: "Scan.com", summary: "First design hire after the Series B, shaping the booking platform behind the $220M Series C.", url: "https://scan.com", locked: false },
  { slug: "squiz", title: "Squiz", summary: "Eight products into one DXP. Customers on it reported up to 2× conversion.", url: "https://squiz.net", locked: false },
  { slug: "uk-government", title: "UK Government", summary: "One self-service hub for 300,000+ civil servants across 29 departments.", url: "https://www.gov.uk", locked: false },
  { slug: "papa-johns", title: "Papa John's", summary: "An oven-fresh ordering app: custom offers, smart dietary choices and fast checkout.", url: "https://papajohns.com", locked: false },
  { slug: "gctv", title: "GCTV", summary: "Show jumping streaming: live classes, schedules and replays, plus a simpler way to subscribe.", url: "https://gctv.gcglobalchampions.com", locked: false },
  { slug: "titan-tennis", title: "Titan Tennis", summary: "Turning ball-machine settings into drills players can see.", url: "https://titanballmachines.com/", locked: false },
];

// "Also worked with" line. Leave url empty to show a name without a link.
export const clients: { name: string; url: string }[] = [
  { name: "Coca-Cola", url: "https://www.coca-cola.com" },
  { name: "Santander", url: "https://www.santander.co.uk" },
  { name: "William Hill", url: "https://www.williamhill.com" },
  { name: "Suzuki", url: "https://www.suzuki.co.uk" },
  { name: "SnipIt", url: "" },
];

