export const projects = [
  // FEATURED PROJECT 1: Zuvo
  {
    slug: "zuvo",
    title: "Zuvo - Distributed Microservices Platform",
    oneLiner: "Event-driven distributed dispatch and inventory platform built across 8 services.",
    problem: "TODO",
    myRole: "TODO",
    stack: ["Node.js", "TypeScript", "Redis Streams", "MongoDB", "Docker", "OpenTelemetry"],
    category: "Distributed Systems",
    metrics: [{ label: "Architecture", value: "8 Microservices" }],
    hardestProblem: "TODO",
    architectureImage: null,
    architectureMermaid: `flowchart TD
    Client[Client Request] --> Gateway[API Gateway]
    Gateway --> Auth[Auth Service]
    Gateway --> Blog[Blog Service]
    Gateway --> Media[Media Service]
    Gateway --> Interactions[Interactions Service]
    Gateway --> Realtime[Real-time Service]
    Interactions --> Streams[(Redis Streams)]
    Streams --> Worker[Worker Service]
    Streams --> FeedSearch[Feed & Search Service]
    Worker --> DB[(MongoDB)]
    FeedSearch --> DB`,
    liveUrl: null,
    repoUrl: "https://github.com/PARASMANI-KHUNTE/Zuvo",
    demoVideoUrl: null,
    featured: true
  },
  // FEATURED PROJECT 2: Kimiko
  {
    slug: "kimiko",
    title: "Kimiko - Local Multimodal Vision & RAG Pipeline",
    oneLiner: "Local-first multimodal vision and RAG data pipeline with zero-cloud execution.",
    problem: "TODO",
    myRole: "TODO",
    stack: ["Python", "FastAPI", "Celery", "Redis", "PostgreSQL", "Qdrant", "Ollama", "Docker"],
    category: "Data and AI",
    metrics: [],
    hardestProblem: "TODO",
    architectureImage: null,
    architectureMermaid: `flowchart TD
    Client[Client Query / Image] --> API[FastAPI Service]
    API --> TaskQueue[(Celery / Redis Queue)]
    TaskQueue --> Worker[Local Worker]
    Worker --> Vision[Qwen2-VL Model]
    Worker --> LocalLLM[Ollama Local GPU]
    API --> VectorDB[(Qdrant Vector DB)]
    API --> RelationalDB[(PostgreSQL)]`,
    liveUrl: null,
    repoUrl: null,
    demoVideoUrl: null,
    featured: true
  },
  // FEATURED PROJECT 3: MyCircle
  {
    slug: "mycircle",
    title: "MyCircle - Hyperlocal Exchange Platform",
    oneLiner: "Hyperlocal exchange platform for localized resource sharing and real-time interaction.",
    problem: "TODO",
    myRole: "TODO",
    stack: ["React", "React Native", "Node.js", "Express", "MongoDB", "Socket.IO", "Redis", "BullMQ"],
    category: "Full-Stack",
    metrics: [],
    hardestProblem: "TODO",
    architectureImage: null,
    architectureMermaid: `flowchart TD
    Web[React Web Client] --> Server[Node.js / Express API]
    Mobile[React Native Mobile] --> Server
    Server --> Realtime[Socket.IO Gateway]
    Server --> AsyncQueue[(Redis / BullMQ)]
    Server --> Database[(MongoDB)]`,
    liveUrl: "https://mycircle-9gm5.onrender.com",
    repoUrl: "https://github.com/PARASMANI-KHUNTE/MyCircle",
    demoVideoUrl: null,
    featured: true
  },
  // FEATURED PROJECT 4: Whiteboard.io
  {
    slug: "whiteboard",
    title: "Whiteboard.io - Collaborative AI Canvas",
    oneLiner: "Real-time collaborative whiteboard enabling multi-user live sketching with AI-assisted interactions.",
    problem: "TODO",
    myRole: "TODO",
    stack: ["React", "Node.js", "Express", "Socket.io", "Tailwind CSS"],
    category: "Real-Time Systems",
    metrics: [],
    hardestProblem: "TODO",
    architectureImage: null,
    architectureMermaid: `flowchart LR
    User1[User 1 Canvas] <--> WebSockets[Socket.io Server]
    User2[User 2 Canvas] <--> WebSockets
    WebSockets <--> Backend[Node.js Express Engine]
    Backend --> AIModule[AI Interaction Engine]`,
    liveUrl: "https://whiteboard-io-1.onrender.com",
    repoUrl: "https://github.com/PARASMANI-KHUNTE/Whiteboard.io",
    demoVideoUrl: null,
    featured: true
  },

  // MORE PROJECTS (featured: false - only those with liveUrl or repoUrl)
  {
    slug: "gravitor",
    title: "Gravitor - Privacy-First Local AI Coding IDE",
    oneLiner: "VS Code extension providing AI-powered code completion using locally hosted Ollama models.",
    stack: ["TypeScript", "Node.js", "Ollama", "Vector Search"],
    category: "Developer Tools",
    liveUrl: null,
    repoUrl: "https://github.com/PARASMANI-KHUNTE/Gravitor",
    featured: false
  },
  {
    slug: "synapse",
    title: "SYNAPSE - Local Multimodal AI Assistant",
    oneLiner: "Local multimodal AI assistant using local model routing, FAISS RAG, and multi-modal speech/vision.",
    stack: ["Python", "Ollama", "FAISS", "RAG"],
    category: "Data and AI",
    liveUrl: null,
    repoUrl: "https://github.com/PARASMANI-KHUNTE/LLMContext",
    featured: false
  },
  {
    slug: "nearme",
    title: "NearMe - Location-Based Social Networking",
    oneLiner: "Location-based proximity networking with geospatial queries, live updates, and Redis caching.",
    stack: ["TypeScript", "Node.js", "React Native", "MongoDB", "Redis"],
    category: "Mobile Apps",
    liveUrl: null,
    repoUrl: "https://github.com/PARASMANI-KHUNTE/NearMe",
    featured: false
  },
  {
    slug: "vaani",
    title: "Vaani - Real-Time Messaging Platform",
    oneLiner: "Real-time messaging platform supporting 1-to-1/group chats, presence, and media sharing.",
    stack: ["React", "Node.js", "Express", "Socket.io", "MongoDB"],
    category: "Full-Stack",
    liveUrl: "https://vaani-11o3.onrender.com",
    repoUrl: "https://github.com/PARASMANI-KHUNTE/Vaani",
    featured: false
  },
  {
    slug: "campuscompare",
    title: "CampusCompare",
    oneLiner: "Platform helping students discover, evaluate, and compare higher education institutions.",
    stack: ["React", "Node.js", "PostgreSQL", "Prisma"],
    category: "Full-Stack",
    liveUrl: "https://campuscompare-app.onrender.com",
    repoUrl: "https://github.com/PARASMANI-KHUNTE/CampusCompare",
    featured: false
  },
  {
    slug: "admin-dashboard",
    title: "Admin Dashboard",
    oneLiner: "Management dashboard for operations with JWT authentication and responsive controls.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    category: "Full-Stack",
    liveUrl: null,
    repoUrl: "https://github.com/PARASMANI-KHUNTE/Admin-Dashboard",
    featured: false
  },
  {
    slug: "warehouse-management",
    title: "Warehouse Management System",
    oneLiner: "Inventory tracking and order management system with data visualization and CSV workflows.",
    stack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    category: "Full-Stack",
    liveUrl: null,
    repoUrl: "https://github.com/PARASMANI-KHUNTE/Warehouse-Management-system",
    featured: false
  },
  {
    slug: "orgsync",
    title: "OrgSync",
    oneLiner: "Organization synchronization and management platform streamlining team collaboration.",
    stack: ["JavaScript", "Node.js", "Express", "React", "MongoDB"],
    category: "Full-Stack",
    liveUrl: null,
    repoUrl: "https://github.com/PARASMANI-KHUNTE/orgSync",
    featured: false
  },
  {
    slug: "cafeautomation",
    title: "CafeAutomation",
    oneLiner: "Order management and inventory tracking system with live status updates.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    category: "Full-Stack",
    liveUrl: null,
    repoUrl: "https://github.com/PARASMANI-KHUNTE/CafeAutomation",
    featured: false
  },
  {
    slug: "chatapplication",
    title: "Chat Application",
    oneLiner: "Real-time chat application with Google OAuth and socket-based messaging.",
    stack: ["React", "Node.js", "Socket.io"],
    category: "Full-Stack",
    liveUrl: null,
    repoUrl: "https://github.com/PARASMANI-KHUNTE/ChatApplication",
    featured: false
  },
  {
    slug: "facetrack",
    title: "FaceTrack",
    oneLiner: "Multi-branch organization management system with face verification capabilities.",
    stack: ["React", "Express", "MongoDB", "Machine Learning"],
    category: "Data and AI",
    liveUrl: null,
    repoUrl: "https://github.com/PARASMANI-KHUNTE/FaceTrack",
    featured: false
  },
  {
    slug: "fras",
    title: "FRAS",
    oneLiner: "Facial recognition attendance system with automated verification.",
    stack: ["Python", "OpenCV", "Flask"],
    category: "Data and AI",
    liveUrl: null,
    repoUrl: "https://github.com/PARASMANI-KHUNTE/FRAS",
    featured: false
  },
  {
    slug: "hrms",
    title: "HRMS",
    oneLiner: "Human resource management system for employee records, payroll, and hierarchy.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    category: "Full-Stack",
    liveUrl: null,
    repoUrl: "https://github.com/PARASMANI-KHUNTE/HRMS",
    featured: false
  },
  {
    slug: "resume-builder",
    title: "Resume Builder",
    oneLiner: "Resume creation tool with custom formatting and template generation.",
    stack: ["React", "JavaScript", "Tailwind CSS"],
    category: "Developer Tools",
    liveUrl: null,
    repoUrl: "https://github.com/PARASMANI-KHUNTE/Resume-Builder",
    featured: false
  }
];

export const featuredProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured && (p.liveUrl || p.repoUrl));
