import type { PostBlock } from "../posts";
import type { CaseStudy } from "../work";

// Screens cropped out of their mockups onto one dark backdrop, each cropped to
// the part its section is about.
const sizes: Record<string, [number, number]> = {
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
  "shipped.webp": [2092, 1044],
  "sign-up.webp": [1868, 1244],
  "verify.webp": [1502, 1144],
};

const shot = (file: string, alt: string, caption: string): PostBlock => ({
  type: "image",
  text: "",
  image: { src: `/work/gctv/media/${file}`, alt, caption, width: sizes[file]?.[0], height: sizes[file]?.[1] },
});

const aim = (metric: string, text: string): PostBlock => ({ type: "callout", label: `Built to move: ${metric}`, text });

// TODO: add the concurrent multi-race view in "Every ring, one strip" when the screen arrives.
export const gctv: CaseStudy = {
  slug: "gctv",
  title: "Turning show jumping fans into subscribers, on every screen",
  dek: "Through Flipside, I designed GCTV's sign-up, subscription and onboarding, and a live experience built for concurrently watching races during large events, across web, mobile and TV.",
  accent: "light-dark(#c8102e, #ff5a6a)",
  meta: [
    { label: "Role", value: "Senior Product Designer (contract), Flipside Group" },
    { label: "Client", value: "Global Champions, GCTV" },
    { label: "Owned", value: "Sign-up, passes, onboarding, live viewing" },
    { label: "Platforms", value: "Web, iOS, Android, TV" },
  ],
  work: [
    { value: "3", label: "platforms: web, mobile and TV" },
    { value: "3", label: "steps from join to paid: account, pass, payment" },
    { value: "3", label: "passes, from free audio to full Pro" },
    { value: "2", label: "versions of the pass picker; the second replaced the first" },
  ],
  notice:
    "GCTV's results aren't mine to publish, so this one is told through the decisions and the metric each was built to move. Riders and names in the favourites screen, prices and payment details are demo data or blurred.",
  body: [
    shot(
      "hero.webp",
      "GCTV web home: a strip of live, replay and current events above the navigation, and The Insider series hero with Watch, Subscribe and Buy Series Pass.",
      "The web home. Every race running right now sits in the strip across the top.",
    ),

    { type: "h2", text: "Several rings, one weekend" },
    {
      type: "p",
      text: "Global Champions runs elite show jumping around the world, and most fans will never sit in the stands. At the big events, classes run side by side across the weekend, so the brief had a very specific ask: **let fans concurrently watch races during large events**, from wherever they are.",
    },
    {
      type: "p",
      text: "The business wanted something else from the same product: people who arrive for one round and stay as paying members, on web, mobile and TV. I designed both halves: the way in, and the reason to stay.",
    },
    {
      type: "stats",
      text: "",
      stats: [
        { value: "Sign up", label: "more people finishing the account they started" },
        { value: "Upgrade", label: "more free fans moving to a paid pass" },
        { value: "Rating", label: "a healthier app store score" },
      ],
    },

    { type: "h2", text: "Every ring, one strip" },
    {
      type: "p",
      text: "When three classes are running at once, the worst thing you can do is make people go looking. So every page carries a strip of what's live, what's replaying and what's current, and one tap moves you between them without losing your place.",
    },
    shot(
      "event-strip.webp",
      "Event strip showing a live event, a replay and a current programme side by side.",
      "Live, replay and current, side by side on every page.",
    ),
    {
      type: "p",
      text: "Inside an event, the useful things sit under the video: the current competition, height and prize money, the start time, the course plan and the start list. A language picker sits next to **Listen**, which drops the pictures and keeps the commentary, for fans following on the move.",
    },
    shot(
      "live-event.webp",
      "Mobile live event page with the video, an English language picker, a Listen button and the current competition details.",
      "The live event on mobile. Listen keeps the commentary going when you can't watch.",
    ),
    aim("upgrades", "Following several rings at once is exactly what a paid pass sells. The easier it is to feel, the easier the upgrade is to justify."),

    { type: "h2", text: "A front door that says free first" },
    {
      type: "p",
      text: "The first screen says it plainly: sign up for free, or subscribe. Nobody meets a price before they've met the product.",
    },
    {
      type: "p",
      text: "The join form asks for the essentials and nothing clever. Allowing location fills in the country for you, and says why it's asking. Only the terms box is required: GCTV news and Global Champions marketing are two separate, unticked choices. Sign Up stays disabled until the form is valid, so the button never lies about what will happen.",
    },
    shot(
      "sign-up.webp",
      "Three mobile screens: the GCTV welcome with Sign up and Login, the join form with a location prompt, and the completed form with Sign Up enabled.",
      "Welcome, join, ready. The button only lights up when everything's in.",
    ),
    {
      type: "p",
      text: "Errors appear at the field that caused them, in words a person would use: “Password doesn't match”, “Not a valid email address”. No red banner at the top of a long form.",
    },
    shot(
      "form-errors.webp",
      "Inline errors: a confirm password field reading Password doesn't match on mobile, and an email field reading Not a valid email address on web.",
      "Mistakes flagged where they happen, on mobile and web.",
    ),

    { type: "h2", text: "Verify without a dead end" },
    {
      type: "p",
      text: "Email verification is where sign-ups quietly die. The waiting screen shows the address you used, so a typo is obvious, with a Send Again link right under it. The email itself is branded, has one button, tells you the link lasts seven days, and tells you what to do if it wasn't you.",
    },
    shot(
      "verify.webp",
      "Confirm email screen showing the address used and Send Again, next to the branded verification email with a Verify my account button.",
      "The waiting screen and the email it's waiting for.",
    ),
    aim("sign-up completion", "Every step between “Sign up” and a verified account is a place to lose someone. Showing the address, offering a resend and keeping the email to one job all protect the finish."),

    { type: "h2", text: "The pass picker, twice" },
    {
      type: "p",
      text: "The first version put the choice on its own page after verification: Pro, Live and Free side by side, nothing preselected. The button read “Select your option” until you chose, then named the pass and the price you were about to pay.",
    },
    shot(
      "passes-v1.webp",
      "Version one: Account Verified, Choose your pass, with Live Pass selected and the button reading Select Live Pass, 64.99 a year.",
      "Version one. The button names the pass and the price before you commit.",
    ),
    {
      type: "p",
      text: "Version two replaced it. The pass became step two of one flow, **join, pass, pay**, with progress dots so you always know how far is left. Each pass shows its monthly and yearly price as the buttons themselves, so choosing a price is choosing a pass. The yearly saving is stated up front, and the free tier became the Access Pass: audio-only events and commentary, a real product rather than a consolation prize.",
    },
    shot(
      "passes-v2.webp",
      "Version two on web: Select your pass with Pro, Live and Access passes, each with monthly and yearly price buttons and a promotional offer badge.",
      "Version two. The price is the button.",
    ),
    shot(
      "passes-v2-mobile.webp",
      "Version two on mobile: Subscribe pinned at the bottom, disabled until a price is chosen, then enabled.",
      "On mobile, Subscribe stays pinned and wakes up once you've picked a price.",
    ),
    aim("upgrades", "A price you can tap, a saving you can see and a free tier that's still worth having all make the step from free to paid feel like a choice, not a toll."),

    { type: "h2", text: "Pay the way you already pay" },
    {
      type: "p",
      text: "Payment keeps the pass you chose, and everything in it, above the options: Apple Pay, card or PayPal, with the order total before the button. The fastest checkout is the one where you don't type a card number.",
    },
    shot(
      "payment.webp",
      "Select payment method with Apple Pay chosen and the order total, next to the Apple Pay sheet with personal details blurred.",
      "What you're buying stays on screen while you pay for it.",
    ),

    { type: "h2", text: "Make it yours before you watch" },
    {
      type: "p",
      text: "Once you're in, one last, optional step: pick the tournaments and riders you care about, so the app can put them first. “Skip this for now” is right there, and the button only lights up once you've picked something.",
    },
    shot(
      "favourites.webp",
      "Select your favourite tournaments and riders, with several selected, Skip this for now, and a Select favourites button.",
      "Favourite tournaments and riders. Skippable, but worth thirty seconds.",
    ),

    { type: "h2", text: "A sponsor people actually tap" },
    {
      type: "p",
      text: "Longines is the title sponsor, and sponsors usually get a banner people learn to ignore. I designed the placement as something to watch instead: a Longines Stories strip, Instagram-style, sitting inside the app among the live rows. Each card is a short story with Start Watching on it, and it looks like content because it is.",
    },
    shot(
      "longines-stories.webp",
      "Longines Stories strip on TV: portrait story cards with Start Watching buttons, above a row of live championship events.",
      "Longines Stories. The sponsor's placement is the thing people came for: more horses.",
    ),
    aim("sponsor value", "A placement people choose to open is worth more to a sponsor than one they scroll past, and it doesn't cost the viewer anything to enjoy it."),

    { type: "h2", text: "It shipped" },
    {
      type: "p",
      text: "These aren't mockups. This is the flow running on gctv.gcglobalchampions.com on a phone: join, choose a pass, pay, confirm.",
    },
    shot(
      "shipped.webp",
      "Four screenshots from Safari on a phone at gctv.gcglobalchampions.com: join, select your pass, select payment method and confirm email.",
      "Live on the real site, in Safari on a phone.",
    ),

    { type: "h2", text: "What I could point to" },
    {
      type: "p",
      text: "Sign-up, passes, payment, onboarding and live viewing designed across web, mobile and TV, and shipped on the live site. Two versions of the pass picker, with the second replacing the first. A sponsor placement people want to open.",
    },
    {
      type: "p",
      text: "The honest limit: the numbers live with GCTV, and I rolled off before I saw them. What I can point to is that every screen here was aimed at one of three things the business cared about: finished sign-ups, free fans upgrading, and the app's rating.",
    },
    {
      type: "p",
      text: "**Credits:** the Flipside Group team, and Global Champions' GCTV product and engineering teams. I designed the sign-up, subscription and onboarding journeys and the live viewing experience.",
    },
  ],
};
