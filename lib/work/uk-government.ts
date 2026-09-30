import type { CaseStudy } from "../work";

const SOURCE = "https://www.squiz.net/customer-stories/sscl";

// No product imagery for legal reasons: the story is carried by a task, the
// documented architecture and the rollout, with public facts from Squiz's story.
export const ukGovernment: CaseStudy = {
  slug: "uk-government",
  title: "Making self-service faster than the phone",
  dek: "Calling was quicker than finding the right form. That was the behaviour myHub had to change. Through Squiz, I led design on a shared self-service experience across SSCL's departmental hubs.",
  accent: "light-dark(#1f6f5c, #6cc9ab)",
  meta: [
    { label: "Role", value: "Design Lead at Squiz, for SSCL" },
    { label: "When", value: "2019 to Jan 2023" },
    { label: "Owned", value: "Research, information architecture, core flows, rollout plan" },
    { label: "Client", value: "SSCL, a Cabinet Office and Sopra Steria joint venture" },
  ],
  work: [
    { value: "29", label: "government departments served by SSCL" },
    { value: "9", label: "hubs built on one shared myHub framework" },
    { value: "2", label: "secure CMS instances behind one federated search" },
  ],
  notice:
    "For legal reasons I can't show the product, so this one is told through the service, the architecture and the rollout instead of screens. Public facts and quotes come from Squiz's SSCL customer story. The savings figure is SSCL's own and isn't in that story.",
  body: [
    {
      type: "p",
      text: "SSCL, a joint venture between the Cabinet Office and Sopra Steria, runs HR, payroll, finance and contact centre services for a large part of the UK government. Each department had its own intranet or portal, with its own words for things and its own way of doing admin.",
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
      text: "Picture a civil servant who needs a form. Where it lives depends on their department, and what it's called depends on the department too. A call to the contact centre gets them a person who knows. For them, calling is the sensible choice. For SSCL, every one of those calls is contact centre time spent on a task a web page could have handled.",
    },

    { type: "demo", text: "", demo: "flow-gov" },

    { type: "h2", text: "A website brief, a behaviour problem" },
    {
      type: "p",
      text: "Projects like this tend to arrive dressed as a website: new look, new homepage. SSCL's real aim was to reduce the cost of support by making self-service the easier route, and that is a question about behaviour. People change routes when the new one is faster. They don't change for a nicer homepage.",
    },
    {
      type: "quote",
      text: "I came into this project really with the view that we're going to build just a fancy website... we've learned how to gain real business results.",
      cite: { name: "Carl Johnson", role: "Contact Centre Program Director, SSCL", href: SOURCE },
    },
    {
      type: "p",
      text: "A lot of my job was keeping the conversation on that: calls avoided and tasks finished, rather than colours and hero images, so the people funding it could see how a design decision connected to the support it was meant to reduce.",
    },

    { type: "h2", text: "Designing for the person most likely to phone" },
    {
      type: "p",
      text: "I led research across departments and career stages. Some people lived in software all day. Others had gone a whole career without needing a web portal and weren't planning to start now.",
    },
    {
      type: "p",
      text: "I designed for that second group first. They were the people most likely to give up on an unclear page and call, so a route that worked for them had the best chance of pulling calls away from the contact centre. Confident users lose nothing from a clearer path.",
    },

    { type: "h2", text: "Following one task through" },
    {
      type: "p",
      text: "Take that form again. The first problem is vocabulary: 29 departments had learned different names for the same things. So the information architecture couldn't belong to any one of them. It was organised around what people came to do, and read the same whichever department you worked in.",
    },
    {
      type: "p",
      text: "The second problem was security. The platform ran on two separate instances of the Squiz DXP content management system, because different content had different security requirements. That's the right call for government and the wrong thing to make a user think about. A federated search crawls both, with permission-aware results, so the form turns up in one search box whichever side of the wall it lives on.",
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
            "Departmental hubs on one shared framework and structure",
            "A personal dashboard with your payslip on it",
            "Predictive search with a search concierge, plus a form-finder chatbot",
            "Live chat when you're stuck, before you reach for the phone",
          ],
        },
      },
    },
    {
      type: "p",
      text: "The architecture Squiz describes is nine hubs on a shared myHub framework, not one site replacing everything at once. Departments keep their own hub; the structure, components and search underneath are shared.",
    },

    { type: "h2", text: "Rollout, a habit at a time" },
    {
      type: "p",
      text: "People who have phoned for years don't switch because a platform launches. I planned the rollout so features arrived a step at a time, each giving people one new thing they could do without calling, and time to make it a habit before the next one landed, while agencies moved across from their old intranets.",
    },
    {
      type: "timeline",
      text: "",
      steps: [
        { when: "2019", title: "Discovery", text: "Sessions with SSCL to understand the services, the departments and where the calls were coming from." },
        { when: "Research", title: "Across departments and career stages", text: "Interviews with civil servants from very different departments, from daily power users to people who'd never needed a portal." },
        { when: "Design", title: "Information architecture and core flows", text: "A structure built around tasks rather than departments, and the core flows on it: the dashboard, search, forms and help." },
        { when: "Rollout", title: "A feature at a time, an agency at a time", text: "Features released in steps so habits could form, while agencies migrated onto myHub." },
        { when: "Nov 2022", title: "First back-office connected form", text: "The first web form wired straight into SSCL's back office went live, so a request could be completed end to end without a call." },
      ],
    },

    { type: "h2", text: "What SSCL reported" },
    {
      type: "p",
      text: "When Squiz published the customer story in December 2022, nine agencies had migrated to myHub, hundreds of thousands of civil servants were using it regularly, and contact centre calls had come down as people served themselves or used live chat. SSCL has separately reported £300m saved over the platform's first three years. That figure is SSCL's, it isn't in the Squiz story, and it describes their programme as a whole rather than my work.",
    },
    {
      type: "p",
      text: "I left Squiz in January 2023, while agencies were still moving across. My part was the research, the information architecture, the core flows and the rollout plan.",
    },
    {
      type: "p",
      text: "**Credits:** Carl Johnson and the SSCL team set the ambition and drove the change. Squiz's teams built and delivered myHub on the Squiz DXP. Public details are from [Squiz's SSCL customer story](" + SOURCE + ").",
    },
  ],
};
