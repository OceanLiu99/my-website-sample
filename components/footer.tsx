import { Github, Linkedin, Mail } from "lucide-react"

const socialLinks = [
  { href: "mailto:yuyang@example.com", icon: Mail, label: "Email" },
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {"\u00A9"} {new Date().getFullYear()} Yuyang Liu. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              aria-label={link.label}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-accent"
            >
              <link.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
