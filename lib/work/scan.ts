import type { CaseStudy } from "../work";

const img = (file: string) => `/work/scan/media/${file}`;

// Images follow the story: the finished product first, then the patient
// journey in the order a patient meets it, then the imaging centre side.
export const scan: CaseStudy = {
  slug: "scan",
  title: "Taking imaging bookings out of the inbox",
  dek: "As Scan.com's first design hire, I reimagined two portals, one for patients and one for imaging centres, to help people with serious symptoms facing long NHS waiting lists get scanned and seen sooner.",
  meta: [
    { label: "Role", value: "Staff Product Designer, first design hire" },
    { label: "When", value: "Aug 2023 to Apr 2025, remote" },
    { label: "Team", value: "Founders, engineering, imaging centre partners" },
    { label: "Tools", value: "Figma, design tokens, Cursor, Claude" },
  ],
  work: [
    { value: "1st", label: "design hire" },
    { value: "4 steps", label: "from referral to booked scan" },
    { value: "9", label: "order statuses, each on an SLA clock" },
    { value: "1", label: "token system behind every surface" },
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
        caption: "The finished product: filter centres, pick a real slot, compare prices on a map.",
      },
    },

    { type: "h2", text: "The problem" },
    {
      type: "p",
      text: "Scan.com sold private MRI and CT scans to people stuck on long NHS waiting lists. The website could show you a scan near you. Everything after that ran on email: patients wrote in to book, change or cancel, and imaging centres typed every request into their own systems by hand.",
    },
    {
      type: "p",
      text: "There was no product on either side of the booking. I joined as the first design hire to build one, for patients and for the centres that scan them.",
    },

    { type: "demo", text: "", demo: "flow-scan" },

    { type: "h2", text: "The referral fills in the form" },
    {
      type: "p",
      text: "Most patients arrive because a clinician referred them. So the journey starts there: a welcome that names who sent them, what they've been referred for, and the three things that happen next.",
    },
    {
      type: "image",
      text: "",
      image: {
        src: img("02-referral.webp"),
        alt: "Referral welcome naming the referring clinician, with three steps: book your scan, have your consultation, receive your results.",
        caption: "Step zero. The patient knows who referred them and what happens next before they touch a form.",
      },
    },
    {
      type: "p",
      text: "The first step of booking is already filled in from the referral. Patients check their details and move on. They can edit their own details, but not the scan. The clinician ordered it, so it's locked, with a note on who to contact if it looks wrong.",
    },
    {
      type: "image",
      text: "",
      image: {
        src: img("03-confirm-details.webp"),
        alt: "Confirm your details step, pre-filled, with the scan details marked cannot be changed.",
        caption: "Step 1. Personal details are editable. The scan the clinician ordered is not.",
      },
    },

    { type: "h2", text: "Price broke the first version" },
    {
      type: "p",
      text: "The first booking flow failed in usability sessions, and it failed on price. People reached payment before they understood what they were paying for, or what the price covered.",
    },
    {
      type: "p",
      text: "So price stopped being a checkout surprise. Every centre shows its price with a “What's included?” beside it, from the moment you start comparing.",
    },
    {
      type: "image",
      text: "",
      image: {
        src: img("04-choose-centre.webp"),
        alt: "Choose a scanning centre step, with price, what's included, next-day tags and a selected centre.",
        caption: "Step 2. Price and what it covers sit on every centre, not at the end.",
      },
    },
    {
      type: "p",
      text: "Through the safety questions, a booking summary stays on screen: the centre, the time, the scan, each inclusion and the total. Nothing changes between here and payment.",
    },
    {
      type: "image",
      text: "",
      image: {
        src: img("05-safety-summary.webp"),
        alt: "Safety questions beside a booking summary listing inclusions and the total cost.",
        caption: "Step 3. The patient answers safety questions with the full price in view.",
      },
    },

    { type: "h2", text: "Book first, account second" },
    {
      type: "p",
      text: "I moved account creation to after booking. Patients book and pay first, then set a password on the confirmation page, where the account has an obvious job: managing the booking and getting results. The receipt below repeats every line they agreed to.",
    },
    {
      type: "image",
      text: "",
      image: {
        src: img("06-confirmation.webp"),
        alt: "Booking received page with next steps, account creation and an itemised order receipt.",
        caption: "After paying. The account comes after the booking, and the receipt matches what they saw at every step.",
      },
    },

    { type: "h2", text: "Centres work every order in one list" },
    {
      type: "p",
      text: "On the other side of every booking is an imaging centre. Their orders used to live in email threads. I replaced them with one worklist: nine statuses from pending to results sent back to the referring provider, an SLA clock on every order, and at-risk flags on the ones going stale.",
    },
    {
      type: "image",
      text: "",
      image: {
        src: img("07-orders.webp"),
        alt: "Orders worklist with counts per status, at-risk flags, filters and an SLA per order.",
        caption: "The same bookings, seen by the centre. Stalled orders surface before they breach.",
      },
    },
    {
      type: "p",
      text: "Opening an order shows everything in one place: the referral, the practice, the intake answers and the appointments. Safety answers the patient gave in step 3, like a pacemaker, arrive flagged, so nobody finds out at the scanner.",
    },
    {
      type: "image",
      text: "",
      image: {
        src: img("08-order-detail.webp"),
        alt: "Order detail drawer showing referring provider, practice, reason for scan and flagged intake answers.",
        caption: "What the patient said in step 3 reaches the centre flagged, before the appointment.",
      },
    },
    {
      type: "p",
      text: "We looked at an off-the-shelf scheduling tool and chose to build instead, so the patient flow and the centre worklist could share one model of an order.",
    },

    { type: "h2", text: "Speed, and the system that bought it" },
    {
      type: "p",
      text: "The founders wanted features fast, and a design system looked like a delay. I built coded prototypes in Cursor on the real tokens and put them in front of patients and centre staff in usability sessions. Working screens changed the conversation. One token system was how a patient flow and a centre worklist could ship quickly without drifting apart: a status means the same colour and the same words on both sides.",
    },

    { type: "callout", label: "Prototyped in GitHub, shipped small", text: "Every journey started as a coded prototype on the real tokens, kept in GitHub, and went in front of patients and centre staff before engineering picked it up. The first booking flow failed on price in those sessions, not in production. Then the referral journey, booking flow, mobile search and centre worklist shipped as separate pieces, and the worklist was piloted with imaging centres." },

    { type: "h2", text: "What I could point to" },
    {
      type: "p",
      text: "The referral journey, booking flow, mobile search and centre worklist shipped, and were piloted with imaging centres. It became part of how Scan.com told its story to investors.",
    },
    {
      type: "p",
      text: "When I joined, bookings ran on email. The Series C, raised in August 2026, describes search, scheduling and results delivery in one system, and notes that 85% of US scans are still booked by fax or phone. That's the problem the patient flow and centre worklist were built to replace. The raise isn't mine to claim, but the foundation it scaled on started with that work.",
    },
    {
      type: "p",
      text: "The honest limit: I left for Canada in April 2025, before I could see long-term results myself. The product has moved on since, as products should. The foundation, from zero, was mine.",
    },
    {
      type: "p",
      text: "**Credits:** Scan.com's founders set the direction and took the product to investors. The engineering team built it. I designed the referral journey, booking flow, mobile search, centre worklist and token system, and built the prototypes.",
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
