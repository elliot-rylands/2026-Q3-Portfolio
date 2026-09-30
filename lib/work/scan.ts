import type { CaseStudy } from "../work";

const img = (file: string) => `/work/scan/media/${file}`;

// Images follow the story: the finished product first, then the patient
// journey in the order a patient meets it, then the imaging centre side.
export const scan: CaseStudy = {
  slug: "scan",
  title: "Taking imaging bookings out of the inbox",
  dek: "A scan booking had two journeys: the patient trying to get seen, and the centre trying to turn a referral into an appointment. Both ran through email. As Scan.com's first design hire, I designed the product on both sides.",
  meta: [
    { label: "Role", value: "Staff Product Designer, first design hire" },
    { label: "When", value: "Aug 2023 to Apr 2025, remote" },
    { label: "Team", value: "Founders, engineering, imaging centre partners" },
    { label: "Tools", value: "Figma, Cursor, GitHub, design tokens" },
  ],
  work: [
    { value: "2", label: "sides of one order: patient and imaging centre" },
    { value: "4", label: "booking steps, from referral to payment" },
    { value: "1", label: "token system shared by both portals" },
  ],
  notice:
    "Scan.com's product is confidential. Names, addresses, prices and numbers in these screens are placeholders or blurred, and no real patient, partner or business data is shown.",
  body: [
    {
      type: "image",
      text: "",
      image: {
        src: img("01-hero.webp"),
        alt: "Scan.com centre filters, a week of appointment slots, and mobile search with prices pinned on a map.",
        caption: "Filter centres, pick a real slot, compare prices on a map.",
      },
    },
    {
      type: "p",
      text: "Scan.com sells private MRI and CT scans to people stuck on long NHS waiting lists. When I joined, the website could show you a scan near you, and everything after that was email. Patients wrote in to book, change or cancel. Imaging centres retyped each request into their own systems.",
    },
    {
      type: "p",
      text: "So the job was never just a booking form. It was one order that two very different people needed to trust: an anxious patient, and a centre running a busy scanner list.",
    },

    { type: "demo", text: "", demo: "flow-scan" },

    { type: "h2", text: "Start with who sent them" },
    {
      type: "p",
      text: "Most patients arrive because a clinician referred them, so the journey starts with that referral: who sent them, what for, and the three things that happen next.",
    },
    {
      type: "image",
      text: "",
      image: {
        src: img("02-referral.webp"),
        alt: "Referral welcome naming the referring clinician, with three steps: book your scan, have your consultation, receive your results.",
        caption: "The patient knows who referred them and what happens next before they touch a form.",
      },
    },
    {
      type: "p",
      text: "The first booking step is filled in from the referral. Patients can correct their own details, but the scan itself is locked, with a note on who to contact if it looks wrong. The clinician ordered that scan. Letting a patient quietly swap it would mean the centre scanning something nobody referred.",
    },
    {
      type: "image",
      text: "",
      image: {
        src: img("03-confirm-details.webp"),
        alt: "Confirm your details step, pre-filled, with the scan details marked cannot be changed.",
        caption: "Personal details are editable. The scan the clinician ordered is not.",
      },
    },

    { type: "h2", text: "Price was arriving too late" },
    {
      type: "p",
      text: "The first version of the booking flow failed in usability sessions, and it failed on price. People reached payment before they understood what they were paying for, or what the price covered.",
    },
    {
      type: "p",
      text: "I moved price into the comparison, with the inclusions beside it, and kept the same total visible through the safety questions. From the first centre you look at to the moment you pay, the number doesn't change and neither does the list of what it buys.",
    },
    {
      type: "image",
      text: "",
      image: {
        src: img("04-choose-centre.webp"),
        alt: "Choose a scanning centre step, with price, what's included, next-day tags and a selected centre.",
        caption: "Price and what it covers sit on every centre, not at the end.",
      },
    },
    {
      type: "image",
      text: "",
      image: {
        src: img("05-safety-summary.webp"),
        alt: "Safety questions beside a booking summary listing inclusions and the total cost.",
        caption: "Safety questions, answered with the full price still in view.",
      },
    },
    {
      type: "p",
      text: "Account creation moved to after payment. Asking for a password before someone has booked anything is asking for trust you haven't earned. On the confirmation page the account has an obvious job: managing the booking and getting results.",
    },
    {
      type: "image",
      text: "",
      image: {
        src: img("06-confirmation.webp"),
        alt: "Booking received page with next steps, account creation and an itemised order receipt.",
        caption: "The account comes after the booking, and the receipt matches every step before it.",
      },
    },

    { type: "h2", text: "Meanwhile, at the centre" },
    {
      type: "p",
      text: "Every one of those bookings lands with an imaging centre, where orders used to live in email threads. I designed a single worklist instead: nine statuses from pending to results sent back to the referring clinician, a service-level clock on every order, and at-risk flags on the ones going stale.",
    },
    {
      type: "image",
      text: "",
      image: {
        src: img("07-orders.webp"),
        alt: "Orders worklist with counts per status, at-risk flags, filters and an SLA per order.",
        caption: "The same bookings, seen by the centre, with stalled orders surfaced first.",
      },
    },
    {
      type: "p",
      text: "This is where the patient's side pays off operationally. The safety answers from step 3 arrive on the order, flagged. If a patient says they have a pacemaker, the centre knows before the appointment, not at the scanner.",
    },
    {
      type: "image",
      text: "",
      image: {
        src: img("08-order-detail.webp"),
        alt: "Order detail drawer showing referring provider, practice, reason for scan and flagged intake answers.",
        caption: "What the patient said in step 3 reaches the centre before they do.",
      },
    },
    {
      type: "p",
      text: "We looked at an off-the-shelf scheduling tool and chose to build. The deciding requirement was a single model of an order that both portals read from, so a status means the same thing, in the same words and colour, to a patient and to a radiographer.",
    },

    { type: "h2", text: "Working screens before specs" },
    {
      type: "p",
      text: "The founders wanted features quickly, and a design system looked like a delay. Rather than argue, I built coded prototypes in Cursor on the real design tokens, kept them in GitHub, and took them into usability sessions with patients and centre staff. That is how the price problem was caught in a session rather than in production, and how one token system ended up behind both portals without slowing anyone down.",
    },
    {
      type: "p",
      text: "Nothing shipped as one big release. The referral journey, booking flow, mobile search and centre worklist went out as separate pieces, and the worklist was piloted with imaging centres.",
    },

    { type: "h2", text: "What the order model was worth" },
    {
      type: "p",
      text: "The lasting decision was treating a booking as one order with two audiences rather than two products that happen to share data. Everything else, the flagged safety answers, the matching receipt, the shared statuses, falls out of that.",
    },
    {
      type: "p",
      text: "I left for Canada in April 2025, before any long-term numbers existed for me to see. In August 2026 Scan.com raised its Series C, describing search, scheduling and results delivery in one system and noting that 85% of US scans are still booked by fax or phone. That round belongs to the company. The problem it describes is the one this work was built to replace.",
    },
    {
      type: "p",
      text: "**Credits:** Scan.com's founders set the direction and took the product to investors, and the engineering team built it. I designed the referral journey, booking flow, mobile search, centre worklist and token system, and built the prototypes.",
    },
  ],
  scale: {
    heading: "Scan.com in context",
    note: "Company figures from Scan.com and Sacra, for a sense of the business this work sat inside. They describe the company, not results of my work.",
    stats: [
      { value: "$43M", label: "Series B, 2023" },
      { value: "$220M", label: "Series C, August 2026: $90M equity and $130M debt" },
      { value: "2x", label: "revenue year on year, to a $165M annualised run rate" },
      { value: "900K+", label: "patients served through the network" },
    ],
  },
  sources: [
    { label: "Scan.com Series C press release", href: "https://scan.com/media/press-releases/scan-com-series-c-2026" },
    { label: "Sacra", href: "https://sacra.com/c/scan-com/" },
  ],
};
