import type { PostBlock } from "../posts";
import type { CaseStudy } from "../work";

// Screens cropped out of their mockups onto one dark backdrop, each cropped to
// the part its section is about.
const sizes: Record<string, [number, number]> = {
  "event-hub.webp": [1536, 1186],
  "event-strip.webp": [2200, 209],
  "favourites.webp": [2200, 1689],
  "form-errors.webp": [1528, 844],
  "hero.webp": [2200, 1193],
  "live-event.webp": [1900, 1561],
  "longines-stories.webp": [1130, 700],
  "passes-v1.webp": [1390, 1114],
  "passes-v2-mobile.webp": [1204, 1044],
  "passes-v2.webp": [1384, 834],
  "payment.webp": [1218, 904],
  "results.webp": [1536, 756],
  "schedule-mobile.webp": [1500, 1035],
  "schedule.webp": [1536, 1036],
  "shipped.webp": [2092, 1044],
  "sign-up.webp": [1868, 1244],
  "verify.webp": [1502, 1144],
};

const shot = (file: string, alt: string, caption: string): PostBlock => ({
  type: "image",
  text: "",
  image: { src: `/work/gctv/media/${file}`, alt, caption, width: sizes[file]?.[0], height: sizes[file]?.[1] },
});

// Two linked journeys: following the competition, then joining. Watching comes
// first, because it's what the membership sells.
export const gctv: CaseStudy = {
  slug: "gctv",
  title: "Turning show jumping fans into subscribers, on every screen",
  dek: "At a major show jumping event, following one class can mean missing another. Through Flipside, I designed the routes between live competition, schedules and replays, alongside the sign-up and subscription journey that pays for them.",
  accent: "light-dark(#c8102e, #ff5a6a)",
  meta: [
    { label: "Role", value: "Senior Product Designer (contract), Flipside Group" },
    { label: "Client", value: "Global Champions, GCTV" },
    { label: "Owned", value: "Live viewing, schedule and results, sign-up, passes, onboarding" },
    { label: "Platforms", value: "Designed for web, mobile and TV" },
  ],
  work: [
    { value: "2", label: "linked journeys: following the competition, and joining" },
    { value: "3", label: "steps from join to paid: account, pass, payment" },
    { value: "2", label: "versions of the pass picker; the second replaced the first" },
  ],
  notice:
    "GCTV's results aren't mine to publish. Riders, teams, results, schedules, prices and payment details in these screens are demo data or blurred.",
  body: [
    shot(
      "hero.webp",
      "GCTV web home: a strip of live, replay and current events above the navigation, and The Insider series hero with Watch, Subscribe and Buy Series Pass.",
      "The web home. Whatever is live sits in the strip across the top.",
    ),
    {
      type: "p",
      text: "Global Champions runs elite show jumping around the world, and most fans will never sit in the stands. At the big events, classes run side by side across the weekend. The brief put it as “concurrently watching races during large events”. In show jumping they're classes and rounds rather than races, but the ask was right: a fan following one ring shouldn't lose track of the others.",
    },
    {
      type: "p",
      text: "The business needed the same product to turn those fans into paying members. So there were two journeys to design, and they depend on each other: following the competition, which is what a pass buys, and joining, which is how you get one.",
    },

    { type: "demo", text: "", demo: "flow-gctv" },

    { type: "h2", text: "Following the competition" },
    {
      type: "p",
      text: "Every page carries a strip of what's live, what's replaying and what's current, so switching between rings is one tap from anywhere, without losing your place.",
    },
    shot(
      "event-strip.webp",
      "Event strip showing a live event, a replay and a current programme side by side.",
      "Live, replay and current, on every page.",
    ),
    {
      type: "p",
      text: "The event page is the hub for a weekend: what's live at the top with Watch, Listen and the Time Schedule one tap away, and the rest of the tour underneath.",
    },
    shot(
      "event-hub.webp",
      "Event page: a live competition hero with Watch, Listen and Time Schedule, a row of featured streams, and previous, next and upcoming events.",
      "The event hub. Live first, then everything around it.",
    ),
    {
      type: "p",
      text: "The Time Schedule does the heavy lifting. Every class is one row, coloured by competition (blue for the Longines Global Champions Tour, red for the Global Champions League), filtered by day and class level, with the live one flagged. Each row carries the same four actions: course plan, reminder, results and watch. On mobile the rows become cards and the filters become two dropdowns.",
    },
    shot(
      "schedule.webp",
      "Time Schedule on web: filters for day and class level, and six class rows colour-coded by tour, one marked live, each with course plan, reminder, results and watch buttons.",
      "One row per class, one colour per competition, the same four actions on each.",
    ),
    shot(
      "schedule-mobile.webp",
      "Mobile Time Schedule with All Days and class level dropdowns, and a live class card with course plan, reminder, results and watch buttons.",
      "The same schedule on a phone.",
    ),
    {
      type: "p",
      text: "When a class ends, results take over, and every ride in the table has its own replay for each round. A fan who was watching another ring can go straight to the round they missed. That loop, from schedule to live to replay, is what the design supports: following several classes by switching quickly between them, rather than watching several streams at once on one screen.",
    },
    shot(
      "results.webp",
      "Team results: a podium of three league teams, then a results table where each rider's round A and round B has its own play button.",
      "Every ride in the results is one tap from its replay.",
    ),
    {
      type: "p",
      text: "Inside a live class, the details a fan checks sit under the video: the competition, height, prize money, start time and course plan. Next to the language picker, **Listen** drops the pictures and keeps the commentary, for following on the move.",
    },
    shot(
      "live-event.webp",
      "Mobile live event page with the video, an English language picker, a Listen button and the current competition details.",
      "The live class on mobile, with Listen for when you can't watch.",
    ),

    { type: "h2", text: "Joining without a toll booth" },
    {
      type: "p",
      text: "The first screen offers two plain choices: sign up for free, or subscribe. The join form asks for the essentials. Allowing location fills in the country and says why it's asking, only the terms box is required, and marketing from GCTV and Global Champions are two separate, unticked choices. Sign Up stays disabled until the form is valid, and errors appear at the field that caused them.",
    },
    shot(
      "sign-up.webp",
      "Three mobile screens: the GCTV welcome with Sign up and Login, the join form with a location prompt, and the completed form with Sign Up enabled.",
      "Welcome, join, ready. The button lights up when everything's in.",
    ),
    shot(
      "form-errors.webp",
      "Inline errors: a confirm password field reading Password doesn't match on mobile, and an email field reading Not a valid email address on web.",
      "Mistakes flagged where they happen, on mobile and web.",
    ),
    {
      type: "p",
      text: "Verification is where sign-ups tend to stall. The waiting screen shows the address you used, so a typo is obvious, with Send Again right under it. The email itself has one button, says how long the link lasts, and says what to do if it wasn't you.",
    },
    shot(
      "verify.webp",
      "Confirm email screen showing the address used and Send Again, next to the branded verification email with a Verify my account button.",
      "The waiting screen and the email it's waiting for.",
    ),

    { type: "h2", text: "The pass picker, twice" },
    {
      type: "p",
      text: "Version one put the choice on its own page after verification: Pro, Live and Free side by side, with a button that named the pass and price once you'd chosen.",
    },
    shot(
      "passes-v1.webp",
      "Version one: Account Verified, Choose your pass, with Live Pass selected and the button reading Select Live Pass, 64.99 a year.",
      "Version one. The button names the pass and the price before you commit.",
    ),
    {
      type: "p",
      text: "Version two replaced it, and changed three things. The pass became step two of one flow, join, pass, pay, with progress dots. Each pass shows its monthly and yearly prices as the buttons themselves, so choosing a price is choosing a pass. And the free tier became the Access Pass, with audio-only events and commentary, a product in its own right rather than the option you're steered away from.",
    },
    shot(
      "passes-v2.webp",
      "Version two on web: Select your pass with Pro, Live and Access passes, each with monthly and yearly price buttons and a promotional offer badge.",
      "Version two. The price is the button.",
    ),
    shot(
      "passes-v2-mobile.webp",
      "Version two on mobile: Subscribe pinned at the bottom, disabled until a price is chosen, then enabled.",
      "On mobile, Subscribe stays pinned and wakes up once a price is picked.",
    ),
    {
      type: "p",
      text: "Payment keeps the chosen pass, and what it includes, above Apple Pay, card and PayPal, with the total before the button. Afterwards, an optional step asks for favourite tournaments and riders, with “Skip this for now” right there.",
    },
    shot(
      "payment.webp",
      "Select payment method with Apple Pay chosen and the order total, next to the Apple Pay sheet with personal details blurred.",
      "What you're buying stays on screen while you pay for it.",
    ),
    shot(
      "favourites.webp",
      "Select your favourite tournaments and riders, with several selected, Skip this for now, and a Select favourites button.",
      "Favourites: optional, and skippable.",
    ),

    { type: "h2", text: "The sponsor, inside the product" },
    {
      type: "p",
      text: "Longines, the title sponsor, needed a placement. I designed it as Longines Stories, an Instagram-style strip of short stories with Start Watching on each card, sitting among the live rows on TV. It gives the sponsor presence in the product, and gives fans something they can choose to open rather than a banner to scroll past.",
    },
    shot(
      "longines-stories.webp",
      "Longines Stories strip on TV: portrait story cards with Start Watching buttons, above a row of live championship events.",
      "Longines Stories on TV, among the live rows.",
    ),

    { type: "h2", text: "What went live" },
    {
      type: "p",
      text: "The flows were prototyped in code and kept in GitHub, then shipped in steps rather than as one launch, with the pass picker's second version replacing the first. Here is the join, pass, pay and confirm flow running on the live site in Safari on a phone. The TV and native app screens in this study are my designs; the web flow is the part shown here in production.",
    },
    shot(
      "shipped.webp",
      "Four screenshots from Safari on a phone at gctv.gcglobalchampions.com: join, select your pass, select payment method and confirm email.",
      "Live on the site, in Safari on a phone.",
    ),
    {
      type: "p",
      text: "The commercial idea was simple: make following the sport easy enough that a pass feels worth having. GCTV holds the numbers on whether it worked.",
    },
    {
      type: "p",
      text: "**Credits:** the Flipside Group team, and Global Champions' GCTV product and engineering teams. I designed the live viewing, schedule and results journeys, sign-up, subscription and onboarding.",
    },
  ],
  scale: {
    heading: "GCTV in context",
    note: "Global Champions' own published figures, for a sense of scale. They describe the product and the tour, not results of my work.",
    stats: [
      { value: "600+", label: "hours of live streaming, at launch" },
      { value: "4", label: "commentary languages for the headline classes" },
      { value: "2021", label: "GCTV launched, the start of Global Champions' “digital transformation journey”" },
      { value: "16", label: "tour events in the 2023 season" },
    ],
  },
  sources: [
    { label: "GCTV launch", href: "https://www.gcglobalchampions.com/en-us/news/global-champions-launches-new-exclusive-streaming-service" },
    { label: "2023 calendar", href: "https://www.gcglobalchampions.com/en-us/news/longines-global-champions-tour-announces-16-stage-calendar-for-2023" },
  ],
};
