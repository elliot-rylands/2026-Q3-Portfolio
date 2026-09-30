import type { CaseStudy } from "../work";

const img = (file: string) => `/work/squiz/media/${file}`;

// Images follow the story: the finished platform first, then the problem,
// then one proof per section. Add each image block once its file exists in
// content/work/squiz/.
export const squiz: CaseStudy = {
  slug: "squiz",
  title: "Making eight products feel like one",
  dek: "Squiz sold a suite of separate products that customers rarely used together. As design lead, I designed the shared shell, navigation and tokenised design system that turned them into one digital experience platform.",
  meta: [
    { label: "Role", value: "Senior Product Designer, Design Lead" },
    { label: "When", value: "Jun 2018 to Jan 2023" },
    { label: "Team", value: "The designers I led, product managers, product engineering teams" },
    { label: "Tools", value: "Figma, React, Storybook, design tokens" },
  ],
  work: [
    { value: "8", label: "products brought into one platform" },
    { value: "1", label: "shell and navigation across the suite" },
    { value: "1", label: "tokenised design system, in code" },
    { value: "3", label: "sectors: government, healthcare, fintech" },
  ],
  notice:
    "Squiz's platform and customers are confidential. Screens are shown with placeholder or blurred content, and no customer data or internal figures are included.",
  body: [
    { type: "h2", text: "The problem" },
    {
      type: "p",
      text: "Squiz built eight products, including Matrix CMS and Funnelback search, for organisations in government, healthcare and fintech. Each had grown up on its own, with its own look, its own patterns and its own way in.",
    },
    {
      type: "p",
      text: "Customers bought one product and often never found the others, or couldn't see how they worked together. The value of the suite was invisible from inside any single tool.",
    },

    { type: "h2", text: "One shell, not a rebuild" },
    {
      type: "p",
      text: "Rebuilding all eight products in one codebase would have taken years and stalled every roadmap. So the brief became narrower and harder: make the suite feel like one product without rebuilding the products.",
    },
    {
      type: "p",
      text: "I designed a shared shell that every product sits inside: one way in, one navigation, one account, and one set of patterns for the moments that cross products. Each product team kept ownership of its own screens.",
    },

    { type: "h2", text: "The first navigation followed the org chart" },
    {
      type: "p",
      text: "Version one listed the products. It was tidy, and it didn't work. Card sorts and tree tests showed where customers expected to find things, and it wasn't by product name. The second version was built around what customers came to do, with the products underneath.",
    },

    { type: "h2", text: "One design system, in code" },
    {
      type: "p",
      text: "Consistency only lasts if it's cheaper than doing your own thing. I built the design system as tokens and React components in Storybook, so product teams got the shared look by using the system rather than copying it.",
    },
    {
      type: "p",
      text: "Accessibility went into the components, not the checklists. Focus states, contrast and keyboard behaviour were solved once, then checked with accessibility audits, so every team that used a component got them for free. For government customers, that wasn't optional.",
    },

    { type: "h2", text: "A prototype made it real" },
    {
      type: "p",
      text: "Nobody fought the idea of one platform. The risk was that everyone agreed in principle and nothing changed. A coded prototype of the shell, running on the real tokens, turned the idea into something teams could click through, test in usability sessions and plan against.",
    },

    { type: "h2", text: "What I could point to" },
    {
      type: "p",
      text: "The shell, navigation and design system shipped across the suite, and product teams built their screens on the shared tokens and components. I led the designers working on it and worked alongside product managers and each product's engineering team.",
    },
    {
      type: "p",
      text: "The honest limit: I left in January 2023, so I can't speak to adoption or customer results since. What I can point to is the foundation: one way in, one navigation and one system for eight products.",
    },
    {
      type: "p",
      text: "**Credits:** product managers and engineering teams across the suite built the platform. I led design on the shell, navigation and design system, led the designers on it, and built the tokens, components and prototypes.",
    },
  ],
};

// Kept here so the image helper is used once images are added.
export const squizImage = img;
