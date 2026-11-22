export const profile = {
  name: "Mike Cho",
  title: "Full-Stack Software Engineer",
  location: "Edmonton, Alberta",
  introduction:
    "I build and modernize enterprise software that teams can rely on—from full-stack applications and REST APIs to content migration solutions and automated release pipelines. I bring hands-on experience across the full development lifecycle, with a focus on maintainable systems, secure integrations, and dependable delivery.",
  summary:
    "Results-driven full-stack engineer with 4+ years of experience building and modernizing enterprise applications. I take end-to-end ownership, solve complex technical problems, and work closely with stakeholders to deliver reliable software.",
  resumePath: "/resume.pdf",
  email: "thisismikewonhyukcho@gmail.com",
  githubUrl: "https://github.com/zzangzwh1",
  linkedInUrl: "https://www.linkedin.com/in/wonhyuk-cho-362502239/",
} as const;

export const projects = [
  {
    id: "ai-development-harness",
    name: "AI Development Harness",
    category: "AI Engineering & Developer Automation",

    description:
      "Designed and developed a repository-aware AI engineering harness powered by GitHub Copilot and Azure DevOps MCP integration. Orchestrates AI-assisted development workflows, from work-item analysis and codebase exploration to implementation, verification, and pull-request preparation.",

    technologies: [
      "GitHub Copilot",
      "Azure DevOps",
      "Model Context Protocol (MCP)",
      "AI Agent Orchestration",
      "C# / .NET",
      "GitHub",
      "CI/CD",
    ],

    problem:
      "Enterprise development workflows required significant manual effort to interpret work items, understand legacy codebases, trace dependencies, implement changes, and prepare pull requests.",

    contribution:
      "Architected and implemented a modular AI harness with repository-specific context, coding instructions, task workflows, and verification rules. Integrated Azure DevOps MCP to connect work items with source-code context and guide AI agents through development tasks.",

    architecture:
      "A layered architecture combining repository knowledge, engineering rules, task-specific workflows, and verification gates. MCP provides Azure DevOps work-item context, while GitHub Copilot agents analyze dependencies, plan changes, assist implementation, and prepare pull requests.",

    challenge:
      "Ensuring reliable AI-generated changes across complex legacy .NET applications, shared libraries, and database dependencies while minimizing hallucinations, preserving existing behavior, and maintaining security and code quality.",

    outcome:
      "Achieved over 90% reported workflow accuracy and reduced development time by more than 70% through AI-assisted engineering automation.",

    link: null,
  },
  {
    id: "roya-events",
    name: "Roya Events & Adventures",
    category: "Full-Stack Web Application",

    description:
      "Designed and developed a client-focused event and adventure management platform, integrating event ticketing, adventure reservations, secure payments, user authentication, and administrative management into a unified web application.",

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "Prisma ORM",
      "PostgreSQL",
      "Supabase Auth",
      "Stripe API",
    ],

    problem:
      "The client needed a centralized platform to streamline event discovery, ticket sales, adventure bookings, customer inquiries, and administrative operations while reducing reliance on manual processes.",

    contribution:
      "Designed the relational database schema and implemented full-stack features, including RESTful API endpoints, service-layer business logic, booking workflows, authentication, role-based access control, and Stripe payment integration.",

    architecture:
      "Built a modular, feature-based Next.js application using React and TypeScript, with REST API routes, reusable service layers, Prisma ORM for PostgreSQL data access, Supabase for authentication, and Stripe for payment processing.",

    challenge:
      "Designed and integrated multiple booking and ticketing workflows while maintaining data integrity, managing availability, securing payment transactions, and enforcing role-based authorization across customer and admin interfaces.",

    outcome:
      "Built a centralized platform for managing events, adventures, bookings, ticket sales, and customer requests, with a maintainable architecture designed to support future enhancements.",

    link: null,
  },
  {
    id: "gym-tracker",
    name: "Gym Workout Tracker",
    category: "Full-stack fitness platform",
    description:
      "A personalized workout tracking platform that turns daily training into clear, actionable progress. Log exercises, sets, reps, and weights, then explore performance trends through a dashboard with daily, monthly, and yearly views.",
    technologies: [
      "ASP.NET Core 8",
      "Angular 17",
      "TypeScript",
      "SQL Server",
      "Entity Framework",
    ],
    problem:
      "Make it easier to stay consistent with training, track workout details, and see how performance develops over time.",
    contribution:
      "Built a full-stack fitness platform with workout logging and a progress dashboard for reviewing training activity and performance.",
    architecture:
      "An Angular and TypeScript frontend communicates with an ASP.NET Core API. Entity Framework handles data access to SQL Server.",
    challenge:
      "Organize workout and exercise data so users can quickly log training and compare performance across different time periods.",
    outcome:
      "Delivered a centralized workout tracker that helps users review their training history, monitor performance trends, and stay focused on consistent progress.",
    link: null,
  },
  {
    id: "restaurant-inventory",
    name: "Restaurant Inventory and Ordering System",
    category: "Full-stack operations application",
    description:
      "A restaurant inventory platform built for a private golf club to simplify biweekly inventory reporting, track supplier orders, and record ingredient usage during food preparation.",
    technologies: [
      "ASP.NET Core 8",
      "Entity Framework",
      "SQL Server",
      "JavaScript",
    ],
    problem:
      "Biweekly inventory reporting and order tracking took the chef at least 20 hours to complete, while ingredient usage during food preparation was difficult to monitor.",
    contribution:
      "Designed and built an inventory management application tailored to the club’s workflow. Added invoice creation, order tracking, and a way for cooks to record the ingredients they used while preparing food.",
    architecture:
      "An ASP.NET Core application uses Entity Framework to manage inventory, order, invoice, and usage records in SQL Server, with a JavaScript interface for day-to-day tasks.",
    challenge:
      "Translate the club’s inventory and food preparation workflows into a system that made ordering, reporting, and ingredient usage easier to track.",
    outcome:
      "Reduced the chef’s biweekly inventory reporting and management time from at least 20 hours to about 2 hours—a reported 90% reduction—while giving the kitchen clearer visibility into orders and ingredient usage.",
    link: null,
  },
] as const;

