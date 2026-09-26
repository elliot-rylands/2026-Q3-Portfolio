import type { Post } from "../posts";

export const holdNote: Post = {
  slug: "rethinking-booking-ux-with-motion",
  title:
    "What if booking software understood how people actually negotiate time?",
  dek: "A design-engineering experiment exploring how motion, progressive disclosure and smarter availability could make booking feel less like filling in a database.",
  date: "2026-08-20",
  readTime: 12,
  body: [
    {
      type: "demo",
      text: "hold",
      demo: "hold",
    },
    {
      type: "p",
      text: "The object at the top is a clinic booking. Dark on purpose. One reservation assembling on the left, availability on the right. I spent a few hours thinking about booking forms, which is either a productive use of an evening or a fairly strong sign that I need more hobbies.",
    },
    {
      type: "p",
      text: "Booking software is everywhere. Healthcare. Haircuts. Therapy. Dog daycare. Restaurants. Fitness. Consultations. Yet a surprising amount of it still feels like we're filling in the fields of somebody else's database.",
    },
    {
      type: "p",
      text: "Choose a service. Continue. Choose a practitioner. Continue. Choose a date. Continue. Choose a time. Continue. Fill in a form. Continue. Discover the time you wanted is no longer available. Swear quietly. Go backwards.",
    },
    {
      type: "p",
      text: "I wanted to see what would happen if I treated booking less like a multi-step form and more like a product interaction in its own right. Not a redesign of a particular product. Not an attempt to solve every scheduling edge case in an afternoon. Just a small design-engineering experiment:",
    },
    {
      type: "quote",
      text: "Could motion, progressive disclosure and a little smarter interaction design make booking feel more like negotiating an appointment with a human?",
    },
    {
      type: "p",
      text: "So I opened Figma, sketched some deliberately rough ideas, and then started turning the interesting ones into real React components. The roughness was important. I wasn't trying to design screens. I was trying to design behaviour.",
    },
    { type: "h2", text: "The problem with the traditional booking funnel" },
    {
      type: "p",
      text: "The conventional booking journey makes perfect sense from a systems perspective. A booking needs a service, a practitioner or resource, a location, a date, a time, customer details, potentially medical, accessibility or allergy information, and confirmation. So naturally we make each one a step.",
    },
    {
      type: "p",
      text: "The problem is that humans don't really think about appointments that way. We think more like:",
    },
    {
      type: "quote",
      text: "Thursday morning would be good. Sarah if she's around. Somewhere around 10. I don't really care if it's 9:45. And if Sarah can't do it, somebody else is probably fine.",
    },
    {
      type: "p",
      text: "That's not a sequence of database fields. It's a bundle of preferences with different levels of importance. And most booking interfaces are surprisingly bad at letting us express that.",
    },
    {
      type: "p",
      text: "A particularly unfriendly example is availability. You ask for 10:00. The system responds: **No availability.** Technically correct. Spectacularly unhelpful.",
    },
    {
      type: "p",
      text: "The interesting design question isn't how to make that error state prettier. It's: **what did the person actually mean when they asked for 10:00?** Exactly 10:00? Around 10:00? That morning? That practitioner? That day?",
    },
    {
      type: "p",
      text: "Once I started thinking about booking as a negotiation between preferences rather than a sequence of inputs, the interaction model became much more interesting.",
    },
    { type: "h2", text: "Sketching behaviour, not screens" },
    {
      type: "p",
      text: "I started in Figma with intentionally scrappy sketches. No polished design system. No heroic mockups. Mostly rectangles, arrows, annotations and questions.",
    },
    {
      type: "p",
      text: "I wanted to work out what should persist between steps, what should disappear, when the interface should ask one question at a time, when the user needs to compare several options, how unavailable appointments should behave, whether the UI can explain *why* its recommendations changed, and whether a booking could visually assemble itself as the user makes decisions.",
    },
    {
      type: "p",
      text: "That last question became the foundation of the experiment. Instead of moving through six disconnected screens, what if the user created a single **reservation object**?",
    },
    {
      type: "p",
      text: "At first it is almost empty.",
    },
    {
      type: "code",
      lang: "text",
      text: "Your booking\n\nNothing selected yet.",
    },
    {
      type: "p",
      text: "Choose a service and it becomes physiotherapy, 60 minutes, $95. Choose Sarah. Choose Thursday at 10:15. The important bit is that these aren't separate summaries generated after each screen. It is the **same component**. The booking is physically assembling in front of you. That immediately gave motion a useful job.",
    },
    { type: "h2", text: "Motion as information" },
    {
      type: "p",
      text: "Motion in product design can very quickly become garnish. Things slide because sliding looks nice. Cards spring because springs look expensive. Blur gets involved because apparently we all collectively decided software should look slightly radioactive. I wanted to avoid that.",
    },
    {
      type: "p",
      text: "Every significant animation needed to answer one of three questions: **Where did that thing go?** **Why did the interface change?** **What should I pay attention to now?**",
    },
    {
      type: "p",
      text: "That makes Motion particularly interesting. Shared layout transitions mean the service the user selects doesn't need to vanish and reappear as text somewhere else. It can visually become part of the reservation. The practitioner's avatar can move into the booking. The selected time can move from the availability surface into the reservation card.",
    },
    {
      type: "p",
      text: "The final confirmation isn't a brand new page summarising everything the user already knows. It's the object they've been constructing the entire time. That spatial continuity is doing actual UX work.",
    },
    { type: "h2", text: "A hybrid booking flow" },
    {
      type: "p",
      text: "One of the things I *didn't* want to do was turn the entire experience into a Typeform clone. One-question-at-a-time interfaces are excellent when the user needs to focus on one decision. They're considerably less useful when the user needs to compare twelve appointment times. So I ended up with three interaction modes.",
    },
    {
      type: "p",
      text: "**Explore.** This is where comparison matters. Services, practitioners, dates and availability can exist together spatially. The user should be able to scan, filter, change their mind, understand alternatives.",
    },
    {
      type: "p",
      text: "**Focus.** This is the Typeform-ish bit. One meaningful question at a time. Perfect for allergies, accessibility, appointment notes, insurance, contact details, consent, preferences. The rest of the interface recedes slightly while the question becomes the focus. But the reservation never disappears. A compact version remains visible so the user always understands what all this admin belongs to.",
    },
    {
      type: "p",
      text: "**Review.** At the end, the assembled reservation becomes the editing interface. No giant summary followed by an **Edit** link that teleports you four screens backwards. Click Sarah. Change Sarah. Click the date. Change the date. Click an allergy. Update it. The summary *is* the editor.",
    },
    { type: "h2", text: "Making unavailable times useful" },
    {
      type: "p",
      text: "This became my favourite part of the experiment. Instead of **10:00 is unavailable**, the interface can ask: **10:00 isn't available. What matters most?** Then offer something human:",
    },
    {
      type: "ul",
      text: "",
      items: [
        "Within 30 minutes",
        "Any time this morning",
        "Keep 10:00, change practitioner",
        "Keep Sarah, try another time",
      ],
    },
    {
      type: "p",
      text: "Choose **Within 30 minutes** and the availability surface reorganises. Perhaps 9:45 Sarah, 10:15 Sarah, 10:30 James. The selected preference becomes a visible constraint: `Within ±30 min`. The user can remove it whenever they want.",
    },
    {
      type: "p",
      text: "This is where motion becomes especially valuable. When a constraint changes, results don't simply blink into a new configuration. Appointments reposition. Unavailable options recede. Better matches move forward. The interface shows cause and effect.",
    },
    { type: "h2", text: "Booking gravity" },
    {
      type: "p",
      text: "Then I allowed myself one slightly ridiculous idea. What if appointments behaved like physical objects? The user has said Thursday, morning, Sarah preferred, around 10:00. Each available appointment can be scored against those preferences. Something conceptually as simple as:",
    },
    {
      type: "code",
      lang: "ts",
      text: "const score =\n  timePreference * 0.35 +\n  practitionerPreference * 0.30 +\n  datePreference * 0.20 +\n  locationPreference * 0.15;",
    },
    {
      type: "p",
      text: "Higher scoring appointments move closer to the centre of the interface. Lower scoring options move outward. Change **Sarah preferred** to **Any practitioner** and the constellation reorganises.",
    },
    {
      type: "p",
      text: "It's intentionally more expressive than a production booking interface probably needs. But as a design-engineering prototype, it demonstrates something important: **recommendation logic doesn't have to be invisible.** The interface can communicate how the system is interpreting the user's preferences.",
    },
    {
      type: "p",
      text: "There would always be a conventional accessible list representation alongside this. The visualisation is an enhancement, not the only way to complete the booking. On a phone, Hold hides the constellation and keeps the list. Reduced motion keeps the ranking and drops the drift.",
    },
    { type: "h2", text: "A better time picker" },
    {
      type: "p",
      text: "I also wanted to challenge the familiar grid of time buttons. It works. But it treats every available time as equally meaningful. Instead I experimented with a time preference control: morning to afternoon, a thumb, **Around 10am**.",
    },
    {
      type: "p",
      text: "Nearby appointments gather around the user's preferred time. Rather than asking the user to select exactly 10:00 before the system has even told them what's possible, they can express intent. The interface can then return a best match (10:15 · Sarah), earlier (9:45 · Sarah), and an exact time (10:00 · James).",
    },
    {
      type: "p",
      text: "It's a small semantic difference with a potentially large UX benefit. We're capturing intent before precision.",
    },
    { type: "h2", text: "Progressive medical and allergy questions" },
    {
      type: "p",
      text: "Booking forms get particularly ugly when operational information enters the picture. A single page suddenly contains seventeen fields, four checkboxes, medical questions and a textarea labelled **Additional information**, which is doing an extraordinary amount of work.",
    },
    {
      type: "p",
      text: "This is where the focused, Typeform-style interaction makes much more sense. Start with allergies. If yes, what. Only then severity. Finally an optional note. Instead of presenting the user with a medical form, we're asking a series of small, comprehensible questions.",
    },
    {
      type: "p",
      text: "More importantly, the information can affect the booking experience. If someone identifies a latex allergy, the interface might respond: **Latex allergy noted. We'll only show suitable services.** If they request step-free access: **Showing locations with step-free access.** The form isn't merely collecting information. The product is responding to it.",
    },
    { type: "h2", text: "The booking dock" },
    {
      type: "p",
      text: "On a phone I wanted the reservation to behave almost like a mini-player. A persistent dock sits at the bottom: `Thu 27 · 10:15 · Sarah`. Tap it and the reservation expands. Change something and it contracts again.",
    },
    {
      type: "p",
      text: "It means the user never loses the answer to **what am I currently booking?** It also gives the whole journey a physical anchor. Services, practitioners, times and answers can visually move toward the dock as they're selected. Again, motion isn't being used to decorate navigation. It's communicating that the user's choices are becoming part of something.",
    },
    { type: "h2", text: "The dark, slightly unnecessary visual treatment" },
    {
      type: "p",
      text: "Once the interaction model worked, I gave myself permission to make it look a bit ridiculous. Because this is also a visual prototype and sometimes visual prototypes should have a bit of **kapow**.",
    },
    {
      type: "p",
      text: "Near-black backgrounds. Charcoal elevated surfaces. Thin translucent borders. Restrained glass. Violet-to-electric-blue-to-cyan gradients. Soft ambient light blooms. Large, confident typography. Spring-driven transitions. Subtle depth and blur between focus states. Very Motion. Very dark-mode-product-launch-video. Possibly one animated mesh gradient away from starting a crypto company.",
    },
    {
      type: "p",
      text: "The important constraint was that the visual treatment couldn't undermine the interaction. Gradients indicate emphasis. Glow follows selection. Motion communicates state. Text maintains proper contrast. Focus states remain obvious. Nothing important relies on colour alone. And `prefers-reduced-motion` gets a first-class experience rather than simply switching everything off and hoping for the best.",
    },
    {
      type: "p",
      text: "The visual effects are there to make the prototype memorable. The underlying interaction should still work if I delete every gradient.",
    },
    { type: "h2", text: "Accessibility isn't the boring version" },
    {
      type: "p",
      text: "A motion-heavy booking interface has some obvious ways it can go horribly wrong. So accessibility became part of the component design rather than something to bolt on afterwards.",
    },
    {
      type: "ul",
      text: "",
      items: [
        "The time preference control still has a semantic range underneath it.",
        "Every animated appointment has a conventional focusable representation in the list.",
        "Keyboard users can move through availability predictably.",
        "Dynamic availability changes get an `aria-live` announcement.",
        "Focus doesn't jump because something animated across the screen.",
        "Motion respects `prefers-reduced-motion`.",
        "Colour is never the only indicator of selected, unavailable, recommended, required, warning, or success.",
        "The fancy **booking gravity** visualisation is never the only interface available.",
      ],
    },
    {
      type: "p",
      text: "This actually made the experiment more interesting. The challenge wasn't \"can I make an impressive Motion demo?\" It was: **can I make an impressive Motion demo without making the actual product worse?** A surprisingly useful constraint.",
    },
    { type: "h2", text: "Building the real thing" },
    {
      type: "p",
      text: "After the Figma sketches had done their job, I moved into React. The booking state is shared. The presentation changes around it. That's an important distinction. I didn't want page 1 state, then page 2 state, then page 3 state. I wanted one booking state, and different ways of interacting with it.",
    },
    {
      type: "p",
      text: "Motion then becomes the layer that maintains visual continuity as those representations change. `layout` handles reflow. `layoutId` connects shared objects. `AnimatePresence` handles questions and temporary states entering and leaving. Springs make availability changes feel responsive without turning the interface into jelly. And React handles the actual state machine underneath it all.",
    },
    {
      type: "p",
      text: "When you pick a time it can visibly move into the reservation and become **Held for you · 04:57**. If you choose another slot, the hold transfers. Concurrency becomes something the interface explains instead of something that eventually produces an error message. In this file the countdown is theatre. In production it would sit behind something like Supabase, with realtime updates when slots are taken or released.",
    },
    { type: "h2", text: "The component I ended up caring about most" },
    {
      type: "p",
      text: "The individual interactions are fun. But the interesting component isn't really the slider, or the animated availability, or the Typeform-style step. It's the combination of them. I started thinking of it as **SmartAvailability**.",
    },
    {
      type: "p",
      text: "It takes loose human preferences (Thursday, morning, Sarah preferred, around 10am, step-free access) and turns them into understandable options. Not just everything the database has. **Here's the appointment that seems closest to what you asked for, and here's why.** The user can manipulate those preferences directly and watch the availability landscape respond. That feels like a much more interesting direction for booking software.",
    },
    { type: "h2", text: "What I learned" },
    {
      type: "ul",
      text: "",
      items: [
        "**Capture intent before precision.** \"Around 10\" is often a more useful starting point than \"10:00\".",
        "**Never make unavailability a dead end.** \"No availability\" is a database response, not a useful product response.",
        "**Keep the booking visible.** Users shouldn't have to remember what they selected three screens ago.",
        "**Use focus when focus helps.** One question at a time is brilliant for allergies. It's terrible for comparing twelve appointment slots.",
        "**Make the summary editable.** Going backwards through a wizard to change one decision is unnecessary friction.",
        "**Let motion explain causality.** If changing a preference changes the results, show the relationship.",
        "**Progressive disclosure beats giant forms.** Ask for information when it becomes relevant.",
        "**Structured data can improve the experience immediately.** An accessibility requirement shouldn't disappear into a notes field. It should change what the product recommends.",
        "**Accessible doesn't mean static.** Motion, spatial interfaces and unconventional controls can still be accessible if the semantic interaction is designed first.",
      ],
    },
    { type: "h2", text: "Bringing static ideas to life" },
    {
      type: "p",
      text: "This is probably the bit I enjoyed most. Figma was useful because it let me think cheaply. I could draw a reservation card, scribble an arrow and write \"what if this physically becomes this?\" But there comes a point where a static design tool can't answer the question anymore.",
    },
    {
      type: "p",
      text: "How fast should it move? What happens halfway through the transition? Does it still make sense when the user changes their mind? What happens when five results become two? Does the interaction feel obvious or merely impressive? Those questions only really appear when the thing starts behaving like software.",
    },
    {
      type: "p",
      text: "That's why I increasingly enjoy moving between design and engineering rather than treating them as two clean phases. The Figma sketches weren't specifications for the build. They were hypotheses. Building the components was how I tested them. Some became better. Some became simpler. Some looked clever in a frame and felt absolutely dreadful once they moved. Which is useful information.",
    },
    { type: "h2", text: "Where I'd take it next" },
    {
      type: "p",
      text: "A real availability backend would let me test temporary slot holds and concurrent bookings. I'd like to explore multi-person appointments, where the system can optimise several schedules simultaneously. I'd also like to test whether people actually understand preference-based time selection faster than a conventional slot grid.",
    },
    {
      type: "p",
      text: "And there's an interesting question around repeat bookings. If the system already knows the service you normally book, the practitioner you usually see, your preferred location, roughly when you tend to visit, and your existing accessibility requirements, then perhaps the best booking experience isn't a booking flow at all. Perhaps it's simply: **Sarah's next similar appointment is Thursday at 10:15. Book it.** One decision. Done.",
    },
    { type: "h2", text: "The point of the exercise" },
    {
      type: "p",
      text: "I'm not suggesting every booking product needs glowing appointment constellations. Probably for the best. The exercise was really about using implementation as part of the design process. Start with a familiar interaction. Question some assumptions. Sketch quickly. Build the behaviour. See what survives contact with reality. And use tools like Motion for more than making rectangles arrive dramatically from `y: 20`.",
    },
    {
      type: "p",
      text: "The thing I keep coming back to is this:",
    },
    {
      type: "quote",
      text: "Booking software knows availability. Humans negotiate possibilities.",
    },
    {
      type: "p",
      text: "There's an interesting product somewhere in the gap between those two things. I spent a few hours seeing what it might feel like. If you just wanted to take 10:15, you already did.",
    },
  ],
};
