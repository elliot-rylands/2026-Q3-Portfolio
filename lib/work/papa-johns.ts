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


const FLIPSIDE = "https://flipsidegroup.com/papa-johns.html";

// An annotated journey with three deep decisions: stop an impossible order,
// make a deal legible, make correction and payment easy.
export const papaJohns: CaseStudy = {
  slug: "papa-johns",
  title: "Getting from hungry to “Add to order” faster",
  dek: "The ordering journey had to work when the customer was hungry, the store was nearly closed and the pizza name was longer than the card. Through Flipside, I redesigned the UK app from home to basket, concentrating on the places a simple order could go wrong.",
  accent: "light-dark(#007a53, #4fc794)",
  meta: [
    { label: "Role", value: "Senior Product Designer (contract), Flipside Group" },
    { label: "When", value: "Nov 2022 to Aug 2023" },
    { label: "Owned", value: "The ordering journey in the UK app" },
    { label: "Client", value: "Papa John's UK" },
  ],
  work: [
    { value: "5", label: "parts of the order: home, deals, menu, pizza, basket" },
    { value: "3", label: "store-timing states designed to replace dead ends" },
    { value: "10", label: "quantity controls explored for the basket" },
  ],
  notice:
    "Papa John's results aren't mine to publish. Prices, postcodes and deals in the screens are demo data.",
  body: [
    shot(
      "hero.webp",
      "Four Papa John's app screens: home, pizza menu, a pizza product page and the basket.",
      "The journey I worked on, left to right: home, menu, pizza, basket.",
    ),
    {
      type: "p",
      text: "A pizza order is short, and most of the time it goes fine. The work was in the moments it doesn't: a store about to close, a deal nobody can decode, an extra that quietly changes the price, a brownie added by mistake. My brief was the UK app's ordering journey from the home screen to the basket, and I picked those moments apart one at a time.",
    },

    { type: "demo", text: "", demo: "flow-papa" },

    { type: "h2", text: "Stop the order that can't happen" },
    {
      type: "p",
      text: "The first question in a pizza order isn't what. It's where and when: delivery or collection, as soon as possible or Saturday at 11:45. That context sits at the top of home, follows you onto the menu and changes with one tap.",
    },
    shot(
      "home-context.webp",
      "Two home screens: one showing delivery to a postcode ASAP, one showing collection from a named store on Saturday at 11:45.",
      "Delivery or collection, and when, answered before anything else.",
    ),
    {
      type: "p",
      text: "Stores aren't always open, and the worst moment to discover that is at checkout with a full basket. So timing is dealt with up front, in three bottom sheets: closing soon, opening soon and change delivery time. Each one offers a next step rather than an error.",
    },
    shot(
      "store-timing.webp",
      "Three bottom sheets: store closing soon, change delivery time with a time picker, and store opening soon with a time picker.",
      "Three timing states, each with a next step instead of a dead end.",
    ),

    { type: "h2", text: "Make a deal readable in a glance" },
    {
      type: "p",
      text: "Deals are where a lot of orders start, and the old page made people read: blocks of text, the price off to one side, “Latest deals” twice. The redesign shows what's inside each deal as icons for pizzas, sides and drinks, puts the saving in a badge, and strikes through the old price beside the new one.",
    },
    shot(
      "deals-before-after.webp",
      "Before: text-heavy deal cards. After: deal cards with icons for pizzas, sides and drink, a 50 percent off badge and a struck-through price.",
      "Before and after. What's in the deal and what it saves, at a glance.",
    ),
    shot(
      "deals-iterations.webp",
      "Three versions of the deals page header and section labels.",
      "Three passes at the page framing: header, delivery context and section labels.",
    ),
    {
      type: "p",
      text: "The menu had to survive real data too. Cards show allergen and spice icons as a quick signal before you tap, flip to “Added ✓” so you know it worked without leaving the grid, and hold up when a pizza's name is three times longer than the design assumed. “Very Long Title for a Pizza Can go Here” is in the file on purpose.",
    },
    shot(
      "menu-grid.webp",
      "Pizza menu grid with allergen icons, an added state on one card, and a card with a very long title.",
      "Allergen icons, an added state, and the long-title case designed in.",
    ),
    {
      type: "p",
      text: "Extras sit on the pizza page, one line above “Add to order”, where people are already deciding. The balance here is basket value against trust: one tap adds extra cheese, the row flips to “Added to your order”, and the price on the button moves with it, so nobody meets a surprise at checkout.",
    },
    shot(
      "upsell-states.webp",
      "Extra cheese upsell row before and after adding, with the Add to order price rising from £20.49 to £22.98.",
      "Two states, one tap. The button price moves with you.",
    ),
    shot(
      "upsell-formats.webp",
      "Three formats for the Treat yourself slot: a single photographed topping, a tabbed carousel of extras, and three cheese cards.",
      "Three formats explored for the same slot above “Add to order”.",
    ),

    { type: "h2", text: "Ten ways to remove a brownie" },
    {
      type: "p",
      text: "The basket's quantity control is the smallest thing in the app and the place people fix their mistakes. I explored ten versions: circled buttons, split pills, boxed numbers, a bin at zero, a cross, a “Remove” link and an overflow menu. Each was judged on three questions. Can you hit it with a thumb? Is removing an item obvious without being easy to do by accident? Does it still fit when the product is called “Giant Double Chocolate Brownie”?",
    },
    shot(
      "basket-steppers-a.webp",
      "Three versions of the basket quantity control: circled buttons, a split pill and a boxed number, each with a bin at zero.",
      "Circled, split and boxed, each with a bin at zero.",
    ),
    shot(
      "basket-steppers-b.webp",
      "Three more versions: a cross beside the stepper, a Remove link with a bin, and an overflow menu.",
      "Cross, “Remove” link and overflow menu. Removing should be obvious, never accidental.",
    ),
    {
      type: "p",
      text: "Below the basket, “Want more?” offers a last cheap add-on or a reward you've already earned, and Apple Pay sits above Checkout so paying doesn't mean typing a card number on a sofa.",
    },
    shot(
      "basket-checkout.webp",
      "Basket footer with Want more suggestions for dips and a free reward, Apple Pay, and a Checkout button.",
      "A last add-on, a reward you've earned, and pay without typing a card.",
    ),

    { type: "h2", text: "The rating prompt, and what I'd change" },
    {
      type: "p",
      text: "The app rating mattered because it's the first thing a new customer sees in the store. What shipped asked one question first, “Enjoying the app?”, then invited happy customers to review and offered unhappy ones a private feedback form.",
    },
    shot(
      "rating-prompt.webp",
      "Enjoying the app prompt with Yes, Not really and Skip, next to a feedback sheet asking unhappy users for feedback.",
      "What shipped: a question first, then a review or a feedback form.",
    ),
    {
      type: "p",
      text: "I'd design it differently today. Apple and Google both now steer apps away from screening people with an opinion question before the store's own review prompt. The better version gives everyone the same fair chance to leave a public review, and offers private feedback alongside it rather than instead of it.",
    },

    { type: "h2", text: "How it was built to be measured" },
    {
      type: "p",
      text: "Each change started as a coded prototype kept in GitHub, then went out one change at a time behind A/B tests rather than as one big redesign. The intent was specific: timing sheets aimed at orders that fail, deal cards at orders started, the extras row and basket add-ons at basket value, and the prompt at the app rating. Those were the hypotheses. The results belong to Papa John's.",
    },
    {
      type: "p",
      text: "At programme level, [Flipside reports](" + FLIPSIDE + ") improved conversion from its wider work on the Papa John's app and website, including UX and payment changes. That covers far more than my part, which was the UK app's ordering journey.",
    },
    {
      type: "p",
      text: "**Credits:** the Flipside Group team, and Papa John's UK's product and engineering teams. I designed the ordering journey.",
    },
  ],
};
