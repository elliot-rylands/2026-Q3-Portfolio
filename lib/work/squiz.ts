import type { PostBlock } from "../posts";
import type { CaseStudy } from "../work";

// Frames are trimmed to their content on a #111 backdrop; sizes keep layout stable.
const sizes: Record<string, [number, number]> = {
  "admin-usage.webp": [1502, 986],
  "cdp-add-event.webp": [1502, 1164],
  "cdp-segmentation.webp": [1502, 956],
  "cdp-sources-cards.webp": [1502, 1164],
  "cdp-sources-table.webp": [1502, 956],
  "funnelback-dashboard.webp": [1615, 1065],
  "funnelback-step1-type.webp": [1615, 1065],
  "funnelback-step2-name.webp": [1615, 1065],
  "funnelback-step3-config.webp": [1614, 1243],
  "funnelback-step4-review.webp": [1614, 1065],
  "funnelback-step5-finish.webp": [1614, 1065],
  "funnelback-twitter-config.webp": [1589, 1047],
  "funnelback-twitter-type.webp": [1592, 1048],
  "launchpad-desktop.webp": [1620, 1094],
  "launchpad-hero.webp": [1609, 1072],
  "launchpad-mobile.webp": [1256, 1372],
  "launchpad-tablet.webp": [1028, 1312],
  "loading.webp": [726, 358],
  "matrix-signin.webp": [1503, 958],
  "platform-dashboard.webp": [1611, 1077],
  "spec-header.webp": [1821, 622],
  "spec-resource-card.webp": [1748, 857],
  "spec-tile-compact.webp": [1210, 682],
  "spec-tile-large.webp": [1476, 805],
};

const shot = (file: string, alt: string, caption: string): PostBlock => ({
  type: "image",
  text: "",
  image: { src: `/work/squiz/media/${file}`, alt, caption, width: sizes[file]?.[0], height: sizes[file]?.[1] },
});

