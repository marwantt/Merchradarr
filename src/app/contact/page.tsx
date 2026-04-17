"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:mayhambil@proton.me?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.open(mailtoLink, "_blank");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const labelClass = "block text-xs uppercase tracking-widest text-muted-foreground mb-2";
  const inputClass = "w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors font-mono";

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-4">
          <Link
            href="/"
            className="inline-block text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            ← Back to Home
          </Link>
          <h1 className="text-5xl title-font tracking-wide">Contact</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Questions, feedback, or partnership inquiries — we respond within 24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-12">
        {/* Sidebar info */}
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest">Response Time</p>
            <p className="text-sm text-muted-foreground">Within 24 hours on business days.</p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest">Common Topics</p>
            <ul className="text-sm text-muted-foreground space-y-1 uppercase tracking-wider text-xs">
              <li>Tool usage & tips</li>
              <li>Feature requests</li>
              <li>Bug reports</li>
              <li>Partnerships</li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest">Follow</p>
            <ul className="text-sm space-y-2">
              <li>
                <a
                  href="https://x.com/imarwant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  X / Twitter →
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/imarwant/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  Instagram →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className={labelClass}>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className={labelClass}>Subject</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select a subject</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Technical Support">Technical Support</option>
              <option value="Feature Request">Feature Request</option>
              <option value="Partnership">Partnership</option>
              <option value="Feedback">Feedback</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className={labelClass}>Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              placeholder="Tell us how we can help..."
              required
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="w-full border border-foreground px-8 py-4 text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
          >
            Send Message →
          </button>
        </form>
      </div>
    </main>
  );
}
