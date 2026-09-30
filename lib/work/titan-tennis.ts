import type { PostBlock } from "../posts";
import type { CaseStudy } from "../work";

// Mockups cropped to the phones that matter; flat screens composed on the same
// #111 backdrop the mockups use. Placeholder copy in the designs is replaced
// with representative drill names.
const sizes: Record<string, [number, number]> = {
  "before.webp": [2336, 1660],
  "community.webp": [2092, 1849],
  "drill-list.webp": [1902, 1924],
  "edit-drill.webp": [2092, 1884],
  "first-run.webp": [2200, 1414],
  "megadrill.webp": [1902, 1924],
  "pairing-support.webp": [2200, 1943],
  "profiles.webp": [2092, 1849],
  "qr-cards.webp": [2200, 712],
};

const src = (file: string) => `/work/titan-tennis/media/${file}`;

const shot = (file: string, alt: string, caption: string): PostBlock => ({
  type: "image",
  text: "",
  image: { src: src(file), alt, caption, width: sizes[file]?.[0], height: sizes[file]?.[1] },
});

const aim = (metric: string, text: string): PostBlock => ({ type: "callout", label: `Built to move: ${metric}`, text });

export const titanTennis: CaseStudy = {
  slug: "titan-tennis",
  title: "Turning a ball machine into a coach in your pocket",
  dek: "On a direct contract, I designed the Titan Drills app for Titan's tennis and pickleball machines: setup, drill building, sessions and a community that lives where players already are.",
  accent: "light-dark(#4d6b00, #c4f23a)",
  meta: [
    { label: "Role", value: "Senior Product Designer (contract)" },
    { label: "When", value: "2022 to 2023" },
    { label: "Client", value: "Titan Ball Machines" },
    { label: "Platforms", value: "iOS and Android" },
  ],
  work: [
    { value: "2", label: "sports in one app: tennis and pickleball" },
    { value: "5", label: "settings per ball: height, speed, direction, delay, spin" },
    { value: "3", label: "versions of the drill list, from slots to names" },
    { value: "4", label: "doors into the community: drills, profiles, social, support" },
  ],
  notice:
    "Titan's sales and usage numbers aren't mine to publish, so this one is told through the decisions and what each was built to move. Drill names, player profiles and photos in the screens are demo data, and placeholder copy has been replaced with representative text.",
  body: [
    shot(
      "edit-drill.webp",
      "Titan Drills Edit Drill screen: a wireframe tennis court with the target zone highlighted, a ball trajectory arc, and a per-ball table of height, speed, direction, delay and spin with Start Drill and Simulate.",
      "Edit Drill. Where each ball goes, how it gets there, and a button to try it.",
    ),

    { type: "h2", text: "A great machine with a spreadsheet for a remote" },
    {
      type: "p",
      text: "Titan makes robotic ball machines for tennis and pickleball. The hardware was serious: variable speed, spin, height and placement, ball after ball. The app players used to drive it was a grid of numbered buttons and a table of raw values, with a help screen explaining what every button did.",
    },
    shot(
      "before.webp",
      "The previous controller app: twelve grey numbered drill buttons, an Edit Drill table of numbers for each ball, and a long help screen explaining each button.",
      "Before. Numbers in, numbers out, and a help page to decode them.",
    ),
    {
      type: "p",
      text: "My brief was the whole app: getting a new owner from box to first ball, making drills something you can **see** rather than type, and giving players a reason to keep coming back. I worked directly with Titan and their engineering partners at Hachibot in Beijing.",
    },
    {
      type: "stats",
      text: "",
      stats: [
        { value: "Setup", label: "less time from unboxing to the first ball" },
        { value: "Practice", label: "more sessions, and longer ones" },
        { value: "Spread", label: "drills travelling beyond one player's phone" },
      ],
    },

    { type: "h2", text: "Out of the box, onto the court" },
    {
      type: "p",
      text: "The first run does one job: find the machine. Open the app and it tries to **auto connect** straight away, with Skip for anyone who wants to look around first, and a Tennis or Pickleball mode chosen before you ever see a drill.",
    },
    shot(
      "first-run.webp",
      "Three phones: the Titan app icon on a home screen, the Titan splash, and an auto connect screen with a Skip button and a Tennis mode picker.",
      "Tap, splash, connecting. The mode is set before the first drill.",
    ),
    {
      type: "p",
      text: "If it can't find the machine, onboarding shows you where to press on the real thing: a photo of the machine with the On/Off button called out, and one plain instruction to put it into Bluetooth mode. Support answers the questions people actually ask, in their words: how do I connect, how do I charge it, how many balls can I add.",
    },
    shot(
      "pairing-support.webp",
      "Bluetooth Connection onboarding with the machine's On/Off button highlighted, next to a Support screen listing questions like How do I connect and How do I charge the machine.",
      "Point at the button on the machine, not a paragraph about it.",
    ),
    aim("setup time", "Every minute between unboxing and the first ball is a minute someone might spend writing a return request. Auto connect, a photo of the button, and FAQs in plain questions all shorten it."),

    { type: "h2", text: "From memory slots to drills you recognise" },
    {
      type: "p",
      text: "The machine stores drills in numbered slots, so the first version of the list did too: D1 to D8. It was honest to the hardware, but nobody thinks “I'll do D4 today.” The final list leads with the **sport** (a tennis ball or a pickleball) and the **name you gave the drill**. The slot number became an engineering detail.",
    },
    shot(
      "drill-list.webp",
      "Two drill lists: the first with D1 to D8 slot badges, the final with tennis ball and pickleball icons and drill names like Kitchen Dinks and Third-Shot Drop.",
      "First version, then final. Slots became sports and names.",
    ),
    {
      type: "p",
      text: "The top-left icons answer the question every ball machine owner asks first: **is it listening?** Battery and signal sit in orange until the machine is paired and charged, then turn green.",
    },

    { type: "h2", text: "Drills you can see" },
    {
      type: "p",
      text: "This is the heart of it. Instead of a table of numbers, Edit Drill shows the **court**, with the target zone lit up, and the **arc** each ball will take from the machine to the bounce. Step through each ball, scroll a value, and the picture moves with it. Copy and paste settings between balls, then Start Drill or **Simulate** to watch it play out before a single ball leaves the machine.",
    },
    {
      type: "video",
      text: "The built app on a real phone: stepping through balls, changing values, and watching the court and arc update.",
      clip: {
        src: src("edit-drill-walkthrough.mp4"),
        poster: src("edit-drill-poster.webp"),
        width: 560,
        height: 880,
        label: "Screen recording of Edit Drill: changing height, speed and direction for each ball while the court and ball arc update.",
      },
    },
    {
      type: "quote",
      text: "Editing the drills is super easy.",
      cite: { name: "Titan customer review", href: "https://titanballmachines.com/products/titan-tennis-ball-machine" },
    },
    aim("practice", "When a drill is a picture you can tweak between points, people build more of them and stay on court longer. The table of numbers never invited that."),

    { type: "h2", text: "One tap, a whole session" },
    {
      type: "p",
      text: "Players don't practise one drill; they practise a session. Select mode lets you tick several drills and they collect in a tray at the bottom, in order, with one Start. It shipped as **MegaDrill**: warm-up, crosscourt, volleys, done, without walking back to the phone between each one.",
    },
    shot(
      "megadrill.webp",
      "The drill list before and after entering Select mode: ticked drills collect as circles in a bottom tray above a Start button, and the status icons turn from orange to green once connected.",
      "Pick the drills, check the tray, Start. The status icons go green once the machine is paired.",
    ),
    aim("session length", "Chaining drills removes the walk back to the phone, which is exactly where a session tends to end early."),

    { type: "h2", text: "The community was already online" },
    {
      type: "p",
      text: "Tennis and pickleball players already learn from coaches on YouTube, Instagram and TikTok. So rather than building a social network nobody asked for, the app became a **doorway** to that conversation: search drills other players have shared and download them in one tap, look up a player to see how they play (hand, grip, backhand, surfaces) and the drills they've shared, and jump out to Titan's channels.",
    },
    shot(
      "community.webp",
      "Community menu with Search Drills, Profiles, Social Media and Support, next to Search Drills showing Backhand RH results with download buttons and a tick on one already saved.",
      "Search what other players have shared. Right or left handed, one tap to download.",
    ),
    shot(
      "profiles.webp",
      "Profiles list, next to a player profile showing hand, grip, backhand, forehand, surfaces and location above their shared drills.",
      "Find a player who plays like you, and borrow their sessions.",
    ),
    {
      type: "p",
      text: "The piece that closed the loop was the **QR drill**. A coach builds a session, posts it with a code, and anyone watching can scan it straight onto their machine. Coaches got something useful to hand their audience; Titan got the machine into every video.",
    },
    shot(
      "qr-cards.webp",
      "Three Titan Drill QR cards from a coach: Overhead, Floating Volleys, and a Forehand and Backhand Rhythm Drill, each with a code to scan into the app.",
      "Coach drills as QR codes. Watch it, scan it, play it.",
    ),
    {
      type: "video",
      text: "Coaches sharing drills as QR codes, for players to scan straight into the app.",
      vertical: true,
      videos: [
        { id: "hZ3arCdmcBU", title: "Titan drill shared by QR code" },
        { id: "ItuXeUOECn8", title: "Titan drill shared by QR code, second example" },
      ],
    },
    aim("reach", "Every coach who posts a QR drill puts the machine and the app in front of their whole audience, and gives them a reason to try it the same day."),

    { type: "h2", text: "A growth idea: put a pro on it" },
    {
      type: "p",
      text: "Beyond the app, I proposed a simple growth play: put a well-known player in front of the machine, using the drills, rather than telling people how good it is. Titan ran with it and brought in a pickleball pro.",
    },
    {
      type: "video",
      text: "The endorsement Titan ran after I proposed it.",
      videos: [{ id: "M3DlkEwcfQU", title: "Titan ball machine with a pickleball pro" }],
    },

    { type: "h2", text: "It shipped" },
    {
      type: "p",
      text: "Titan Drills is free on iPhone and Android. It's in Titan's own promo film, and in independent reviews, where players talk about the custom drills.",
    },
    {
      type: "video",
      text: "Titan's official promo, and a player review from where they get into the app and custom drills.",
      videos: [
        { id: "MdneSI5PPKE", title: "Titan One Tennis Ball Machine Promo 2023" },
        { id: "natWAlG_Ui8", title: "Tennis Product Review: The TITAN tennis ball machine", start: 181 },
      ],
    },
    {
      type: "quote",
      text: "Super easy to use.",
      cite: { name: "Titan customer review", href: "https://titanballmachines.com/products/titan-tennis-ball-machine" },
    },

    { type: "h2", text: "What I could point to" },
    {
      type: "p",
      text: "A controller app rebuilt around what players see and say: auto connect and a photo-led pairing flow, a drill list that speaks tennis and pickleball, a visual drill editor with Simulate, MegaDrill sessions, and a community that meets players where they already are. Shipped on both stores, and in customers' own words, easy.",
    },
    {
      type: "p",
      text: "The honest limit: sales and usage live with Titan. What I can point to is that every screen was aimed at getting to the first ball faster, keeping people on court longer, and letting drills travel.",
    },
    {
      type: "p",
      text: "**Credits:** the Titan team, and the engineering team at Hachibot in Beijing, who built it. I designed the app end to end and proposed the pro endorsement.",
    },
  ],
  scale: {
    heading: "Titan in context",
    note: "Titan's own published figures for the Titan ONE, for a sense of scale. They describe the machine, not results of my work.",
    stats: [
      { value: "12", label: "preset drills on the machine, plus unlimited custom drills in the app" },
      { value: "130", label: "tennis balls in the hopper" },
      { value: "10–80", label: "mph ball speed" },
      { value: "~3 hrs", label: "of play from the standard battery" },
    ],
  },
  sources: [{ label: "Titan ONE product page", href: "https://titanballmachines.com/products/titan-tennis-ball-machine" }],
};
