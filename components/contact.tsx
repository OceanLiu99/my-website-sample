"use client"

import { useState } from "react"
import { Send, Mail, Github, Linkedin } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="bg-muted/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
            {"Let's connect"}
          </p>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Feedback
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-accent" />
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-5">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-border bg-card p-8 shadow-sm lg:col-span-3"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:brightness-110"
            >
              Send Message
              <Send className="h-4 w-4" />
            </button>
          </form>

          {/* Contact info */}
          <div className="space-y-8 lg:col-span-2">
            <div>
              <h3 className="mb-3 font-heading text-lg font-semibold text-foreground">
                Get in touch
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {"Have a question or want to work together? Feel free to reach out through the form or connect with me on social media."}
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:yuyang@example.com"
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Mail className="h-5 w-5" />
                </span>
                yuyang@example.com
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Github className="h-5 w-5" />
                </span>
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Linkedin className="h-5 w-5" />
                </span>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
