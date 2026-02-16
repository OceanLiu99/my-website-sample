"use client"

import { useState, useEffect, useCallback } from "react"
import { Send, Star, Clock } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface FeedbackItem {
  id: string
  name: string
  message: string
  rating: number
  created_at: string
}

function StarRating({
  value,
  onChange,
  readonly = false,
}: {
  value: number
  onChange?: (val: number) => void
  readonly?: boolean
}) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex items-center gap-1" role="group" aria-label={`Rating: ${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          className={`transition-transform ${readonly ? "cursor-default" : "cursor-pointer hover:scale-110"}`}
          aria-label={`${star} star${star !== 1 ? "s" : ""}`}
        >
          <Star
            className={`h-5 w-5 transition-colors ${
              star <= (hovered || value)
                ? "fill-accent text-accent"
                : "fill-none text-muted-foreground/40"
            }`}
          />
        </button>
      ))}
    </div>
  )
}

function FeedbackCard({ item }: { item: FeedbackItem }) {
  const date = new Date(item.created_at)
  const timeAgo = getTimeAgo(date)

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
            {item.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{item.name}</p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {timeAgo}
            </div>
          </div>
        </div>
        <StarRating value={item.rating} readonly />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {item.message}
      </p>
    </div>
  )
}

function getTimeAgo(date: Date): string {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return "just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export function Feedback() {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([])
  const [formData, setFormData] = useState({ name: "", message: "" })
  const [rating, setRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const fetchFeedback = useCallback(async () => {
    const { data, error: fetchError } = await supabase
      .from("feedback")
      .select("*")
      .order("created_at", { ascending: false })

    if (fetchError) {
      setError("Failed to load feedback.")
      return
    }
    if (data) {
      setFeedbackList(data)
    }
  }, [supabase])

  useEffect(() => {
    fetchFeedback()
  }, [fetchFeedback])

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel("feedback-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "feedback" },
        (payload) => {
          const newFeedback = payload.new as FeedbackItem
          setFeedbackList((prev) => {
            // Avoid duplicates
            if (prev.some((f) => f.id === newFeedback.id)) return prev
            return [newFeedback, ...prev]
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (rating === 0) {
      setError("Please select a rating.")
      return
    }

    setIsSubmitting(true)

    const { error: insertError } = await supabase.from("feedback").insert({
      name: formData.name,
      message: formData.message,
      rating,
    })

    setIsSubmitting(false)

    if (insertError) {
      setError("Failed to submit feedback. Please try again.")
      return
    }

    setFormData({ name: "", message: "" })
    setRating(0)
    setSubmitSuccess(true)
    setTimeout(() => setSubmitSuccess(false), 3000)
  }

  return (
    <section id="feedback" className="bg-muted/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
            Share your thoughts
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
                htmlFor="feedback-name"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Name
              </label>
              <input
                id="feedback-name"
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
                htmlFor="feedback-message"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Feedback Message
              </label>
              <textarea
                id="feedback-message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                placeholder="Share your feedback..."
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-foreground">
                Rating
              </p>
              <StarRating value={rating} onChange={setRating} />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            {submitSuccess && (
              <p className="text-sm font-medium text-accent">
                Thank you for your feedback!
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
              <Send className="h-4 w-4" />
            </button>
          </form>

          {/* Stats sidebar */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-heading text-lg font-semibold text-foreground">
                Feedback Summary
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Responses</span>
                  <span className="font-semibold text-foreground">
                    {feedbackList.length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Average Rating</span>
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="font-semibold text-foreground">
                      {feedbackList.length > 0
                        ? (
                            feedbackList.reduce((sum, f) => sum + f.rating, 0) /
                            feedbackList.length
                          ).toFixed(1)
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Feedback updates in real-time
            </p>
          </div>
        </div>

        {/* Feedback list */}
        {feedbackList.length > 0 && (
          <div className="mt-16">
            <h3 className="mb-6 font-heading text-xl font-semibold text-foreground">
              Recent Feedback
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {feedbackList.map((item) => (
                <FeedbackCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
