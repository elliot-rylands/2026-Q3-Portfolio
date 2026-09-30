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

// Follows a new owner: find the machine, understand one ball, build a drill,
// run a session. Community and growth extend that, they don't lead it.
export const titanTennis: CaseStudy = {
  slug: "titan-tennis",
  title: "Turning a ball machine into a coach in your pocket",
  dek: "Titan's machine could vary speed, spin, height and placement. Its app asked players to understand all of that as numbers. On a direct contract, I designed a controller that shows the ball on the court, so a drill becomes something you can see and adjust.",
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
  ],
  notice:
    "Titan's sales and usage numbers aren't mine to publish. Drill names, player profiles and photos in the screens are demo data, and placeholder copy has been replaced with representative text.",
  body: [
    shot(
      "edit-drill.webp",
      "Titan Drills Edit Drill screen: a wireframe tennis court with the target zone highlighted, a ball trajectory arc, and a per-ball table of height, speed, direction, delay and spin with Start Drill and Simulate.",
      "Edit Drill: where each ball goes, how it gets there, and a button to try it.",
    ),
    {
      type: "p",
      text: "Titan makes robotic ball machines for tennis and pickleball. The hardware is serious, ball after ball of variable speed, spin, height and placement. The controller app players had was a grid of numbered buttons and a table of raw values per ball, with a help screen to explain what each button did.",
    },
    shot(
      "before.webp",
      "The previous controller app: twelve grey numbered drill buttons, an Edit Drill table of numbers for each ball, and a long help screen explaining each button.",
      "Before: numbers in, numbers out, and a help page to decode them.",
    ),
    {
      type: "p",
      text: "My job was to translate the machine for the person standing on the court. I designed the app end to end, working directly with Titan and their engineering partners at Hachibot in Beijing.",
    },

    { type: "demo", text: "", demo: "flow-titan" },

    { type: "h2", text: "Finding the machine" },
    {
      type: "p",
      text: "A new owner's first job is getting the phone and the machine talking. The app tries to connect automatically as soon as it opens, with Skip for anyone who wants to look around first, and asks for Tennis or Pickleball mode before showing a single drill.",
    },
    shot(
      "first-run.webp",
      "Three phones: the Titan app icon on a home screen, the Titan splash, and an auto connect screen with a Skip button and a Tennis mode picker.",
      "Open, splash, connecting. The sport is set before the first drill.",
    ),
    {
      type: "p",
      text: "When it can't find the machine, the instructions point at the real thing: a photo of the machine with the On/Off button called out, and one sentence on putting it into Bluetooth mode. Support answers the questions owners actually ask, in their own words: how do I connect, how do I charge it, how many balls can I add.",
    },
    shot(
      "pairing-support.webp",
      "Bluetooth Connection onboarding with the machine's On/Off button highlighted, next to a Support screen listing questions like How do I connect and How do I charge the machine.",
      "Point at the button on the machine rather than describe it.",
    ),

    { type: "h2", text: "One ball, on the court" },
    {
      type: "p",
      text: "This is the heart of it. Edit Drill replaces the table of numbers with the court. The target zone lights up, and each ball's path is sketched from the machine to the bounce. Step through the balls, scroll a value, and the picture updates. Settings copy and paste between balls, and Simulate plays the drill out on screen before a single ball leaves the machine.",
    },
    {
      type: "video",
      text: "The built app on a phone: stepping through balls, changing values, and watching the court and arc update.",
      clip: {
        src: src("edit-drill-walkthrough.mp4"),
        poster: src("edit-drill-poster.webp"),
        width: 560,
        height: 880,
        label: "Screen recording of Edit Drill: changing height, speed and direction for each ball while the court and ball arc update.",
      },
    },
    {
      type: "p",
      text: "The numbers didn't disappear. They moved underneath the picture, so a player can think in “deep to the backhand corner” and still fine-tune a speed from 15 to 16.",
    },

    { type: "h2", text: "From memory slots to drills with names" },
    {
      type: "p",
      text: "The machine stores drills in numbered slots, so the first version of the list did too: D1 to D8. That was faithful to the hardware and meaningless to a player. The final list leads with the sport, a tennis ball or a pickleball, and the name the player gave the drill. The slot number became an engineering detail.",
    },
    shot(
      "drill-list.webp",
      "Two drill lists: the first with D1 to D8 slot badges, the final with tennis ball and pickleball icons and drill names like Kitchen Dinks and Third-Shot Drop.",
      "First version, then final. Slots became sports and names.",
    ),

    { type: "h2", text: "A whole session, one Start" },
    {
      type: "p",
      text: "People practise in sessions, not single drills. Select mode lets a player tick several drills, which collect in a tray in order above one Start button. It shipped as MegaDrill: warm-up, crosscourt, volleys, without walking back to the phone between each. The battery and signal icons at the top change from orange to green once the machine is paired and charged.",
    },
    shot(
      "megadrill.webp",
      "The drill list before and after entering Select mode: ticked drills collect as circles in a bottom tray above a Start button, and the status icons turn from orange to green once connected.",
      "Pick the drills, check the tray, Start.",
    ),
    {
      type: "quote",
      text: "Editing the drills is super easy.",
      cite: { name: "Titan customer review", href: "https://titanballmachines.com/products/titan-tennis-ball-machine" },
    },

    { type: "h2", text: "Drills from a coach" },
    {
      type: "p",
      text: "Players already learn from coaches on YouTube, Instagram and TikTok, so the app meets them there rather than trying to be a social network. A coach builds a session and posts it with a QR code; anyone watching can scan it straight onto their machine. Inside the app, players can also search drills others have shared and download them in one tap.",
    },
    shot(
      "qr-cards.webp",
      "Three Titan Drill QR cards from a coach: Overhead, Floating Volleys, and a Forehand and Backhand Rhythm Drill, each with a code to scan into the app.",
      "Coach drills as QR codes. Watch it, scan it, play it.",
    ),
    {
      type: "video",
      text: "Coaches sharing drills as QR codes, for players to scan into the app.",
      vertical: true,
      videos: [
        { id: "hZ3arCdmcBU", title: "Titan drill shared by QR code" },
        { id: "ItuXeUOECn8", title: "Titan drill shared by QR code, second example" },
      ],
    },
    shot(
      "community.webp",
      "Community menu with Search Drills, Profiles, Social Media and Support, next to Search Drills showing Backhand RH results with download buttons and a tick on one already saved.",
      "Shared drills, tagged right or left handed, one tap to download.",
    ),

    { type: "h2", text: "In use" },
    {
      type: "p",
      text: "I prototyped the app in code and kept it in GitHub, and it shipped in small steps: the drill list alone went through three versions. Titan Drills is free on iPhone and Android, and it features in Titan's 2023 promo film and in independent player reviews.",
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
      type: "p",
      text: "Outside the app, I suggested putting a well-known player in front of the machine rather than describing it. Titan ran with the idea and brought in a pickleball pro.",
    },
    {
      type: "video",
      text: "The endorsement Titan ran.",
      videos: [{ id: "M3DlkEwcfQU", title: "Titan ball machine with a pickleball pro" }],
    },
    {
      type: "p",
      text: "Customer reviews on Titan's site call the app easy to use. That's reception, not a usability study, and sales and usage stay with Titan.",
    },
    {
      type: "p",
      text: "**Credits:** the Titan team, and the engineering team at Hachibot in Beijing, who built it. I designed the app end to end.",
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
