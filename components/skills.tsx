const skillGroups = [
  {
    category: "Programming",
    skills: ["Python", "JavaScript", "SQL", "TypeScript"],
  },
  {
    category: "AI & Data",
    skills: ["Machine Learning", "NLP", "Streamlit", "Data Analysis"],
  },
  {
    category: "Design Tools",
    skills: ["Figma", "Photoshop", "UI/UX Design"],
  },
  {
    category: "Dev Tools",
    skills: ["Git", "VS Code", "Docker", "APIs"],
  },
]

export function Skills() {
  return (
    <section id="skills" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
            What I work with
          </p>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            {"Skills & Technologies"}
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-accent" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-accent">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-muted px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
