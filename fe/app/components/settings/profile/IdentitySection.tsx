"use client";

import React from "react";
import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ProfileImagePicker from "@/app/(user)/components/ProfileImagePicker";

export default function IdentitySection({
  user,
  formik,
}: {
  user: { id: number; username: string; email: string; bio: string; profileImageUrl?: string };
  formik: { handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void; handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; values: { username: string; email: string; bio: string } };
}) {
  return (
    <section
      className="mt-10 rounded-[32px] border p-8 backdrop-blur-xl"
      style={{
        background: "var(--glass-bg)",
        borderColor: "var(--border)",
      }}
    >
      {/* HEADER */}
      <div className="mb-8 flex items-center gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl border"
          style={{
            borderColor: "var(--primary-border)",
            background: "var(--primary-soft)",
          }}
        >
          <User className="h-5 w-5" style={{ color: "var(--primary)" }} />
        </div>

        <div>
          <p
            className="text-[10px] font-black tracking-[0.3em] uppercase"
            style={{ color: "var(--primary)" }}
          >
            Identity System
          </p>

          <h2
            className="mt-1 text-2xl font-black"
            style={{ color: "var(--text-primary)" }}
          >
            User Identity
          </h2>
        </div>
      </div>

      {/* BODY */}
      <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
        <ProfileImagePicker
          id={user.id}
          profileImageUrl={user.profileImageUrl}
        />

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* USERNAME */}
          <div>
            <label
              className="mb-2 block text-xs font-black tracking-[0.2em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Username
            </label>

            <Input
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              className="h-12 rounded-xl"
              style={{
                background: "var(--input-bg)",
                border: "1px solid var(--input-border)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label
              className="mb-2 block text-xs font-black tracking-[0.2em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Email
            </label>

            <Input
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="h-12 rounded-xl"
              style={{
                background: "var(--input-bg)",
                border: "1px solid var(--input-border)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          {/* BIO */}
          <div>
            <label
              className="mb-2 block text-xs font-black tracking-[0.2em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Bio
            </label>

            <Textarea
              name="bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
              className="min-h-[120px] rounded-xl"
              style={{
                background: "var(--input-bg)",
                border: "1px solid var(--input-border)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          {/* SAVE BUTTON */}
          <div className="flex w-full justify-end">
            <button
              type="submit"
              className="w-[150px] rounded-xl p-2 font-semibold transition"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
