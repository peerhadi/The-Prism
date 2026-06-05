"use client";

import { useState } from "react";
import Snackbar from "@/app/components/Snackbar";
import { FileText, Type, AlignLeft, Layers } from "lucide-react";
import { redirect } from "next/navigation";
import Breadcrumbs from "@/app/components/Breadcrumb";
import { useToast } from "@/lib/toast/toastStore";

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

export default function AddArticle() {
  const [toast, setToast] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    summary: "",
    biasLevel: 0,
    imageUrl: "",
    type: "NEWS",
  });

  const update = (k: string, v: any) => {
    setForm({ ...form, [k]: v });
  };

  const submit = async () => {
    await fetch("http://localhost:8080/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ ...form, biasLevel: parseInt(form.biasLevel) }),
    });
    const { addToast } = useToast.getState();
    addToast({
      title: "Success",
      description: "Succesfully added article",
    });
    redirect("/dashboard/articles");
  };

  return (
    <div className="min-h-screen bg-[#02050a] text-white flex items-center justify-center p-10">
      <Breadcrumbs
        items={[
          { label: "Articles", href: "/dashboard/articles" },
          { label: "Add" },
        ]}
      />
      <Snackbar
        open={toast}
        message="Article emitted"
        onClose={() => setToast(false)}
      />

      {/* PAPER */}
      <div
        className="w-full max-w-2xl p-10 rounded-2xl
        border border-cyan-500/20 bg-white/[0.02]
        backdrop-blur-xl shadow-[0_0_60px_rgba(34,211,238,0.08)]"
      >
        <h1 className="text-center text-3xl font-black text-cyan-400 mb-10">
          CREATE SIGNAL
        </h1>

        <div className="space-y-6">
          <Field
            label="Title"
            icon={Type}
            value={form.title}
            onChange={(e: any) => update("title", e.target.value)}
          />

          <Field
            label="Description"
            icon={AlignLeft}
            value={form.description}
            onChange={(e: any) => update("description", e.target.value)}
          />

          <Field
            label="Summary"
            icon={FileText}
            value={form.summary}
            onChange={(e: any) => update("summary", e.target.value)}
          />

          <Field
            label="Bias Level"
            icon={Layers}
            value={form.biasLevel}
            onChange={(e: any) => update("biasLevel", e.target.value)}
          />

          <button
            onClick={submit}
            className="w-full mt-4 p-4 bg-cyan-400 text-black font-black
            hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transition rounded-lg"
          >
            TRANSMIT
          </button>
        </div>
      </div>
    </div>
  );
}
