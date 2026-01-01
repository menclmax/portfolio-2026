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
    ideation?: string
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
}

export const pinnedProjects: Project[] = [
  {
    title: 'Campus Connext',
    description: 'Mobile app connecting university students with campus life',
    image: '/assets/cc.png',
    url: '#',
    slug: 'campus-connext',
    fullDescription: 'Mobile app connecting university students with campus life. The app provides a comprehensive platform for students to access campus resources, events, and services.',
    about: 'CampusConnext started with a simple idea: make campus life better for everyone. Founded by students who experienced the challenges of campus engagement firsthand, our team believes in creating stronger communities, better communication, and lasting connections.',
    author: 'Max Mencl',
    role: 'Co-Founder & UX Lead',
    projectUrl: 'https://campusconnext.com/',
    detailImage: '/assets/cc.png',
    detailImageSection: {
      title: 'Where It All Began',
      text: 'Our journey began at The Hague University of Applied Sciences, where we witnessed firsthand the challenges of campus engagement and community building. What started as a simple idea in the bustling halls of our university has grown into a mission to transform how students connect and engage with their campus communities across the Netherlands and beyond.\n\nThe vibrant atmosphere of university life, with its diverse student body and countless opportunities for connection, inspired us to create a platform that makes these interactions more accessible and meaningful for everyone.'
    },
    detailImage2: '/assets/slide3.png',
    detailImage2Description: 'Overview of key features and design concepts',
      designProcess: {
        introduction: 'The development of Campus Connext followed a rigorous <span class="design-process-tooltip-group relative inline-block"><em class="cursor-help">Double Diamond</em><span class="design-process-image-tooltip"><img src="/assets/licensed-image.jpeg" alt="Double Diamond Model" /></span></span> framework, balancing expansive exploration with focused execution. We didn\'t just want to build another student app; we aimed to solve the <span class="design-process-tooltip-group relative inline-block"><em class="cursor-help">systemic fragmentation</em><span class="design-process-tooltip">Universities across the Netherlands use a variety of platforms<br/>where data is scattered, making it difficult for students<br/>and teachers to navigate and find the relevant information they need</span></span> of the university experience.<br/><br/>Working in an iterative Scrum environment, I led the design of the MVP through high-velocity sprints. This agile methodology allowed for constant feedback loops between research and development, ensuring that every feature—from the QR-driven networking to the unified information hub—was both technically feasible and deeply desired by users. By prioritizing a \'polish-as-we-go\' philosophy, we moved beyond a basic prototype to deliver a meticulously finished product that meets the high aesthetic and functional standards of today\'s digital-native students.'
      }
  },
  {
    title: 'LLO Caribbean',
    description: 'Educational platform for Dutch & Caribbean Universities',
    image: '/assets/llo-cover.png',
    url: '#',
    slug: 'llo-caribbean',
    fullDescription: 'LLO Caribbean is a collaborative educational platform designed to foster lifelong learning and professional development across the Dutch Caribbean and the Netherlands. By uniting leading academic institutions, the project provides a centralized hub for accessible, high-quality courses and training programs.',
    about: 'In a strategic partnership with The Hague University of Applied Sciences, Utrecht University, the University of Curaçao, and the University of Aruba, we were commissioned to design and develop a comprehensive digital ecosystem for regional education. Our objective was to create a unified "Lifelong Learning" (LLO) portal that bridges the geographical gap between the Netherlands and the Caribbean.<br /><br />The resulting platform serves as a sophisticated marketplace and management system where these four institutions can seamlessly publish, manage, and track professional courses.<br /><br />Beyond a simple directory, the solution provides a streamlined application pipeline for users, integrated search and comparison tools, and a robust backend designed to handle cross-institutional data. This digital infrastructure empowers the region by making high-level academic and professional training more accessible than ever before.',
    aboutImage: '/assets/Screenshot 2025-12-31 at 01.21.59.png',
    aboutImageDescription: 'LLO Caribbean Homepage - Hero Section',
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
    title: 'E-Commerce Platform',
    description: 'Modern shopping experience with seamless checkout',
    image: '/ecommerce-platform.png',
    url: '#',
    slug: 'ecommerce-platform',
    fullDescription: 'Modern shopping experience with seamless checkout and user-friendly interface.',
    about: 'A full-featured e-commerce platform designed to provide the best shopping experience.',
    author: 'Max Mencl',
    role: '2024',
    projectUrl: '#'
  },
  {
    title: 'Design System',
    description: 'Comprehensive component library and guidelines',
    image: '/design-system.png',
    url: '#',
    slug: 'design-system',
    fullDescription: 'Comprehensive component library and design guidelines for consistent UI development.',
    about: 'A complete design system that ensures consistency across all digital products.',
    author: 'Max Mencl',
    role: '2024',
    projectUrl: '#'
  }
]

export function getProjectBySlug(slug: string): Project | undefined {
  return pinnedProjects.find(project => project.slug === slug)
}

