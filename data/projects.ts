export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: string;
  caseStudy: {
    intro: string;
    challenge: string;
    solution: string;
    process: string;
    outcome: string;
    lessons: string[];
    techStack: string[];
    features: string[];
  };
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'ExamEdge',
    slug: 'examedge',
    tagline: 'AI-Powered Educational Resource Generator',
    description: 'A modern educational platform that generates course materials and resources in seconds using AI, with downloadable PDFs and real-time results.',
    image: '/projects/examedge.png',
    tags: ['Next.js', 'AI', 'Education', 'TypeScript'],
    liveUrl: 'https://examedge.vercel.app',
    featured: true,
    year: '2024',
    caseStudy: {
      intro: 'ExamEdge was born from a simple observation: educators spend countless hours creating course materials, study guides, and exam resources. What if AI could handle the heavy lifting while maintaining quality and accuracy?',
      challenge: 'Traditional educational resource creation is time-consuming and repetitive. Teachers need quick access to quality materials that are accurate, well-formatted, and easily shareable. The challenge was building a system that could generate educational content rapidly while ensuring accuracy and providing seamless export options.',
      solution: 'I built ExamEdge as a streamlined web application that leverages AI to generate educational resources in seconds. The platform focuses on three core pillars: speed (generate resources instantly), accessibility (downloadable PDFs for offline use), and accuracy (real-time validation and quality checks).',
      process: 'The development process started with understanding educator workflows and pain points. I designed a clean, intuitive interface that removes friction from the content generation process. The AI integration was carefully tuned to produce educational content that matches academic standards. The PDF generation system ensures materials are print-ready and professionally formatted.',
      outcome: 'ExamEdge delivers on its promise of quick and easy resource generation. Educators can now create comprehensive course materials in seconds instead of hours. The downloadable PDF feature has been particularly well-received, allowing teachers to share materials with students who may have limited internet access.',
      lessons: [
        'User experience is critical in educational tools - every second saved matters to busy educators',
        'AI-generated content needs human-centric validation to ensure quality',
        'Offline accessibility (PDFs) is essential for educational equity',
        'Simple, focused features often outperform feature-bloated alternatives'
      ],
      techStack: ['Next.js', 'TypeScript', 'AI/ML APIs', 'PDF Generation', 'Tailwind CSS', 'Vercel'],
      features: [
        'Instant AI-powered resource generation',
        'Downloadable PDF exports',
        'Real-time content validation',
        'Clean, distraction-free interface',
        'Mobile-responsive design',
        'Fast performance with edge deployment'
      ]
    }
  },
  {
    id: '2',
    title: 'Veneer',
    slug: 'veneer',
    tagline: 'Beautiful Digital Bio Cards for Modern Professionals',
    description: 'Create stunning digital business cards in minutes. Share your social links, contact info, and professional presence with a customizable bio card that stands out.',
    image: '/projects/veneer.png',
    tags: ['Next.js', 'Design', 'SaaS', 'TypeScript'],
    liveUrl: 'https://veneer01.vercel.app',
    featured: true,
    year: '2024',
    caseStudy: {
      intro: 'In a world where first impressions happen online, Veneer reimagines the digital business card. It\'s not just about sharing contact information—it\'s about creating a memorable, beautiful representation of who you are professionally.',
      challenge: 'Traditional business cards are static and limited. Digital alternatives often feel cluttered or unprofessional. The challenge was creating a platform that makes it effortless to build a stunning, shareable digital presence that feels personal yet professional, without requiring design skills or technical knowledge.',
      solution: 'Veneer provides a streamlined platform where anyone can create a beautiful bio card in minutes. The focus is on simplicity and aesthetics—users input their information, choose from elegant templates, and get a shareable link instantly. The design system emphasizes minimalism and readability, ensuring every card looks professional.',
      process: 'I started by studying how professionals share their information online and identified common pain points: cluttered link-in-bio pages, unprofessional designs, and complicated setup processes. Veneer was designed to solve these issues with a focus on three principles: beautiful by default, simple to create, and easy to share. The design system draws inspiration from modern UI trends while maintaining timeless elegance.',
      outcome: 'Veneer has enabled thousands of creators, professionals, and businesses to share their story with style. Users consistently praise the platform\'s ease of use and the professional appearance of their bio cards. The platform has become particularly popular among designers, developers, and creative professionals who appreciate the attention to detail.',
      lessons: [
        'Design quality can be a feature—users choose Veneer because it looks good',
        'Simplicity in onboarding drives adoption',
        'Customization should enhance, not complicate',
        'A focused product that does one thing exceptionally well beats a Swiss Army knife approach'
      ],
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel', 'MongoDB'],
      features: [
        'Drag-and-drop card builder',
        'Multiple elegant templates',
        'Social media integration',
        'Custom domains support',
        'Analytics dashboard',
        'QR code generation',
        'Mobile-optimized cards',
        'One-click sharing'
      ]
    }
  },
  {
    id: '3',
    title: 'Scribe API',
    slug: 'scribe-api',
    tagline: 'Production-Ready Social Blogging Platform API',
    description: 'A powerful REST API for building social blogging platforms where users can publish articles, follow authors, and engage with content. Built with Node.js, TypeScript, and MongoDB.',
    image: '/projects/scribe.png',
    tags: ['Node.js', 'TypeScript', 'MongoDB', 'REST API'],
    githubUrl: 'https://github.com/thatcreativetayo/scribe-api',
    featured: true,
    year: '2024',
    caseStudy: {
      intro: 'Scribe API is a production-grade backend system that powers social blogging platforms. Inspired by Medium\'s architecture, it provides all the essential features for building a modern content platform: authentication, article management, social interactions, and personalized feeds.',
      challenge: 'Building a scalable, secure API that handles complex social interactions while maintaining performance is challenging. The system needed to support real-time engagement (likes, comments, follows), personalized content feeds, and robust security—all while remaining maintainable and well-documented.',
      solution: 'I architected Scribe API using clean, layered architecture with clear separation of concerns. The system uses JWT for stateless authentication, implements comprehensive input validation with Zod, and leverages MongoDB\'s indexing for fast queries. Security is baked in at every layer with rate limiting, bcrypt password hashing, and Helmet middleware.',
      process: 'Development followed a methodical approach: starting with core authentication and user management, then building out article CRUD operations, and finally implementing social features. Each feature was designed with scalability in mind—database indexes for common queries, efficient pagination, and smart data population. The API documentation was built alongside the code using Swagger/OpenAPI, ensuring developers can integrate easily.',
      outcome: 'Scribe API is a fully-featured, production-ready backend that can power any social blogging platform. It includes 40+ endpoints covering authentication, profiles, articles, comments, likes, favorites, bookmarks, and personalized feeds. The comprehensive documentation and seed data make it easy for developers to get started quickly.',
      lessons: [
        'Clean architecture pays dividends in maintainability and testability',
        'Comprehensive documentation is as important as the code itself',
        'Security should be a first-class concern, not an afterthought',
        'Performance optimization through proper indexing can make or break an API',
        'Consistent response formats improve developer experience significantly'
      ],
      techStack: ['Node.js', 'TypeScript', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Zod', 'Swagger', 'Pino', 'Bcrypt'],
      features: [
        'JWT-based authentication',
        'User profiles with follow system',
        'Article CRUD with auto-generated slugs',
        'Like, favorite, and bookmark system',
        'Comment threads',
        'Personalized content feeds',
        'Tag-based categorization',
        'Full-text search',
        'Rate limiting and security headers',
        'Comprehensive Swagger documentation',
        'Database seeding for testing',
        'Efficient pagination',
        'Auto-calculated read times'
      ]
    }
  },
  {
    id: '4',
    title: 'ZeePay API',
    slug: 'zeepay-api',
    tagline: 'Event Sourcing + CQRS Banking System',
    description: 'An advanced banking/wallet system demonstrating Event Sourcing and CQRS patterns with MongoDB. Every transaction is an immutable event, enabling complete audit trails and time-travel debugging.',
    image: '/projects/zeepay.png',
    tags: ['Node.js', 'TypeScript', 'Event Sourcing', 'CQRS', 'MongoDB'],
    githubUrl: 'https://github.com/thatcreativetayo/zeepay-api',
    featured: true,
    year: '2024',
    caseStudy: {
      intro: 'ZeePay API represents a deep dive into advanced architectural patterns. Instead of traditional CRUD operations that overwrite data, ZeePay uses Event Sourcing—every state change is captured as an immutable event. Combined with CQRS (Command Query Responsibility Segregation), this creates a system that\'s auditable, scalable, and debuggable in ways traditional systems can\'t match.',
      challenge: 'Financial systems require absolute accuracy, complete audit trails, and the ability to trace every transaction. Traditional database architectures make it difficult to answer questions like "what was this account\'s balance on March 15th?" or "show me every operation that affected this account." The challenge was implementing Event Sourcing and CQRS patterns in a way that\'s both correct and performant.',
      solution: 'ZeePay stores every state change as an immutable event in an append-only event store. The current state is derived by replaying these events through an aggregate. CQRS separates write operations (commands that create events) from read operations (queries against optimized projections). This architecture provides complete audit trails, enables time-travel debugging, and scales reads independently from writes.',
      process: 'Building ZeePay required deep understanding of domain-driven design and event-driven architecture. I started with the core aggregate pattern, implementing account logic that enforces business rules. The event store was designed with MongoDB transactions to ensure atomicity. Projections (read models) are updated synchronously with event creation, maintaining consistency. Optimistic concurrency control prevents conflicts when multiple operations target the same account.',
      outcome: 'ZeePay demonstrates production-grade implementation of advanced patterns. The system can replay any account\'s entire history, provides perfect audit trails for compliance, and separates read/write concerns for scalability. The comprehensive documentation and visual diagrams make these complex patterns accessible to other developers.',
      lessons: [
        'Event Sourcing provides unparalleled auditability but adds complexity',
        'CQRS enables independent scaling of reads and writes',
        'Immutable event logs are invaluable for debugging and compliance',
        'Optimistic concurrency control is essential for distributed systems',
        'Good documentation and diagrams are critical for complex architectures',
        'MongoDB transactions enable ACID guarantees in event-sourced systems'
      ],
      techStack: ['Node.js', 'TypeScript', 'Express.js', 'MongoDB', 'Mongoose', 'Zod', 'Pino', 'Docker'],
      features: [
        'Event Sourcing with append-only event store',
        'CQRS with separate read/write models',
        'Account creation, deposits, withdrawals, transfers',
        'Optimistic concurrency control',
        'Idempotency support',
        'Event replay capability',
        'MongoDB transactions for atomicity',
        'Complete audit trail',
        'Time-travel debugging',
        'Aggregate pattern implementation',
        'Domain-driven design',
        'Comprehensive API documentation',
        'Visual architecture diagrams'
      ]
    }
  },
  {
    id: '5',
    title: 'Dex Gadgets Nigeria',
    slug: 'dex-gadgets',
    tagline: 'Modern E-Commerce Platform for Electronics',
    description: 'A full-featured e-commerce platform for buying and selling electronics and gadgets in Nigeria. Features product catalog, shopping cart, and secure checkout.',
    image: '/projects/dex.png',
    tags: ['Next.js', 'E-Commerce', 'TypeScript', 'Stripe'],
    liveUrl: 'https://dex-gadgets-nigeria.vercel.app',
    featured: false,
    year: '2024',
    caseStudy: {
      intro: 'Dex Gadgets Nigeria brings modern e-commerce to the Nigerian electronics market. The platform makes it easy for customers to browse, compare, and purchase electronics while providing sellers with tools to manage inventory and orders efficiently.',
      challenge: 'E-commerce in Nigeria faces unique challenges: payment integration complexities, logistics coordination, and building trust with customers. The platform needed to handle product catalogs with multiple variants, manage inventory, process payments securely, and provide a smooth shopping experience across devices.',
      solution: 'I built Dex Gadgets as a full-stack e-commerce platform with a focus on performance and user experience. The product catalog supports multiple categories, variants, and filtering. The shopping cart persists across sessions, and the checkout process is streamlined for quick purchases. Payment integration supports multiple methods relevant to the Nigerian market.',
      process: 'Development started with understanding the Nigerian e-commerce landscape and customer expectations. I designed a mobile-first interface since most users shop on phones. The product management system was built to handle complex inventory scenarios. Special attention was paid to image optimization and loading performance, critical for users on slower connections.',
      outcome: 'Dex Gadgets provides a reliable platform for electronics commerce in Nigeria. The responsive design works seamlessly across devices, the checkout process is intuitive, and the admin panel gives sellers full control over their inventory. Performance optimizations ensure fast loading even on slower networks.',
      lessons: [
        'Mobile-first design is essential for Nigerian market',
        'Image optimization dramatically improves perceived performance',
        'Local payment methods are critical for conversion',
        'Clear product information reduces support burden',
        'Performance matters more on slower connections'
      ],
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'MongoDB', 'Vercel', 'Cloudinary'],
      features: [
        'Product catalog with categories',
        'Advanced filtering and search',
        'Shopping cart with persistence',
        'Secure checkout process',
        'Multiple payment methods',
        'Order tracking',
        'Admin dashboard',
        'Inventory management',
        'Product reviews and ratings',
        'Wishlist functionality',
        'Mobile-responsive design',
        'Image optimization'
      ]
    }
  }
];

export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectBySlug = (slug: string) => projects.find(p => p.slug === slug);
export const getAllProjects = () => projects;
