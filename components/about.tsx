const interests = [
  { emoji: "\uD83C\uDFBE", label: "Tennis" },
  { emoji: "\uD83D\uDCF8", label: "Photography" },
  { emoji: "\u2708\uFE0F", label: "Travel" },
  { emoji: "\uD83D\uDCBB", label: "Coding" },
]

export function About() {
  return (
    <section id="about" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
            Get to know me
          </p>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            About Me
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-accent" />
        </div>

        <div className="grid items-start gap-12 md:grid-cols-2">
          {/* Bio */}
          <div className="space-y-5">
            <p className="leading-relaxed text-muted-foreground">
              {"I'm an AI enthusiast and developer who loves building intelligent applications that make a real difference in people's lives. My journey in technology has been driven by a deep curiosity about how artificial intelligence can be harnessed to solve complex challenges."}
            </p>
            <p className="leading-relaxed text-muted-foreground">
              With a strong foundation in machine learning, data science, and
              full-stack development, I enjoy turning innovative ideas into
              practical tools. Whether it{"'"}s spatial analysis, restaurant
              intelligence, or smart nutrition systems, I{"'"}m always exploring
              new frontiers in AI.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              When I{"'"}m not coding, you can find me enjoying a variety of
              hobbies that keep me inspired and energized.
            </p>
          </div>

          {/* Interests */}
          <div>
            <h3 className="mb-6 font-heading text-lg font-semibold text-foreground">
              What I Enjoy
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {interests.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="text-2xl" role="img" aria-label={item.label}>
                    {item.emoji}
                  </span>
                  <span className="font-medium text-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
