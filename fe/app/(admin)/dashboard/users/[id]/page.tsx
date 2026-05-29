"use client";

import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import Snackbar from "@/app/components/Snackbar";
import Breadcrumbs from "@/app/components/Breadcrumb";

function Field({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-cyan-300 text-xs tracking-[0.3em] uppercase">
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

export default function EditUser() {
  const { id } = useParams();
  const [toast, setToast] = useState(false);
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/users/${id}`)
      .then((r) => r.json())
      .then(setForm);
  }, [id]);

  const update = (k: string, v: any) => {
    setForm({ ...form, [k]: v });
  };

  const save = async () => {
    await fetch(`http://localhost:8080/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setToast(true);
    redirect("/users");
  };

  if (!form)
    return <div className="text-cyan-400 p-10">decoding user node...</div>;

  return (
    <div className="max-h-[fit-content] bg-[#02050a] text-white flex justify-center p-10">
      <Breadcrumbs
        items={[
          { label: "Users", href: "/dashboard/users" },
          { label: "Edit" },
        ]}
      />
      <Snackbar
        open={toast}
        message="User updated"
        onClose={() => setToast(false)}
      />

      <div
        className="w-full max-w-2xl p-10 rounded-2xl
        border border-cyan-500/20 bg-white/[0.02]
        backdrop-blur-xl shadow-[0_0_60px_rgba(34,211,238,0.08)]"
      >
        <h1 className="text-center text-3xl font-black text-cyan-400 mb-10">
          EDIT USER NODE
        </h1>

        <div className="space-y-5">
          <Field
            label="Username"
            value={form.username}
            onChange={(e: any) => update("username", e.target.value)}
          />

          <Field
            label="Email"
            value={form.email}
            onChange={(e: any) => update("email", e.target.value)}
          />

          <Field
            label="Bio"
            value={form.bio}
            onChange={(e: any) => update("bio", e.target.value)}
          />

          <Field
            label="Profile Image URL"
            value={form.profileImageUrl}
            onChange={(e: any) => update("profileImageUrl", e.target.value)}
          />

          <Field
            label="Banner URL"
            value={form.bannerUrl}
            onChange={(e: any) => update("bannerUrl", e.target.value)}
          />

          <button
            onClick={save}
            className="w-full p-5 bg-cyan-400 text-black font-black rounded-lg
            hover:shadow-[0_0_50px_rgba(34,211,238,0.6)]"
          >
            SAVE USER NODE
          </button>
        </div>
      </div>
    </div>
  );
}
