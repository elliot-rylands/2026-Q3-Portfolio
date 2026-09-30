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

// One organising metaphor (the front door). The story is the boundary between
// what was shared and what each product kept, then one migration in depth.
export const squiz: CaseStudy = {
  slug: "squiz",
  title: "Giving eight products one front door",
  dek: "Squiz sold eight products as one suite, and customers met them as eight separate apps. As design lead, I led the shared layer that let them become a platform while each product kept its own codebase and roadmap.",
  meta: [
    { label: "Role", value: "Senior Product Designer, Design Lead" },
    { label: "When", value: "Jun 2018 to Jan 2023" },
    { label: "Team", value: "The designers I led, product managers, product engineering teams" },
    { label: "Tools", value: "Figma, React, Storybook, GitHub, design tokens" },
  ],
  work: [
    { value: "8", label: "products, each keeping its own codebase" },
    { value: "1", label: "shared shell: sign-in, navigation and launchpad" },
    { value: "1", label: "token system, built as React components in Storybook" },
  ],
  notice:
    "Squiz's platform and customers are confidential. Organisations, people and figures in these screens are demo data, and anything that could identify a real person is blurred.",
  body: [
    shot(
      "launchpad-hero.webp",
      "The Squiz DXP launchpad: eight product tiles including Matrix CMS, Funnelback, Connect and Datastore, with help and resources below.",
      "The launchpad that shipped.",
    ),
    {
      type: "p",
      text: "Eight products, eight sign-ins and eight versions of the same everyday interactions. Matrix ran the content, Funnelback ran the search, and Connect, Datastore and a customer data platform did the plumbing. A customer could buy Matrix and never discover Funnelback sitting next door. The suite was what Squiz sold. Customers experienced it one product at a time.",
    },

    { type: "demo", text: "", demo: "flow-squiz" },

    { type: "h2", text: "Deciding what not to rebuild" },
    {
      type: "p",
      text: "The tempting answer was one codebase and a fresh start. It would have stopped every product roadmap for years, and customers would have waited that long to see anything change.",
    },
    {
      type: "p",
      text: "So the line was drawn early. The products kept their own codebases, and their teams kept ownership of their own screens. I concentrated on the pieces every customer met every day: sign-in, navigation, the shared shell and the components underneath. **Make eight products feel like one, without rebuilding any of them.**",
    },
    shot(
      "matrix-signin.webp",
      "Matrix CMS sign-in page branded as part of the Squiz Digital Experience Platform.",
      "Every product signs in the same way: the platform's name first, the product's second.",
    ),
    {
      type: "p",
      text: "Once you're in, one drawer holds the whole suite, and the dashboard shows which products your organisation has switched on and what changed recently. For many customers it was the first time the thing they were paying for was visible in one place.",
    },
    shot(
      "platform-dashboard.webp",
      "Platform dashboard with the navigation drawer open, listing every product, next to active products and an activity log.",
      "One drawer for the suite, and one place to see what's switched on.",
    ),

    { type: "h2", text: "The first navigation followed the org chart" },
    {
      type: "p",
      text: "The first launchpad listed the products by name. It was tidy and logical, and organised exactly like our org chart, which in hindsight was the warning sign. Card sorts and tree tests showed people looking for the job, not the product. Nobody wakes up wanting Funnelback. They want their search to work.",
    },
    {
      type: "p",
      text: "So every tile now leads with what it does and puts the product underneath: content management first, Matrix CMS second. The order holds from a wide admin monitor down to a phone, so the layout people learn on one screen still works on the next.",
    },
    shot(
      "launchpad-desktop.webp",
      "Redlined desktop launchpad with column widths, gutters and spacing annotated.",
      "Desktop handover: three columns and 20px gutters, with the job above the product name.",
    ),
    shot(
      "launchpad-mobile.webp",
      "Redlined mobile launchpad, one column of product tiles followed by help and resources cards.",
      "Mobile: the same tiles in the same order, one column with 16px margins.",
    ),

    { type: "h2", text: "One migration, start to finish" },
    {
      type: "p",
      text: "Products moved in one at a time. The customer data platform was the easy case: it was designed inside the shell from the start, so sources, segments and events simply used the shared cards, forms and page structure.",
    },
    shot(
      "cdp-sources-cards.webp",
      "Customer data platform sources page with third-party, default and custom sources as cards.",
      "The customer data platform, designed inside the shell from the start.",
    ),
    {
      type: "p",
      text: "Funnelback was the hard one, with years of history. Setting up a data source meant knowing where every setting lived before you'd done anything useful. Rebuilt on the shared components, it became five steps, each explaining itself in plain words, with sensible defaults ticked and a review before anything runs. A five-minute test crawl comes first, so mistakes surface in minutes rather than the morning after.",
    },
    shot(
      "funnelback-step1-type.webp",
      "Funnelback create a data source wizard, step one: choose web, Facebook, Twitter, YouTube or an index.",
      "Step one asks where your data lives before it asks anything technical.",
    ),
    shot(
      "funnelback-step3-config.webp",
      "Funnelback wizard step three: the site to crawl, paths to exclude and file types to include.",
      "Common file types arrive already ticked, so a first crawl works without guesswork.",
    ),
    shot(
      "funnelback-step5-finish.webp",
      "Funnelback wizard final step offering a five-minute crawl, a custom crawl, a full crawl or later.",
      "A short test crawl first, before committing to a full one.",
    ),

    { type: "h2", text: "Consistency has to be the lazy option" },
    {
      type: "p",
      text: "Teams don't adopt a design system because it's right. They adopt it because it's easier than not. So it lived as tokens and React components in Storybook, where using the system was quicker than copying it, and two new core colours, `dxp-lightblue` and `dxp-darkblue`, anchored every product. Components were named in tokens rather than hex codes, so one palette change moved the whole suite.",
    },
    shot(
      "spec-tile-large.webp",
      "Product tile specification: 96px tall, 48px icon, 24px padding, token names on each element.",
      "One tile with every value named: 96px tall, a 48px icon, 24px padding.",
    ),
    shot(
      "spec-header.webp",
      "Header specification with colour tokens, 34px buttons, 12px spacing and hover states.",
      "The shared header, down to icon opacity at rest and on hover.",
    ),
    {
      type: "p",
      text: "Focus states, contrast and keyboard behaviour were built into the components, so teams inherited accessibility rather than rediscovering it. With governments among the customers, that mattered.",
    },

    { type: "h2", text: "Clickable beats agreeable" },
    {
      type: "p",
      text: "Nobody argued against one platform. Everyone agreed, which is how good ideas quietly stall. What turned agreement into sprints was a coded prototype of the shell, running on the real tokens and kept in GitHub, that people could click through, test with customers and plan work around.",
    },
    {
      type: "p",
      text: "From there it shipped in order: sign-in first, then the shell and launchpad, then products moving in one by one on the shared components. No roadmap had to stop for it.",
    },

    { type: "h2", text: "Where I left it" },
    {
      type: "p",
      text: "By January 2023, when I left, the sign-in, shell, launchpad and design system had shipped, the customer data platform had been built inside the shell and Funnelback's setup had moved onto the shared components. How far adoption went after that is a question for the people still there.",
    },
    {
      type: "p",
      text: "**Credits:** product managers and engineering teams across the suite built the platform. I led design on the shell, launchpad and design system, led the designers working on it, and built the tokens, components and prototypes.",
    },
  ],
};