export const experience = [
  {
    company: "CGI",
    role: "Software Engineer",
    dates: "January 2024 – Present",
    highlights: [
      "Develop and support enterprise applications for Government of Alberta Advanced Education, including Learner Registry, Stakeholder Registry, Provincial Education Directory, and Security Identity and Access Management System, using C# and .NET Framework.",
      "Work across authentication and single sign-on flows using SAML 2.0, OpenID Connect, and Windows Authentication, integrating with Microsoft Entra ID and ADFS and working with JWTs and SAML assertions.",
      "Apply role-based and claims-based authorization to protect application features and APIs; use Active Directory and LDAP for enterprise user and group information.",
      "Maintain application data and persistence with SQL Server, Entity Framework, and ADO.NET, supporting user, role, permission, and audit-related workflows.",
      "Contribute to application modernization by upgrading .NET Core 3.1 applications to .NET 8 and Angular 5 applications to Angular 18.",
      "Support enterprise application hosting on IIS and Windows Server, with secure communication and identity practices involving TLS, X.509 certificates, and MFA.",
      "Own changes from requirements analysis and solution design through implementation, testing, release, deployment, and production support; coordinate with client stakeholders, QA, business, and operations teams.",
      "Build and maintain CI/CD pipelines with Azure DevOps, GitHub Actions, and BuildMaster to automate builds, release packaging, and deployments and improve release consistency.",
      "Troubleshoot complex production issues across frontend, backend, REST APIs, authentication, and database layers, coordinating fixes and deployment readiness with QA, business, and operations stakeholders.",
    ],
  },
  {
    company: "Cadence Solution",
    role: "Software Developer",
    dates: "June 2022 – July 2023",
    highlights: [
      "Led end-to-end development of a .NET content migration tool for OpenText Content Server and SharePoint.",
      "Used REST APIs and Microsoft Graph to automate content and metadata migration, synchronization, and validation for 10+ consumers.",
    ],
  },
  {
    company: "KH Software",
    role: "Full-Stack Developer Intern",
    dates: "January 2021 – September 2021",
    highlights: [
      "Developed React application features and CRUD workflows, integrating with Java Spring Boot REST APIs.",
      "Worked with a business analyst and senior engineer to clarify requirements and deliver maintainable changes.",
    ],
  },
] as const;

export const skillGroups = [
  {
    name: "Languages",
    skills: ["C#", "Java", "JavaScript", "TypeScript", "SQL"],
  },
  {
    name: "Backend",
    skills: [
      "ASP.NET Core",
      ".NET Framework",
      "ASP.NET MVC",
      "REST APIs",
      "Spring Boot",
      "Node.js",
    ],
  },
  {
    name: "Frontend",
    skills: [
      "Angular",
      "React",
      "Next.js",
      "jQuery",
      "HTML",
      "CSS",
      "Bootstrap",
    ],
  },
  {
    name: "Data",
    skills: [
      "Microsoft SQL Server",
      "PostgreSQL",
      "Oracle",
      "MySQL",
      "Entity Framework",
      "ADO.NET",
    ],
  },
  {
    name: "Delivery & platforms",
    skills: [
      "Azure DevOps",
      "GitHub Actions",
      "BuildMaster",
      "Git",
      "Fiddler",
      "SharePoint",
      "OpenText Content Server",
    ],
  },
  {
    name: "Cloud & AI",
    skills: [
      "Azure",
      "GitHub Copilot",
      "Builiding AI-Harness",
      "Azure DevOps MCP",
      "AI Agent Orchestration",
    ],
  },
] as const;

export const education = [
  {
    institution: "Northern Alberta Institute of Technology (NAIT)",
    credential: "Bachelor of Information Systems, Honors",
    dates: "September 2023 – December 2026",
    detail: "Graduated with Honors | GPA: 3.97 / 4.0",
  },
  {
    institution: "Northern Alberta Institute of Technology (NAIT)",
    credential: "Computer Engineering Technology Diploma, Honors",
    dates: "September 2019 – May 2022",
    detail: "Graduated with Honors | GPA: 3.8 / 4.0",
  },
] as const;

export const certifications = [
  "GitHub Copilot Certification (GH-300)",
  "Microsoft Azure AI Fundamentals",
] as const;
