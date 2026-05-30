"use client";

import { useState } from "react";
import Snackbar from "@/app/components/Snackbar";
import { User, Mail, Lock, Image, FileText } from "lucide-react";
import { redirect } from "next/navigation";
import Breadcrumbs from "@/app/components/Breadcrumb";

function Field({ label, icon: Icon, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-cyan-300 text-xs tracking-[0.3em] uppercase">
        {Icon && <Icon size={14} className="text-cyan-400" />}
        {label}
      </label>

      <input
        {...props}
        className="w-full p-4 bg-black/40 border border-cyan-500/10
        focus:border-cyan-400 outline-none rounded-lg"
      />
    </div>
  );
}

export default function AddUser() {
  const [toast, setToast] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
    profileImageUrl: "",
    bannerUrl: "",
  });

  const update = (k: string, v: any) => {
    setForm({ ...form, [k]: v });
  };

  const submit = async () => {
    await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setToast(true);
    redirect("/dashboard/users");
  };

  return (
    <div className="min-h-screen bg-[#02050a] text-white flex items-center justify-center p-10">
      <Breadcrumbs
        items={[{ label: "Users", href: "/dashboard/users" }, { label: "Add" }]}
      />
      <Snackbar
        open={toast}
        message="User instantiated"
        onClose={() => setToast(false)}
      />

      <div
        className="w-full max-w-2xl p-10 rounded-2xl
        border border-cyan-500/20 bg-white/[0.02]
        backdrop-blur-xl shadow-[0_0_60px_rgba(34,211,238,0.08)]"
      >
        <h1 className="text-center text-3xl font-black text-cyan-400 mb-10">
          CREATE USER NODE
        </h1>

        <div className="space-y-6">
          <Field
            label="Username"
            icon={User}
            value={form.username}
            onChange={(e: any) => update("username", e.target.value)}
          />

          <Field
            label="Email"
            icon={Mail}
            value={form.email}
            onChange={(e: any) => update("email", e.target.value)}
          />

          <Field
            label="Password"
            icon={Lock}
            type="password"
            value={form.password}
            onChange={(e: any) => update("password", e.target.value)}
          />

          <Field
            label="Bio"
            icon={FileText}
            value={form.bio}
            onChange={(e: any) => update("bio", e.target.value)}
          />

          <Field
            label="Profile Image URL"
            icon={Image}
            value={form.profileImageUrl}
            onChange={(e: any) => update("profileImageUrl", e.target.value)}
          />

          <Field
            label="Banner URL"
            icon={Image}
            value={form.bannerUrl}
            onChange={(e: any) => update("bannerUrl", e.target.value)}
          />

          <button
            onClick={submit}
            className="w-full mt-4 p-4 bg-cyan-400 text-black font-black
            hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transition rounded-lg"
          >
            INITIALIZE USER
          </button>
        </div>
      </div>
    </div>
  );
}
