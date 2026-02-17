import Image from "next/image"
import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "Spatial Analysis Agent",
    description:
      "An AI-powered spatial analysis tool that leverages geospatial data and machine learning to deliver actionable location-based insights.",
    image: "/images/project-spatial.jpg",
  },
  {
    title: "Restaurant Intelligence",
    description:
      "A smart analytics platform for restaurants, combining review sentiment analysis, ratings trends, and business intelligence to drive better decisions.",
    image: "/images/project-restaurant.jpg",
  },
  {
    title: "Smart Eat",
    description:
      "An intelligent nutrition and meal recommendation app that uses AI to help users make healthier food choices based on their personal goals.",
    image: "/images/project-smarteat.jpg",
  },
]

export function Projects() {
  return (
    <section id="projects" className="bg-muted/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
            My recent work
          </p>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            My Projects
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-accent" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/10 transition-opacity group-hover:opacity-0" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading text-lg font-bold text-foreground">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <button className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110">
                  View Project
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
