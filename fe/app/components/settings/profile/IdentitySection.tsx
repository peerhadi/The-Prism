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
  user: any;
  formik: any;
}) {
  return (
    <section className="mt-10 rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10">
          <User className="h-5 w-5 text-cyan-400" />
        </div>

        <div>
          <p className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
            Identity System
          </p>
          <h2 className="mt-1 text-2xl font-black">User Identity</h2>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
        <ProfileImagePicker
          id={user.id}
          profileImageUrl={user.profileImageUrl}
        />

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-xs font-black tracking-[0.2em] text-white/40 uppercase">
              Username
            </label>
            <Input
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              className="h-12 rounded-xl border-white/10 bg-black/30"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-black tracking-[0.2em] text-white/40 uppercase">
              Email
            </label>
            <Input
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="h-12 rounded-xl border-white/10 bg-black/30"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-black tracking-[0.2em] text-white/40 uppercase">
              Bio
            </label>

            <Textarea
              name="bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
              className="min-h-[120px] rounded-xl border-white/10 bg-black/30"
            />
          </div>

          <div className="flex w-full justify-end">
            <button
              type="submit"
              className="w-[150px] rounded-xl bg-cyan-500 p-2 text-black hover:bg-cyan-400"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
