import type { PostBlock } from "../posts";
import type { CaseStudy } from "../work";

// Phone screens composed on Papa John's green, each cropped to the part of
// the screen its section is about.
const sizes: Record<string, [number, number]> = {
  "basket-checkout.webp": [1008, 990],
  "basket-steppers-a.webp": [2200, 805],
  "basket-steppers-b.webp": [2200, 805],
  "deals-before-after.webp": [1884, 990],
  "deals-iterations.webp": [2199, 1280],
  "hero.webp": [2200, 1017],
  "home-context.webp": [1884, 800],
  "menu-grid.webp": [1700, 1280],
  "rating-prompt.webp": [1884, 1190],
  "store-timing.webp": [2200, 630],
  "upsell-formats.webp": [2200, 571],
  "upsell-states.webp": [1884, 574],
};

const shot = (file: string, alt: string, caption: string): PostBlock => ({
  type: "image",
  text: "",
  image: { src: `/work/papa-johns/media/${file}`, alt, caption, width: sizes[file]?.[0], height: sizes[file]?.[1] },
});

const aim = (metric: string, text: string): PostBlock => ({ type: "callout", label: `Built to move: ${metric}`, text });

export const papaJohns: CaseStudy = {
  slug: "papa-johns",
  title: "Getting from hungry to “Add to order” faster",
  dek: "Through Flipside, I redesigned the ordering journey in the Papa John's UK app, from the home screen to the basket, with every decision aimed at one of four numbers: orders started, orders finished, basket value and the app rating.",
  accent: "light-dark(#007a53, #4fc794)",
  meta: [
    { label: "Role", value: "Senior Product Designer (contract), Flipside Group" },
    { label: "When", value: "Nov 2022 to Aug 2023" },
    { label: "Owned", value: "The full ordering journey in the UK app" },
    { label: "Client", value: "Papa John's UK" },
  ],
  work: [
    { value: "5", label: "steps of the order redesigned: home, menu, deals, pizza, basket" },
    { value: "1", label: "tap to add an extra, with the price updating live" },
    { value: "3", label: "store-timing states that replace dead ends" },
    { value: "10", label: "versions of the basket's quantity control explored" },
  ],
  notice:
    "Papa John's results aren't mine to publish, so this one is told through the decisions and the metric each was built to move. Prices, postcodes and deals in the screens are demo data.",
  body: [
    shot(
      "hero.webp",
      "Four Papa John's app screens: home, pizza menu, a pizza product page and the basket.",
      "The journey I worked on, left to right: home, menu, pizza, basket.",
    ),

    { type: "h2", text: "A pizza app has exactly one job" },
    {
      type: "p",
      text: "Nobody opens a pizza app to browse. They're hungry, usually on a sofa, often with someone asking whether they've ordered yet. Every screen either moves them towards “Add to order” or gets in the way.",
    },
    {
      type: "p",
      text: "My brief was the whole ordering journey in the Papa John's UK app: the home screen, the menu, deals, the pizza itself and the basket. I held every decision to one test: **does this get someone to a confident order faster, and does it make that order worth a little more?**",
    },
    {
      type: "stats",
      text: "",
      stats: [
        { value: "Start", label: "more sessions that turn into an order" },
        { value: "Finish", label: "fewer orders abandoned or failed" },
        { value: "Basket", label: "more value per order, without friction" },
        { value: "Rating", label: "a healthier app store score" },
      ],
    },

    { type: "h2", text: "Answer where and when first" },
    {
      type: "p",
      text: "The first question in a pizza order isn't what. It's where and when: delivery or collection, as soon as possible or Saturday at 11:45. So that context sits at the very top of home, follows you onto the menu, and changes with one tap.",
    },
    shot(
      "home-context.webp",
      "Two home screens: one showing delivery to a postcode ASAP, one showing collection from a named store on Saturday at 11:45.",
      "Delivery or collection, and when, answered before anything else.",
    ),
    {
      type: "p",
      text: "Stores aren't always open, and the worst time to find that out is at checkout with a full basket. So the app says it up front, in three bottom sheets: closing soon, opening soon, and change delivery time. Each one offers a way forward, not an error.",
    },
    shot(
      "store-timing.webp",
      "Three bottom sheets: store closing soon, change delivery time with a time picker, and store opening soon with a time picker.",
      "Three timing states, each with a next step instead of a dead end.",
    ),
    aim("orders finished", "Catching store timing before the basket fills removes one of the most frustrating ways an order can fail: one that was never going to go through."),

    { type: "h2", text: "Deals you can read with your thumb" },
    {
      type: "p",
      text: "Deals are where a lot of Papa John's orders start, and the old page made people read. Blocks of text, the price off to one side, and “Latest deals” twice. The redesign shows what's inside each deal as icons (pizzas, sides, drink), puts the saving in a big badge, and strikes through the old price next to the new one.",
    },
    shot(
      "deals-before-after.webp",
      "Before: text-heavy deal cards. After: deal cards with icons for pizzas, sides and drink, a 50 percent off badge and a struck-through price.",
      "Before and after. What's in the deal, and what it saves you, in one glance.",
    ),
    {
      type: "p",
      text: "Around the cards, I worked through the page's framing too: the header, the delivery context, and how vouchers and deals are labelled, until the page read as one scannable list rather than a stack of adverts.",
    },
    shot(
      "deals-iterations.webp",
      "Three versions of the deals page header and section labels.",
      "Three passes at the deals page framing: header, context and section labels.",
    ),
    aim("orders started", "When a deal can be understood in a second, more people commit to one. The deals page is a front door; it should never feel like small print."),

    { type: "h2", text: "A menu that survives real data" },
    {
      type: "p",
      text: "Menu cards show allergen and spice icons before you tap, and flip to “Added ✓” so you know it worked without leaving the grid. It also had to survive the real menu: long pizza names, short ones, and cards with more icons than others. “Very Long Title for a Pizza Can go Here” is in the file on purpose.",
    },
    shot(
      "menu-grid.webp",
      "Pizza menu grid with allergen icons, an added state on one card, and a card with a very long title.",
      "Allergens up front, an added state, and the long-title edge case designed in.",
    ),

    { type: "h2", text: "Treat yourself, right where people decide" },
    {
      type: "p",
      text: "The best place to offer extra cheese isn't the basket. It's the pizza page, one line above “Add to order”, at the exact moment someone is deciding. One tap adds it, the row flips to “Added to your order” with a tick, and the price on the button updates, so nobody gets a surprise later.",
    },
    shot(
      "upsell-states.webp",
      "Extra cheese upsell row before and after adding, with the Add to order price rising from £20.49 to £22.98.",
      "Two states, one tap. The button price moves with you.",
    ),
    {
      type: "p",
      text: "I also explored how the same slot could grow beyond a single add-on: a photographed topping, a row of cheeses, or a tabbed shelf of extras, sides and drinks, all in the same space above the button.",
    },
    shot(
      "upsell-formats.webp",
      "Three formats for the Treat yourself slot: a single photographed topping, a tabbed carousel of extras, and three cheese cards.",
      "One slot, three formats explored, all sitting just above “Add to order”.",
    ),
    aim("basket value", "A relevant extra offered at the moment of decision, with the price shown honestly, is the least pushy way to make an order worth more."),

    { type: "h2", text: "Ten ways to remove a brownie" },
    {
      type: "p",
      text: "The basket's quantity control looks like the smallest thing in the app. It's also where people fix mistakes, and a fiddly one costs orders. I explored ten versions: circled buttons, split pills, boxed numbers, a bin at zero, a cross, a “Remove” link and an overflow menu.",
    },
    shot(
      "basket-steppers-a.webp",
      "Three versions of the basket quantity control: circled buttons, a split pill and a boxed number, each with a bin at zero.",
      "Circled, split and boxed. Each one checked against a thumb and a long product name.",
    ),
    shot(
      "basket-steppers-b.webp",
      "Three more versions: a cross beside the stepper, a Remove link with a bin, and an overflow menu.",
      "Cross, “Remove” link and overflow menu. Removing should be obvious, but never accidental.",
    ),
    {
      type: "p",
      text: "The questions were practical. Can you hit it with a thumb? Is removing an item obvious without being easy to do by mistake? Does it still fit when the product is called “Giant Double Chocolate Brownie”?",
    },
    {
      type: "p",
      text: "Below the basket, “Want more?” offers the last add-ons, a dip for 45p or a reward you've already earned, and Apple Pay sits above Checkout. The fastest checkout is the one you don't have to type.",
    },
    shot(
      "basket-checkout.webp",
      "Basket footer with Want more suggestions for dips and a free reward, Apple Pay, and a Checkout button.",
      "A last, cheap add-on, a reward you've earned, and pay without typing a card number.",
    ),
    aim("orders finished and basket value", "A basket that's easy to correct gets finished. A last add-on at 45p and a one-tap way to pay both help it close at a higher total."),

    { type: "h2", text: "Protect the rating" },
    {
      type: "p",
      text: "The app rating mattered, because it's the first thing a new customer sees in the store. The prompt asks one question first: “Enjoying the app?” Happy customers are invited to leave a review. Unhappy ones get a private feedback form, so the team hears the problem and can fix it.",
    },
    shot(
      "rating-prompt.webp",
      "Enjoying the app prompt with Yes, Not really and Skip, next to a feedback sheet asking unhappy users for feedback.",
      "One question first. Happy people are asked for a review; unhappy ones are asked what went wrong.",
    ),
    aim("the app rating", "Ask at a good moment, and give unhappy customers somewhere better to go than a one-star review: straight to the people who can fix it."),

    { type: "h2", text: "What I could point to" },
    {
      type: "p",
      text: "Designs for the whole ordering journey, from home to basket, with the states and edge cases engineers need to build them: timing sheets, added states, long titles, allergen icons and ten tested ideas for one small control.",
    },
    {
      type: "p",
      text: "The honest limit: the results live with Papa John's, and I rolled off before I saw them. What I can point to is that every decision on these pages was aimed at a number the business cared about, and made to be measured.",
    },
    {
      type: "p",
      text: "**Credits:** the Flipside Group team, and Papa John's UK's product and engineering teams. I designed the ordering journey.",
    },
  ],
};
