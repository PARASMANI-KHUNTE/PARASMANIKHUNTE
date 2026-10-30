export const skillGroups = [
  {
    category: "Backend",
    skills: ["Node.js", "TypeScript", "Express", "FastAPI", "PostgreSQL", "MongoDB", "Redis"]
  },
  {
    category: "Data and AI",
    skills: ["RAG", "Qdrant", "Ollama", "Celery/BullMQ"]
  },
  {
    category: "Tooling",
    skills: ["Docker", "GitHub Actions", "OpenTelemetry", "Linux"]
  }
];

export const allSkills = skillGroups.flatMap((group) => group.skills);
