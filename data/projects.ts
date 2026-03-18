export interface Project {
  title: string
  description: string
  image: string
  url: string
  slug: string
  fullDescription?: string
  about?: string
  aboutImage?: string
  aboutImageDescription?: string
  aboutImages?: Array<{
    src: string
    description?: string
  }>
  author?: string
  role?: string
  projectUrl?: string
  detailImage?: string
  detailImageDescription?: string
  detailImage2?: string
  detailImage2Description?: string
  detailImageSection?: {
    title: string
    text: string
  }
  designProcess?: {
    introduction?: string
    research?: string
    researchAnnotation?: string
    researchMethods?: string[]
    researchStats?: Array<{ value: string; label: string }>
    researchCallout?: string
    ideation?: string
    ideationCallout?: string
    combinedPrototypingTesting?: boolean
    prototypingCallout?: string
    prototyping?: string
    prototypingImages?: string[]
    figmaEmbed?: string
    testing?: string
  }
  reflection?: string
  testimonials?: {
    name: string
    role: string
    text: string
  }[]
  isNew?: boolean
}

export const pinnedProjects: Project[] = [
  {
    title: 'Campus Connext',
    description: 'CampusConnext is an all-in-one student app platform designed to centralize the fragmented university experience',
    image: '/assets/cc.png',
    url: '#',
    slug: 'campus-connext',
    fullDescription: 'Mobile app connecting university students with campus life. The app provides a comprehensive platform for students to access campus resources, events, and services.',
    about: 'It started at a McDonald\'s. Me and my friend Sidd — who I\'d met during our internship at New Designers — were sitting across from each other, throwing ideas around, and somewhere in that conversation our thinking started to align. We both felt it. We stood up, went back to the internship office at around 10pm, and spent the rest of the night in a full-on ideation session — sketching, brainstorming, connecting dots. By the end of it, we had a first concept. That concept became Campus Connext.<br/><br/>After that night, we called in people we trusted. Luca joined as our backend developer, and Arina and Elioth came on board as UX designers. Five people, one shared frustration, and a whole lot of belief that student life could be better.',
    author: 'Max Mencl',
    role: 'Co-Founder & UX Lead',
    projectUrl: 'https://campusconnext.com/',
    detailImage: '/assets/cc.png',
    detailImageSection: {
      title: 'Where It All Began',
      text: 'We weren\'t consultants brought in to solve a problem — we were living it. As students at The Hague University of Applied Sciences, we felt the daily friction of juggling a dozen different platforms, missing events we didn\'t know about, and feeling disconnected from the very campus we were supposed to call home.\n\nThat personal frustration is what made the difference. We weren\'t designing for a user persona — we were designing for ourselves, our classmates, and every student who would walk through those doors after us. That\'s a very different kind of motivation.'
    },
    detailImage2: '/assets/slide3.png',
    detailImage2Description: 'Overview of key features and design concepts',
      designProcess: {
        introduction: 'From the beginning, we knew that good intentions weren\'t enough. To build something students would actually use — and love — we needed a real process. We structured our work around the <span class="design-process-tooltip-group relative inline-block"><em class="cursor-help">Double Diamond</em><span class="design-process-image-tooltip"><img src="/assets/licensed-image.jpeg" alt="Double Diamond Model" /></span></span> framework, giving us the space to explore widely before narrowing in on the right solution. The problem we were solving — the <span class="design-process-tooltip-group relative inline-block"><em class="cursor-help">systemic fragmentation</em><span class="design-process-tooltip">Universities across the Netherlands use a variety of platforms<br/>where data is scattered, making it difficult for students<br/>and teachers to navigate and find the relevant information they need</span></span> of student life — was bigger than any single feature could fix.<br/><br/>We worked in Scrum sprints, keeping the feedback loop tight between design and development. I led the UX side, making sure every decision was grounded in what we learned from real students — not assumptions. The goal was never just a working app. It was an app that felt effortless to use. Here\'s how we got there.',
      researchStats: [
        { value: '150+', label: 'Participants' },
        { value: '4', label: 'Methods' },
        { value: '3', label: 'Groups' }
      ],
      researchMethods: ['Desk Research', 'Competitive Analysis', 'Surveys', '1-on-1 Interviews', 'Focus Groups'],
      researchCallout: 'Students juggle nearly a dozen platforms just to get through the day — and sometimes can\'t even show their student card at an exam.',
      ideationCallout: 'You won\'t notice good UX — but you will definitely notice bad UX.',
      ideation: 'With our research findings in hand, we threw ourselves into one of the most energetic phases of the project. As two designers who had been studying UX at The Hague University, we didn\'t just apply what we\'d learned in class — we lived it. How Might We sessions, Crazy 8s, mind mapping, brainwriting, competitive benchmarking, user journey mapping, sketching, MoSCoW prioritization — we ran it all, and then some.[CALLOUT]Some sessions were just the two of us, piecing things together late into the evening. Others involved our broader team, and many we ran with real participants — students who shared the same frustrations we did. Each session brought us a little closer to clarity. We didn\'t know the format from day one; ideation was the process of connecting the dots, one session at a time.<br/><br/>What drove us wasn\'t just a design brief — it was a genuine desire to change something. Our student lives felt overwhelming, and we wanted to build something that would make life easier not just for us, but for every student who came after us. That purpose kept us focused through the ambiguity. Eventually, a clear direction emerged: a unified digital hub that merges every aspect of student life into one seamless experience. Something students wouldn\'t even have to think about — because the best UX is the kind you never notice.',
      combinedPrototypingTesting: true,
      prototypingCallout: 'We iterated. Then iterated again. Good design isn\'t built in one go — it\'s earned through every round of feedback.',
      prototyping: 'With a clear direction locked in and a prioritized backlog set up in GitHub, the team split into parallel tracks. While the developers got to work setting up the infrastructure — servers, hosting, domain, database, storage — the design team moved fast on bringing the concept to life. Every task had an owner, every sprint had a goal, and the momentum was real from day one.<br/><br/>We started where all good design starts: paper. Big, messy, low-stakes paper prototypes that let us explore layout and flow without getting precious about any of it. Once the structure felt right, we moved into lo-fi digital wireframes and ran our first round of testing with a close group of participants. Their feedback was direct and invaluable — and we iterated. Then iterated again. Then once more.[CALLOUT]Throughout every stage, we validated our decisions with professors from the university, using their expertise as a sounding board to pressure-test our UX choices before moving forward. It kept us grounded and ensured the product wasn\'t just desirable to students, but credible to the institution behind it.<br/><br/>Once the lo-fi held up, we moved into high-fidelity. Our first hi-fi MVP went in front of a larger batch of students — real users, real feedback, real edge cases we hadn\'t anticipated. We iterated, tested again, and kept tightening the experience until the app didn\'t just work — it felt effortless. The final benchmarks confirmed what we\'d worked toward: Campus Connext outperformed the university\'s own student app across every metric that mattered.',
      research: 'Our research phase was extensive, combining desk research, competitive analysis, one-on-one interviews, surveys, and focus groups — engaging over 150 participants in total. We began by studying the landscape of existing university digital solutions, auditing competitor platforms and experiencing their shortcomings firsthand — because we weren\'t outside observers, we were the students.[CALLOUT]Our largest group of participants were students, and the picture they painted was consistent: chaos. The average student at The Hague University juggles nearly a dozen different platforms on any given day — Brightspace for assignments, Osiris for grades, SharePoint for resources, Teams for messaging, WhatsApp for group chats, OnStage for internship applications — and that\'s before accounting for their university email and student card app. Students described feeling overwhelmed, out of control of their own academic lives, and frustrated by the sheer amount of time lost just navigating between tools. The most telling example? A recurring issue where students arrive to write an exam only to find their student app won\'t log them in — leaving them unable to show their digital student card at the door.<br/><br/>Conversations with teachers and university staff added another layer to our findings. One organization within the university had long wanted a dedicated space for students to register for campus events, but had never found a viable solution. Rather than pushback, our initiative was met with genuine enthusiasm — our concept sparked interest and support across multiple faculties, giving us early institutional validation before a single screen was designed.'
      },
    reflection: 'Campus Connext is more than a project on my portfolio — it\'s a chapter of my life. Whether it grows into a scale-up or stays our scrappy side project forever, what it gave me can\'t be measured in metrics or milestones.<br/><br/>It gave me my best friends. It gave me hunger. It gave me some of the best memories I\'ve made so far, built in late-night sessions, last-minute pivots, and the kind of shared struggle that turns teammates into family. And above everything, it taught me that no matter how high or low you find yourself, you can always make things happen. Anything is possible.<br/><br/>Professionally, Campus Connext gave me the foundation I\'ll carry into every UX project that follows. It threw me into a fast-paced environment where designers and developers worked side by side — and I learned to thrive in that space. I stopped waiting for the perfect plan and started solving problems on the go, preparing overnight, iterating on real results instead of endlessly theorizing. It shaped the way I work: move fast, stay curious, and always put the user first.',
  },
  {
    title: 'LLO Caribbean',
    description: 'LLO-Caribbean is a collaborative "Leven Lang Ontwikkelen" (Lifelong Learning) platform bridging the Netherlands and the Caribbean islands of the Dutch Kingdom',
    image: '/assets/llo-cover.png',
    url: '#',
    slug: 'llo-caribbean',
    isNew: true,
    fullDescription: 'LLO Caribbean is a collaborative educational platform designed to foster lifelong learning and professional development across the Dutch Caribbean and the Netherlands. By uniting leading academic institutions, the project provides a centralized hub for accessible, high-quality courses and training programs.',
    about: 'In a strategic partnership with The Hague University of Applied Sciences, Utrecht University, the University of Curaçao, and the University of Aruba, we were commissioned to design and develop a comprehensive digital ecosystem for regional education. Our objective was to create a unified "Lifelong Learning" (LLO) portal that bridges the geographical gap between the Netherlands and the Caribbean.<br /><br />The resulting platform serves as a sophisticated marketplace and management system where these four institutions can seamlessly publish, manage, and track professional courses.<br /><br />Beyond a simple directory, the solution provides a streamlined application pipeline for users, integrated search and comparison tools, and a robust backend designed to handle cross-institutional data. This digital infrastructure empowers the region by making high-level academic and professional training more accessible than ever before.',
    aboutImages: [
      {
        src: '/assets/Screenshot 2025-12-31 at 01.21.59.png',
        description: 'LLO Caribbean Homepage - Hero Section'
      },
      {
        src: '/assets/Screenshot 2026-01-01 at 22.35.42.png',
        description: ''
      },
      {
        src: '/assets/Screenshot 2026-01-01 at 22.37.16.png',
        description: ''
      },
      {
        src: '/assets/Screenshot 2026-01-01 at 22.40.21.png',
        description: ''
      }
    ],
    author: 'Max Mencl',
    role: 'Lead UX Designer',
    projectUrl: 'https://llo-caribbean.org/en-US',
    designProcess: {
      introduction: 'To ensure a high-quality, scalable result for such a diverse group of stakeholders, we adopted a <span class="design-process-tooltip-group relative inline-block"><em class="cursor-help">Double Diamond</em><span class="design-process-image-tooltip"><img src="/assets/licensed-image.jpeg" alt="Double Diamond Model" /></span></span> design methodology integrated within a <span class="design-process-tooltip-group relative inline-block"><em class="cursor-pointer">Waterfall framework</em><span class="design-process-image-tooltip"><img src="/assets/waterfall-sdlc-model.png" alt="Waterfall Principle" /></span></span>. This approach allowed us to maintain a structured project timeline while ensuring deep exploration of the user\'s needs. The journey began with extensive discovery sessions, where we met with representatives from all four universities to translate their collective vision into a concrete set of functional requirements.',
      research: 'Our research phase began with a series of Stakeholder Discovery Sessions involving academic and administrative leads from the four partner universities. The goal was to map out the unique requirements of each institution—from the University of Aruba\'s local enrollment needs to Utrecht University\'s data compliance standards. Through these interviews, we identified a primary friction point: the lack of a centralized, \'borderless\' interface where courses from different regions could be compared and accessed with equal ease.',
      researchAnnotation: 'This was one of the most challenging phases of the project. Coordinating with four different institutions across time zones required careful planning and cultural sensitivity. The discovery sessions revealed that each university had unique constraints we hadn\'t initially anticipated.',
      ideation: 'During the ideation phase, we focused on translating our research insights into a tangible digital strategy. We held brainstorming sessions to tackle the primary challenge: How do we create a unified user experience for four distinct institutions with different branding and course structures? We explored various navigation models and \'course card\' designs, eventually landing on a modular grid system. This allowed for a consistent look and feel across the LLO Caribbean platform while giving each university—from Utrecht to Aruba—the space to showcase their unique program offerings and cultural identity.',
      prototyping: 'With our research and ideation finalized, we moved into the prototyping phase, working exclusively in Figma to maintain a centralized, collaborative environment for all stakeholders. This stage was critical for translating complex institutional requirements into a user-friendly digital flow.<br/><br/>We deliberately started with Lo-Fi wireframes—layouts that focused strictly on structure, hierarchy, and navigation rather than aesthetics. By stripping away colors and images, we were able to:<br/><br/><ul style="list-style-type: disc; padding-left: 1.5rem; margin: 1rem 0;"><li style="margin-bottom: 0.5rem;"><strong>Define the Information Architecture:</strong> We mapped out how hundreds of courses from four different regions could be filtered and categorized without overwhelming the user.</li><li style="margin-bottom: 0.5rem;"><strong>Streamline User Flows:</strong> We visualized the "Apply Now" journey, ensuring that the transition from a course page to the enrollment form was frictionless.</li><li style="margin-bottom: 0.5rem;"><strong>Foster Psychological Safety for Feedback:</strong> Because the designs looked "unfinished," our clients felt more comfortable suggesting major structural changes early on, which prevented costly redesigns later in the development phase.</li></ul><br/>[IMAGE:wireframes.png|Lo-Fi wireframes showing the structural layout and navigation flow]<br/><br/>Our process was highly iterative. We hosted regular design walkthroughs with the project leads from the Dutch and Caribbean universities. Using Figma\'s prototyping tools, we created clickable paths that allowed stakeholders to "feel" the navigation before a single line of code was written.<br/><br/>Through multiple rounds of feedback, we refined the placement of key features like the course comparison tool and the regional search filters. This collaborative loop ensured that by the time we moved to High-Fidelity design, the core structure of the LLO Caribbean platform was already approved and battle-tested by the people who would use it most.<br/><br/>[IMAGE:Screenshot 2025-12-31 at 02.00.38.png|High-fidelity design mockups showcasing the final visual design and user interface]',
      figmaEmbed: 'https://embed.figma.com/design/D2QaB2XVFYzaLsa1Tamsmn/High-Fidelity-UI-Design?node-id=167-41015&embed-host=share',
      testing: 'To ensure the platform was ready for a complex, multi-institutional launch, we conducted targeted testing sessions with key user groups and stakeholders. This phase was essential for verifying that the technical infrastructure could handle the diverse course data from four different universities while maintaining a smooth, intuitive interface.'
    },
    reflection: 'Taking this platform from a blank canvas to a full-scale launch was a defining moment for our team. As this was our first major venture as graduates, the stakes felt incredibly high. Managing the "0 to 100" journey under tight deadlines forced me to evolve quickly from a designer into a strategist. I realized that leadership in this context wasn\'t just about making aesthetic choices; it was about maintaining a clear vision while navigating the logistical complexities of a transatlantic project.<br /><br />The most profound lesson I took away, however, was the necessity of cultural humility in design. Even with a structured process, I learned that a digital solution for the Caribbean requires more than just technical functionality—it requires an awareness of regional nuances and local context. This experience taught me to be more inclusive in my thinking, ensuring that the interface didn\'t just feel like a Dutch export, but a shared space that respected the identity of every island involved.<br /><br />Building this as a new team meant we had to learn the "art of the pivot" in real-time. It sharpened my ability to translate client feedback into actionable iterations without losing momentum.'
  },
  {
    title: 'THiNK Fest Website Design & Development',
    description: 'THiNK Fest is a digital platform for The Hague University of Applied Sciences (THUAS) annual festival',
    image: '/assets/thinkfest-cover.jpg',
    url: '#',
    slug: 'think-fest-website',
    fullDescription: 'During my 6-month internship at New Designers, I worked as a UX Intern on the design and development of the THiNKFeST website — a brand new event platform for an annual festival at The Hague University of Applied Sciences. The website launched successfully in 2024 and has been used ever since.',
    about: 'New Designers is a digital agency based in The Hague, working across web development, UI/UX design, research, and branding. During my 6-month internship there, the main project I contributed to was building the THiNKFeST website from the ground up — commissioned by The Lighthouse, the in-school agency that manages all events at The Hague University.<br/><br/>I worked as part of a cross-functional Scrum team alongside other designers, developers, and a product owner. My contributions spanned research, UX design, and usability testing — with a particular focus on the event registration flow, the event calendar, and the homepage.',
    author: 'Max Mencl',
    role: 'UX Intern — New Designers',
    projectUrl: 'https://thinkfest.nl/',
    detailImageSection: {
      title: 'What is THiNKFeST?',
      text: 'THiNKFeST is an annual festival that takes place on campus at The Hague University of Applied Sciences. Once a year, the entire school comes alive — students and professors alike can organise their own events, from workshops and speeches to performances. There\'s a buffet, a bar, and a full programme of activities that fills the building with energy for an entire day.\n\nThe festival needed a website that could handle it all — event discovery, registration, and management. That\'s where New Designers, and our team, came in.'
    },
    designProcess: {
      introduction: 'Since the website was being built from scratch, there was no broken product to fix — there was a blank canvas to fill. That comes with its own challenges. We had to define the right features, the right flows, and the right structure before a single screen was designed. Everything started with research — understanding who we were building for, what they needed, and where existing solutions fell short.',
      research: 'Our research phase covered a wide range of methods — stakeholder interviews, user interviews with students and professors, surveys, competitive analysis, usability testing, card sorting, A/B testing, desk research, focus groups, and contextual inquiry. Each method served a different purpose, and together they gave us a well-rounded picture of what the platform needed to be.[CALLOUT]The most important insight that emerged: event registration had to be simple, clear, and error-proof. The festival draws a wide range of participants — from tech-savvy students to professors who rarely interact with digital tools. The experience had to work for everyone.',
      researchCallout: 'The platform had to work for everyone — from tech-savvy students to professors who rarely touch digital tools.',
      ideation: 'With the research findings in hand, we moved into ideation — running sessions with both the client and potential users to explore solutions together. Working in Scrum, we broke the work into user stories and prioritised the backlog sprint by sprint, making sure we were always building what mattered most first.<br/><br/>One of the most important features we identified early on was the event registration flow. With events being a core requirement of the platform — administrators adding events via CMS, users registering through the website, and organisers needing headcount data — this flow had to be airtight.',
      prototyping: 'With the priorities clear and the user stories mapped out, it was time to put ideas into screens. I owned the event registration flow from start to finish. Because users needed to provide multiple pieces of information to register, we designed it as a step-by-step flow — breaking the process into clear, digestible stages rather than presenting one long form. This reduced cognitive load and made it far easier to handle errors gracefully at each step.[CALLOUT]We went through many iterations to get it right. The goal was a flow so clear that no instruction was needed — what we called "idiot-proof" internally. Every edge case was considered, every error state designed, until the flow was both complete and effortless.<br/><br/>Alongside the registration flow, I collaborated with a teammate on the event calendar and the homepage — two other central pieces of the platform that required their own rounds of wireframing, feedback, and iteration.',
      prototypingCallout: 'So clear that no instruction is needed — that was the bar we set for ourselves.',
      testing: 'Testing wasn\'t a phase — it was woven into every sprint. As we worked through each component, we tested continuously with a diverse group: students, professors, the client team at The Lighthouse, and our colleagues at New Designers. A/B testing helped us make decisions with confidence rather than opinion, and each round of feedback shaped the next iteration.<br/><br/>The most memorable testing moment came from an unexpected place — THiNKFeST itself. We hosted our own session at the festival, putting the platform in front of real attendees in the exact environment it was built for. Watching people interact with something we\'d designed, in real time, with real stakes — that\'s a kind of feedback you can\'t replicate in a studio. It gave us insights we wouldn\'t have found anywhere else, and fed directly into the final rounds of iteration before launch.',
    },
    reflection: 'This internship was where I learned what it actually means to work as a designer in a professional setting. Being embedded in a Scrum team, collaborating daily with developers and a product owner, and working directly with a real client — it was a completely different experience from school projects, and it accelerated my growth fast.<br/><br/>Building something from scratch is exciting, but it also demands a lot of discipline. Without an existing product to react to, you have to be intentional about every decision — and constantly validate that you\'re building the right thing. The research-heavy approach we took gave us the confidence to move forward, knowing our decisions were grounded in real user needs.<br/><br/>Seeing the website go live and used at the first-ever THiNKFeST in 2024 was one of those moments that reminds you why this work matters.',
  },
  {
    title: 'ExamenTool',
    description: 'ExamenTool is a bespoke SaaS solution designed to digitize and automate the complex lifecycle of university exam registration',
    image: '/assets/HHS-1.png',
    url: '#',
    slug: 'examentool',
    fullDescription: 'A custom-built exam management system designed to replace an unreliable Excel-based process at The Hague University of Applied Sciences — built from scratch during my internship at New Designers.',
    about: 'Also built during my internship at New Designers, ExamenTool was commissioned by The Hague University of Applied Sciences to solve a very real and recurring problem. Invigilators were using a manually updated Excel sheet to verify student registrations at exam halls — a sheet that had to be refreshed every 8 days and was prone to errors. Students were being turned away from exams they had registered for. The university had had enough, and came to us to build something better.<br/><br/>I worked alongside my colleague Sara as UX Intern, and together we designed and built the system from the ground up using Next.js, Tailwind CSS, Supabase, and TinaCMS.',
    author: 'Max Mencl',
    role: 'UX Intern — New Designers',
    projectUrl: '#',
    detailImageSection: {
      title: 'The Problem With Excel',
      text: 'Every 8 days, someone had to manually update a spreadsheet that determined whether a student could sit their exam. If the update was late, if a row was wrong, if the file didn\'t open — students paid the price. It was a fragile system propped up by manual effort, and it was failing people at one of the most stressful moments of their academic life.\n\nThe brief was clear: replace it with something reliable, role-based, and built to last.'
    },
    designProcess: {
      introduction: 'Unlike projects where the problem is fuzzy, here it was crystal clear from day one — the Excel sheet had to go. That clarity was a gift. It meant we could move fast, stay focused, and pour most of our energy into execution rather than discovery. But even with a clear problem, we still needed to understand the people living with it before we could design a solution worth building.',
      research: 'Our research was deliberately focused. We conducted desk research to benchmark existing solutions and understand what a reliable exam management system looks like in practice. We then sat down with the people who actually used the Excel sheet day-to-day — invigilators and administrators — and walked through their workflow step by step.<br/><br/>What we found confirmed what the university already suspected: the manual update cycle was the root of everything. But the interviews also revealed something important about roles — invigilators and administrators had very different needs and levels of access, which had to be reflected in the system we designed.',
      researchCallout: 'Students were being turned away from exams they had registered for. That\'s the problem we were solving.',
      ideation: 'Knowing we needed "some kind of system" is a starting point, not a plan. Before a single screen could be designed, we had to define exactly what we were building — every function, every role, every flow. That meant ideation.<br/><br/>We ran sessions using all the classic methods — How Might We, mind mapping, user journey mapping, and more — to move from vague brief to concrete product definition. We mapped out the full feature tree: what administrators needed, what invigilators needed, how data would flow between them, and what the system had to handle at the moment it mattered most — the exam hall door.<br/><br/>By the end of ideation, we had a clear picture of the product we were going to build. That clarity is what made the execution phase as focused as it was.',
      ideationCallout: 'Knowing you need "some kind of system" is a starting point — not a plan.',
      prototyping: 'With the requirements clear, Sara and I got to work. The core of what we built was the scanning interface — the tool invigilators use at the exam hall door to verify students in real time. It had to be fast, readable at a glance, and reliable under pressure. No loading delays, no ambiguity, no room for error.<br/><br/>Alongside the scanner, we built out the full student list view with filtering and sorting options, so invigilators could quickly find a student by name, registration number, or status. We also designed the administrator interface — a separate set of tools for managing exam sessions, updating student data, and overseeing the system — with clear role separation between admin and invigilator access built in from the start.<br/><br/>Every screen went through multiple rounds of iteration. We tested internally, ran demos with the client, and kept refining until every flow felt airtight.',
      prototypingCallout: 'Fast, readable at a glance, and reliable under pressure — those were the three requirements the scanning interface had to meet.',
      testing: 'Testing happened in layers. We started internally within the New Designers team, stress-testing every flow and catching edge cases before anything reached a real user. From there, we moved to the invigilators themselves — the people who would be using the scanning interface under pressure on exam day — and iterated based on their feedback.<br/><br/>The final and most telling test came when we put the system in front of real students at real exams. It worked. The scans were fast, the data was accurate, and the process that had previously caused so much friction ran smoothly. Seeing it hold up in a live environment — with actual students, actual stakes — was the validation that mattered most.',
    },
    reflection: 'ExamenTool taught me what it feels like to design something where the stakes are genuinely high. This wasn\'t a nice-to-have — it was a system that determined whether students could sit their exams. That responsibility sharpened my focus in a way that\'s hard to replicate on lower-stakes projects.<br/><br/>Working closely with Sara on every part of the system also reinforced something I\'d started to learn at THiNKFeST: great outcomes come from great collaboration. Two designers thinking through the same problem from different angles consistently produced better results than either of us would have alone.<br/><br/>The app is currently awaiting final approval, but every test and demo has gone well. Knowing that something we built from scratch is about to replace a broken process — and make exam day a little less stressful for students — is a good feeling.',
  }
]

export function getProjectBySlug(slug: string): Project | undefined {
  return pinnedProjects.find(project => project.slug === slug)
}