// Images follow the story: the finished launchpad first, then the front door,
// the navigation, products moving in, and the system underneath.
export const squiz: CaseStudy = {
  slug: "squiz",
  title: "Giving eight products one front door",
  dek: "Squiz had eight good products that behaved like strangers. As design lead, I gave them one front door, one set of manners and one design system underneath, without rebuilding any of them.",
  meta: [
    { label: "Role", value: "Senior Product Designer, Design Lead" },
    { label: "When", value: "Jun 2018 to Jan 2023" },
    { label: "Team", value: "The designers I led, product managers, product engineering teams" },
    { label: "Tools", value: "Figma, React, Storybook, design tokens" },
  ],
  work: [
    { value: "8", label: "products brought into one platform" },
    { value: "1", label: "sign-in, shell and navigation across the suite" },
    { value: "1", label: "tokenised design system, in code" },
    { value: "3", label: "sectors: government, healthcare, fintech" },
  ],
  notice:
    "Squiz's platform and customers are confidential. Organisations, people and figures in these screens are demo data, and anything that could identify a real person is blurred.",
  body: [
    shot(
      "launchpad-hero.webp",
      "The Squiz DXP launchpad: eight product tiles including Matrix CMS, Funnelback, Connect and Datastore, with help and resources below.",
      "The launchpad that shipped. Eight products, one front door.",
    ),

    { type: "h2", text: "Eight products, eight front doors" },
    {
      type: "p",
      text: "Squiz made eight products for organisations in government, healthcare and fintech. Matrix ran the content. Funnelback ran the search. Connect, Datastore and a customer data platform did the plumbing. On their own, they were good. Together, they behaved like strangers seated at the same wedding table.",
    },
    {
      type: "p",
      text: "Each had its own sign-in, its own header and its own idea of where the settings lived. A customer would buy Matrix and never find out Funnelback was sitting next door. The suite was the thing being sold. Nobody could actually see it.",
    },

    { type: "demo", text: "", demo: "flow-squiz" },

    { type: "h2", text: "The obvious answer was the wrong one" },
    {
      type: "p",
      text: "The tempting move was to pour all eight products into one codebase and start again. It would have taken years, frozen every roadmap, and delivered a lovely platform to customers who'd have left by the time it arrived.",
    },
    {
      type: "p",
      text: "So the brief got smaller and harder: **make eight products feel like one, without rebuilding any of them.** That meant designing the things every product shares, and leaving each product's own screens to the teams who knew them best.",
    },

    { type: "h2", text: "Start at the front door" },
    {
      type: "p",
      text: "The first thing anyone touches is the sign-in, so that's where the platform started. Every product now opens the same way: the platform's name first, the product's name second.",
    },
    shot(
      "matrix-signin.webp",
      "Matrix CMS sign-in page branded as part of the Squiz Digital Experience Platform.",
      "Same door, whichever product you came for. Platform first, product second.",
    ),
    {
      type: "p",
      text: "Once you're in, one drawer holds the whole suite, and the dashboard shows which products your organisation has switched on and what changed recently. It sounds small. It's the first moment a customer can see everything they're paying for.",
    },
    shot(
      "platform-dashboard.webp",
      "Platform dashboard with the navigation drawer open, listing every product, next to active products and an activity log.",
      "One drawer for the whole suite, and one place to see what's switched on.",
    ),

    { type: "h2", text: "The first navigation followed the org chart" },
    {
      type: "p",
      text: "Version one listed the products by name. It was tidy, logical and wrong. Card sorts and tree tests made that obvious quickly: people went looking for the job, not the product. Nobody wakes up wanting Funnelback. They want their search to work.",
    },
    {
      type: "p",
      text: "So every tile leads with what it does and puts the product underneath. **Content management first, Matrix CMS second.** One line on every tile, and it's the whole argument.",
    },
    shot(
      "launchpad-desktop.webp",
      "Redlined desktop launchpad with column widths, gutters and spacing annotated.",
      "Desktop, specced for handover: three columns, 20px gutters, the job above the product name.",
    ),
    {
      type: "p",
      text: "It also had to survive every screen, from a wide admin monitor to a phone in a corridor, dropping from three columns to one without shuffling the order people had just learned.",
    },
    shot(
      "launchpad-mobile.webp",
      "Redlined mobile launchpad, one column of product tiles followed by help and resources cards.",
      "Mobile: the same tiles in the same order, one column, 16px margins.",
    ),

    { type: "h2", text: "Moving in, one product at a time" },
    {
      type: "p",
      text: "With the front door built, products could move in one at a time. The customer data platform was designed inside the shell, so it never had an accent to lose. Sources, segments and events all use the same cards, forms and page structure.",
    },
    shot(
      "cdp-sources-cards.webp",
      "Customer data platform sources page with third-party, default and custom sources as cards.",
      "The customer data platform, designed inside the shell from day one.",
    ),
    shot(
      "cdp-add-event.webp",
      "Add event form mapping attributes from event data to a single customer view.",
      "Mapping event data into a single customer view, with the same form components as everything else.",
    ),
    {
      type: "p",
      text: "Funnelback had more history. Setting up a data source used to mean knowing where every setting lived before you'd done anything useful. On the new system it became five steps, each one explaining itself in plain words, with a review before anything runs.",
    },
    shot(
      "funnelback-step1-type.webp",
      "Funnelback create a data source wizard, step one: choose web, Facebook, Twitter, YouTube or an index.",
      "Step one asks where your data lives, in plain words, before it asks anything technical.",
    ),
    shot(
      "funnelback-step3-config.webp",
      "Funnelback wizard step three: the site to crawl, paths to exclude and file types to include.",
      "The sensible file types arrive already ticked, so a first crawl works without guesswork.",
    ),
    shot(
      "funnelback-step5-finish.webp",
      "Funnelback wizard final step offering a five-minute crawl, a custom crawl, a full crawl or later.",
      "A five-minute test crawl first, so you find your mistakes in minutes, not the morning after.",
    ),

    { type: "h2", text: "Consistency has to be the lazy option" },
    {
      type: "p",
      text: "Here's the thing about design systems: teams don't adopt them because they're right. They adopt them because they're easier. So I built it as tokens and React components in Storybook, where using the system was quicker than copying it.",
    },
    {
      type: "p",
      text: "Two new core colours, `dxp-lightblue` and `dxp-darkblue`, anchored every product. Every component was specced to the pixel and named in tokens, not hex codes, so engineers weren't guessing and one palette change moved the whole suite.",
    },
    shot(
      "spec-header.webp",
      "Header specification with colour tokens, 34px buttons, 12px spacing and hover states.",
      "The shared header, down to 60% icon opacity at rest and 100% on hover.",
    ),
    shot(
      "spec-tile-large.webp",
      "Product tile specification: 96px tall, 48px icon, 24px padding, token names on each element.",
      "One tile, every value named: 96px tall, a 48px icon, 24px padding, tokens instead of hex codes.",
    ),
    shot(
      "spec-resource-card.webp",
      "Resource card specification with padding, spacing and colour tokens annotated.",
      "Same tokens, different component. Change the palette once and every product follows.",
    ),
    {
      type: "p",
      text: "Accessibility went into the components, not onto a checklist. Focus states, contrast and keyboard behaviour were solved once, audited, and inherited by every team that used them. When a good share of your customers are governments, that isn't a nice-to-have.",
    },

    { type: "h2", text: "Nobody said no. That was the risk." },
    {
      type: "p",
      text: "There wasn't a fight to win. Everyone agreed one platform was the right idea, which is exactly how good ideas quietly die. What moved it from agreement to action was a coded prototype of the shell, running on the real tokens: something you could click through, put in front of customers in usability sessions, and plan a sprint around. **Clickable beats agreeable.**",
    },

    { type: "callout", label: "Prototyped in GitHub, shipped small", text: "The shell started as a coded prototype on the real tokens, kept in GitHub, and that prototype is what turned agreement into action. It shipped a piece at a time: sign-in first, then the shell and launchpad, then products moved in one by one on shared tokens and components, without freezing a single roadmap." },

    { type: "h2", text: "What I could point to" },
    {
      type: "p",
      text: "The sign-in, shell, launchpad and design system shipped, and products moved in on shared tokens and components. I led the designers on it, and worked with product managers and each product's engineering team.",
    },
    {
      type: "p",
      text: "The honest limit: I left in January 2023, so I can't tell you what adoption looked like after that. What I can point to is the foundation. One front door, one set of manners, one system underneath eight products.",
    },
    {
      type: "p",
      text: "**Credits:** product managers and engineering teams across the suite built the platform. I led design on the shell, launchpad and design system, led the designers on it, and built the tokens, components and prototypes.",
    },
  ],
};
