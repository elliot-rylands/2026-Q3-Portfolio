import type { CaseStudy } from "../work";

const img = (file: string) => `/work/terr-ai/media/${file}`;

// Contract through A.Team. The AI agent was the AI architect's work; the
// screens, flows and walkthrough videos were mine. Outcome numbers are
// A.Team's and sit in `scale`, never in `work`.
export const terrAi: CaseStudy = {
  slug: "terr-ai",
  title: "Giving property managers one place to see what their AI agent handled",
  dek: "Terr.ai's AI agent answers tenant questions across phone, SMS and email. As Product Design Lead on contract through A.Team, I designed the product around it: the dashboard where managers check what was handled, the calendar for inspections and works, and the website that sells it.",
  meta: [
    { label: "Role", value: "Product Design Lead, contract" },
    { label: "When", value: "2024 to 2025, through A.Team" },
    { label: "Team", value: "Terr.ai founders, an A.Team AI architect, engineering" },
    { label: "Work", value: "All screens, plus videos of the key user flows" },
  ],
  work: [
    { value: "3", label: "channels in one inbox: email, SMS and inbound calls" },
    { value: "6", label: "versions of the inspections and works calendar" },
    { value: "1", label: "visual system across dashboard, calendar and website" },
  ],
  notice: "Screens use placeholder content. No real tenant, property or business data is shown.",
  accent: "#a3220f",
  body: [
    {
      type: "image",
      text: "",
      image: {
        src: img("01-dashboard.webp"),
        alt: "Terr.ai dashboard: resolved and unresolved communication counts, channels in the sidebar, and a table pairing each tenant question with its answer.",
        caption: "The manager's home: what the agent resolved, what it didn't, and every question beside its answer.",
        width: 1800,
        height: 1350,
      },
    },
    {
      type: "p",
      text: "Terr.ai comes from the owners of Hexa, a real estate business, and gives homeowners and property managers the tools to run and grow a portfolio. Its core is an AI agent that answers tenants on the channels they already use, and reads their leases to do it.",
    },
    {
      type: "p",
      text: "Responding to tenant inquiries can take up to 75% of a property manager's day. Most of those questions repeat: when does my lease end, when is rent due, who's fixing the boiler. The agent could answer them. My job was the other half: making it something a manager would trust, check and step into.",
    },

    { type: "demo", text: "", demo: "flow-terr" },

    { type: "h2", text: "One inbox, three channels" },
    {
      type: "p",
      text: "Tenants don't pick one channel, so the dashboard doesn't either. Emails, SMS and inbound calls sit together in the sidebar with live counts, and the top line answers the question a manager opens the app with: how much got resolved, and how much still needs me.",
    },
    {
      type: "p",
      text: "The table is built for checking, not reading. Each row pairs the unit, the tenant's question and the agent's answer, with its status beside them. A manager can scan a page of answers in seconds, open one that looks wrong, and reply by email or SMS from the same screen.",
    },
    {
      type: "p",
      text: "Units, Documents and Questions & Answers share one view, because a tenant's question, their lease and the answer the agent gave are really one record.",
    },

    { type: "h2", text: "A calendar that comes from the leases" },
    {
      type: "p",
      text: "Once the agent could read lease dates, the next job was acting on them. Inspections and works became a calendar of their own: every event tied to a building, a unit and a tenant, flagged for urgency, with replies from the people invited. It went through six versions, step through them below.",
    },
    { type: "demo", text: "", demo: "terr-calendar" },
    {
      type: "p",
      text: "Through the versions the event card stayed the anchor. Viewing, editing, rescheduling and creating all happen in the same card, in the same place, so a manager never loses the week they were looking at.",
    },

    { type: "h2", text: "Brand and website" },
    {
      type: "p",
      text: "I also designed the marketing site and its visual system: a warm terracotta palette and an illustration set of homes, keys, leases and the AI helper, art-directed into one consistent style. The site explains what the product does in the order a manager cares: communication first, then rent, scale, leases and the calendar.",
    },
    {
      type: "image",
      text: "",
      image: { src: img("10-site-hero.webp"), alt: "Terr.ai website hero: Revolutionizing property management through the power of AI, over an illustrated city.", caption: "The website hero, in the same terracotta as the product.", width: 1447, height: 781 },
    },
    {
      type: "image",
      text: "",
      image: { src: img("11-site-features.webp"), alt: "Feature rows with illustrations: AI-powered communication, automated rent collection, from 1 unit to 10,000, smart lease generation.", caption: "One illustration per feature, each in the same palette and line.", width: 1447, height: 2888 },
    },
    {
      type: "image",
      text: "",
      image: { src: img("12-illustration-city.webp"), alt: "Illustration of a city of homes and apartment blocks in terracotta tones.", caption: "Brand illustration: the range of homes Terr.ai is for.", width: 1536, height: 1024 },
    },

    { type: "h2", text: "How the work ran" },
    {
      type: "p",
      text: "A.Team matched Terr.ai with an AI architect, who validated the agent with rapid prototypes before building it properly. The team worked in three-month cycles per feature set, testing each capability with real users before moving on.",
    },
    {
      type: "p",
      text: "I designed alongside those cycles: the screens for each feature set, and videos of the important user flows so the founders, the architect and engineering could see how a manager would actually move through it before anything was built.",
    },
    {
      type: "quote",
      text: "We helped tenants get the information they needed faster, while freeing up managers to focus on critical problems instead of repetitive requests.",
      cite: { name: "A.Team AI Architect", role: "on the Terr.ai engagement", href: "https://www.a.team/case-studies/terr-ai" },
    },
    {
      type: "p",
      text: "**Credits:** Terr.ai's founders set the direction. The A.Team AI architect designed and built the agent: the language models, lease reading and voice. I designed the product screens, the calendar, the website and its illustration system, and the flow videos.",
    },
  ],
  scale: {
    heading: "What the team reported",
    note: "Results reported by A.Team for the Terr.ai engagement, plus one industry figure for context. They describe the product and the team's outcomes, not my design work alone.",
    stats: [
      { value: "~600", label: "tenant messages and emails handled automatically, per manager per month" },
      { value: "3 months", label: "per feature cycle, each validated with real users" },
      { value: "75%", label: "of a property manager's day can go on tenant inquiries (industry figure)" },
    ],
  },
  sources: [
    { label: "A.Team case study", href: "https://www.a.team/case-studies/terr-ai" },
    { label: "LetHub", href: "https://www.lethub.co/blog/rental-inquiries" },
  ],
};
