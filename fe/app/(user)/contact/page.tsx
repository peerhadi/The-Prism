"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Sparkles,
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      {/* Background grid */}
      <div
        className="pointer-events-none fixed inset-0 -z-0 opacity-70"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 75%)",
        }}
      />

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-24 lg:px-8 lg:pb-20 lg:pt-32">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--primary-border)] bg-[var(--primary-soft)] px-3 py-1.5 text-sm font-medium text-[var(--primary)]">
            <Sparkles className="h-3.5 w-3.5" />
            Get in touch
          </div>

          <h1 className="text-5xl font-semibold tracking-[-0.04em] text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
            Let’s look at the
            <span className="block text-[var(--primary)]">bigger picture.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--text-muted)]">
            Have a question about The Prism, want to share feedback, or
            interested in working with us? We’d love to hear from you.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          {/* Contact information */}
          <aside className="space-y-5">
            <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-7">
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary)]">
                <MessageSquare className="h-5 w-5" />
              </div>

              <h2 className="mb-2 text-xl font-semibold">Talk to The Prism</h2>

              <p className="text-sm leading-6 text-[var(--text-muted)]">
                Whether you spotted something we should improve or simply want
                to talk about media framing, your perspective matters.
              </p>

              <div className="my-7 h-px bg-[var(--border)]" />

              <div className="space-y-5">
                <a
                  href="mailto:hello@theprism.example"
                  className="group flex items-center gap-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-secondary)] text-[var(--text-muted)] transition-colors group-hover:bg-[var(--primary-soft)] group-hover:text-[var(--primary)]">
                    <Mail className="h-4 w-4" />
                  </span>

                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wider text-[var(--text-faint)]">
                      Email
                    </span>
                    <span className="mt-1 block text-sm text-[var(--text-secondary)] group-hover:text-[var(--primary)]">
                      hello@theprism.example
                    </span>
                  </span>
                </a>

                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-secondary)] text-[var(--text-muted)]">
                    <MapPin className="h-4 w-4" />
                  </span>

                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wider text-[var(--text-faint)]">
                      Location
                    </span>
                    <span className="mt-1 block text-sm text-[var(--text-secondary)]">
                      Independent &amp; global
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Mission card */}
            <div className="relative overflow-hidden rounded-2xl border border-[var(--primary-border)] bg-[var(--primary-subtle)] p-7">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[var(--primary-glow)] blur-3xl" />

              <div className="relative">
                <div className="mb-4 flex items-center gap-2 text-sm font-medium text-[var(--primary)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                  Why The Prism?
                </div>

                <p className="text-base leading-7 text-[var(--text-secondary)]">
                  The same event can look completely different depending on the
                  words chosen to describe it. The Prism helps you notice those
                  differences.
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[var(--primary)]">
                  Explore perspectives
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 sm:p-8 lg:p-10">
            {submitted ? (
              <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--success-soft)] text-[var(--success)]">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <h2 className="text-2xl font-semibold">Message received.</h2>

                <p className="mt-3 max-w-md leading-7 text-[var(--text-muted)]">
                  Thanks for reaching out. We’ll take a look and get back to you
                  as soon as we can.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-secondary)] px-5 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-hover)]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="mb-2 text-sm font-medium text-[var(--primary)]">
                    Contact us
                  </p>

                  <h2 className="text-2xl font-semibold tracking-tight">
                    What’s on your mind?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                    Send us a message and we’ll get back to you.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-[var(--text-secondary)]"
                      >
                        Your name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Jane Doe"
                        className="h-12 w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-4 text-sm text-[var(--text-primary)] outline-none transition-all placeholder:text-[var(--input-placeholder)] hover:bg-[var(--input-hover)] focus:border-[var(--input-focus)] focus:ring-2 focus:ring-[var(--primary-soft)]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-[var(--text-secondary)]"
                      >
                        Email address
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="jane@example.com"
                        className="h-12 w-full rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-4 text-sm text-[var(--text-primary)] outline-none transition-all placeholder:text-[var(--input-placeholder)] hover:bg-[var(--input-hover)] focus:border-[var(--input-focus)] focus:ring-2 focus:ring-[var(--primary-soft)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-medium text-[var(--text-secondary)]"
                    >
                      Subject
                    </label>

                    <select
                      id="subject"
                      name="subject"
                      defaultValue=""
                      required
                      className="h-12 w-full appearance-none rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-4 text-sm text-[var(--text-primary)] outline-none transition-all hover:bg-[var(--input-hover)] focus:border-[var(--input-focus)] focus:ring-2 focus:ring-[var(--primary-soft)]"
                    >
                      <option value="" disabled>
                        Select a subject
                      </option>
                      <option value="feedback">Feedback</option>
                      <option value="correction">Report a correction</option>
                      <option value="partnership">Partnership</option>
                      <option value="media">Media inquiry</option>
                      <option value="other">Something else</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-[var(--text-secondary)]"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={7}
                      placeholder="Tell us what's on your mind..."
                      className="w-full resize-none rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-sm leading-6 text-[var(--text-primary)] outline-none transition-all placeholder:text-[var(--input-placeholder)] hover:bg-[var(--input-hover)] focus:border-[var(--input-focus)] focus:ring-2 focus:ring-[var(--primary-soft)]"
                    />
                  </div>

                  <div className="flex flex-col gap-4 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-sm text-xs leading-5 text-[var(--text-faint)]">
                      We respect your privacy and will only use your information
                      to respond to your message.
                    </p>

                    <button
                      type="submit"
                      className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--button-primary)] px-6 text-sm font-semibold text-[var(--primary-foreground)] transition-all hover:bg-[var(--button-primary-hover)] active:bg-[var(--button-primary-active)]"
                    >
                      Send message
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Bottom statement */}
      <section className="relative z-10 border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--text-faint)]">
                The Prism
              </p>

              <p className="mt-3 max-w-xl text-xl font-medium leading-8 text-[var(--text-secondary)]">
                Not just what happened.
                <br />
                <span className="text-[var(--primary)]">
                  How it was framed.
                </span>
              </p>
            </div>

            <div className="text-sm text-[var(--text-faint)]">
              © {new Date().getFullYear()} The Prism
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
