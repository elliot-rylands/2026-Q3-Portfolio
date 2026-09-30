import type { CaseStudy } from "../work";

const SOURCE = "https://www.squiz.net/customer-stories/sscl";

// No product imagery for legal reasons: the story is carried by strategy,
// numbers and a subtle accent colour instead of screenshots.
export const ukGovernment: CaseStudy = {
  slug: "uk-government",
  title: "Making self-service faster than the phone",
  dek: "SSCL runs HR, pay and support for 29 UK government departments. Its portals were so fragmented that calling was quicker. Through Squiz, I led design on myHub, the single hub built to make self-service the easy option for more than 300,000 civil servants.",
  accent: "light-dark(#1f6f5c, #6cc9ab)",
  meta: [
    { label: "Role", value: "Design Lead at Squiz, for SSCL" },
    { label: "When", value: "2019 to Jan 2023" },
    { label: "Owned", value: "Research, information architecture, core flows, rollout plan" },
    { label: "Client", value: "SSCL, a Cabinet Office and Sopra Steria joint venture" },
  ],
  work: [
    { value: "£300m", label: "saved in the first three years, as reported by SSCL" },
    { value: "29", label: "government departments served by SSCL" },
    { value: "300k+", label: "civil servants the hub was built for" },
    { value: "1", label: "hub replacing a patchwork of departmental portals" },
  ],
  notice:
    "For legal reasons I can't show the product, so this one is told through strategy and numbers instead of screens. Public figures and quotes come from Squiz's SSCL customer story; the savings figure is SSCL's own.",
  body: [
    { type: "h2", text: "The phone was winning" },
    {
      type: "p",
      text: "SSCL is the organisation behind a surprising amount of the UK government's plumbing. A joint venture between the Cabinet Office and Sopra Steria, it runs HR, payroll, finance and contact centre services, and it pays a fair few of government's bills along the way.",
    },
    {
      type: "stats",
      text: "",
      stats: [
        { value: "29", label: "government departments, plus the Ministry of Defence and Police" },
        { value: "300k+", label: "civil servants" },
        { value: "200k", label: "Defence forces members" },
        { value: "2m", label: "veterans" },
      ],
    },
    {
      type: "p",
      text: "Every one of those departments had its own intranet or portal, with its own words for things and its own way of doing admin. Want your payslip? Depends where you work. Need a form? Depends what your department calls it. So civil servants did the sensible thing. **They picked up the phone.**",
    },
    {
      type: "p",
      text: "That's a perfectly rational choice for one person and a very expensive one for government. Every call that could have been a click lands on a contact centre, and at this scale the cost was enormous and almost entirely invisible, because nobody had ever added it up in one place.",
    },
    {
      type: "callout",
      label: "The strategic call",
      text: "The competition wasn't another portal. It was the phone. If the digital route wasn't genuinely faster than calling, nothing else we designed would matter, so every decision got measured against that one question.",
    },

    { type: "h2", text: "Nobody needed a fancy website" },
    {
      type: "p",
      text: "Briefs like this tend to arrive dressed as a website. New look, new homepage, job done. SSCL's real objective was harder and far more useful: reduce the cost of support by getting people to serve themselves. That's not a visual problem. It's a behaviour problem, and behaviour only changes when the new way is easier than the old one.",
    },
    {
      type: "quote",
      text: "I came into this project really with the view that we're going to build just a fancy website... we've learned how to gain real business results.",
      cite: { name: "Carl Johnson", role: "Contact Centre Program Director, SSCL", href: SOURCE },
    },
    {
      type: "p",
      text: "Getting from the first half of that sentence to the second was most of my job. It meant keeping the conversation on outcomes, calls avoided and tasks finished, rather than on colours and hero images, and making sure the people paying for it could see the line from a design decision to a business result.",
    },

    { type: "h2", text: "Designing for the least confident person in the building" },
    {
      type: "p",
      text: "I led research across departments, talking to civil servants at every career stage. The range was wide. Some people lived in software all day. Others had gone an entire career without needing a web portal, and had no intention of starting now just because someone launched one.",
    },
    {
      type: "p",
      text: "Those were the people I designed for first. If myHub worked for someone who'd happily phone rather than log in, it would work for everyone else, and it would work faster. Confident users don't mind a clearer path. Unconfident users abandon an unclear one, and then they call.",
    },
    {
      type: "callout",
      label: "The strategic call",
      text: "Design for the person most likely to give up and phone. Every improvement for them is a shortcut for everyone else, and they're the calls that cost the most to keep taking.",
    },

    { type: "h2", text: "One hub, twenty-nine vocabularies" },
    {
      type: "p",
      text: "The information architecture had to do something slightly thankless: make sense to people from 29 departments who had each learned different words for the same things. The structure couldn't belong to any one department. It had to be built around what people came to do, so it read the same whichever door you'd walked in through.",
    },
    {
      type: "compare",
      text: "",
      compare: {
        before: {
          label: "Before",
          items: [
            "A separate intranet or portal for each department",
            "Different words and admin processes for the same task",
            "Finding a form meant knowing what your department called it",
            "Calling the contact centre was the fastest route",
          ],
        },
        after: {
          label: "With myHub",
          items: [
            "One hub, one single sign-on",
            "A personal dashboard with your payslip on it",
            "Predictive search with a search concierge, plus a form-finder chatbot",
            "Live chat when you're stuck, before you reach for the phone",
          ],
        },
      },
    },
    {
      type: "p",
      text: "Underneath, security meant the platform ran on two separate instances of the Squiz DXP content management system. That's the right call for government and the wrong thing to make users think about. Federated search across both instances meant nobody had to know which side of the wall their answer lived on. They searched, and it was there.",
    },
    {
      type: "callout",
      label: "The strategic call",
      text: "Keep the complexity where it belongs. Security needed two instances; people needed one search box. The architecture carried the separation so the experience didn't have to.",
    },

    { type: "h2", text: "Ship confidence, not features" },
    {
      type: "p",
      text: "A platform this size can't be switched on for 300,000 people in an afternoon, and it shouldn't be. I planned the rollout so features arrived a step at a time. Each release gave people one new thing they could do without calling, and time to make it a habit before the next one landed.",
    },
    {
      type: "timeline",
      text: "",
      steps: [
        {
          when: "2019",
          title: "Discovery",
          text: "Discovery sessions with SSCL to understand the services, the departments and where the calls were really coming from.",
        },
        {
          when: "Research",
          title: "Across departments and career stages",
          text: "Interviews with civil servants from very different departments, from daily power users to people who'd never needed a portal.",
        },
        {
          when: "Design",
          title: "Information architecture and core flows",
          text: "One structure built around tasks rather than departments, and the core flows that sit on it: the dashboard, search, forms and help.",
        },
        {
          when: "Rollout",
          title: "A feature at a time, an agency at a time",
          text: "Features released in steps so habits could form, while agencies migrated off their old intranets onto myHub.",
        },
        {
          when: "Nov 2022",
          title: "First back-office connected form",
          text: "The first web form wired straight into SSCL's back office went live, so a request could be completed end to end without a call.",
        },
      ],
    },
    {
      type: "callout",
      label: "The strategic call",
      text: "Adoption is a design problem too. A phased rollout isn't caution for its own sake: it's how you change the habits of people who've been phoning for years, one successful task at a time.",
    },

    { type: "h2", text: "What I could point to" },
    {
      type: "stats",
      text: "",
      stats: [
        { value: "£300m", label: "saved in the first three years, as reported by SSCL" },
        { value: "9", label: "agencies migrated to myHub when Squiz published the story" },
        { value: "100,000s", label: "of civil servants using it regularly" },
        { value: "2", label: "secure instances, joined by one federated search" },
      ],
    },
    {
      type: "p",
      text: "Contact centre calls came down as people served themselves online or used live chat instead. Hundreds of thousands of civil servants now use myHub regularly, and SSCL reported £300m saved in the platform's first three years. That's the number I'm proudest to have been part of, because it's the one the whole project was really about: public money not spent on calls that should have been clicks.",
    },
    {
      type: "p",
      text: "The honest limits: that savings figure is SSCL's, not something I measured, and it belongs to a lot of people. Squiz's engineering and delivery teams built the platform, SSCL drove the change inside government, and I left Squiz in January 2023, while myHub was still rolling out. What I owned was the research, the structure, the core flows and the plan for how people would move across.",
    },
    {
      type: "p",
      text: "**Credits:** Carl Johnson and the SSCL team set the ambition and drove the change. Squiz's teams built and delivered myHub on the Squiz DXP. I led design: research, information architecture, core flows and the rollout plan. Public details are from [Squiz's SSCL customer story](" + SOURCE + ").",
    },
  ],
};
