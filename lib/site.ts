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

// Order is the grid order: three across.
export const projects: Project[] = [
  { slug: "jane", title: "Jane", summary: "Current work, shared on request.", url: "https://jane.app", locked: true, current: true },
  { slug: "scan", title: "Scan.com", summary: "Patient booking and centre operations, joined around one referral.", url: "https://scan.com", locked: false },
  { slug: "squiz", title: "Squiz", summary: "Eight products brought together without eight rebuilds.", url: "https://squiz.net", locked: false },
  { slug: "uk-government", title: "UK Government", summary: "Self-service designed to make calling the slower option.", url: "https://www.gov.uk", locked: false },
  { slug: "papa-johns", title: "Papa John's", summary: "The UK app ordering journey, from store timing to checkout.", url: "https://papajohns.com", locked: false },
  { slug: "gctv", title: "GCTV", summary: "Following the competition, choosing a pass and getting back to the action.", url: "https://gctv.gcglobalchampions.com", locked: false },
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

