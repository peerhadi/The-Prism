"use client";

import { useState } from "react";
import Snackbar from "@/app/components/Snackbar";
import { Brain, FileText, AlignLeft } from "lucide-react";
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

function TextArea({ label, icon: Icon, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-cyan-300 text-xs tracking-[0.3em] uppercase">
        {Icon && <Icon size={14} className="text-cyan-400" />}
        {label}
      </label>

      <textarea
        {...props}
        className="w-full p-4 bg-black/40 border border-cyan-500/10
        focus:border-cyan-400 outline-none rounded-lg min-h-[120px]"
      />
    </div>
  );
}

export default function AddPerspective() {
  const [toast, setToast] = useState(false);

  const [form, setForm] = useState({
    title: "",

    neutralTitle: "",
    neutralSummary: "",
    neutralDescription: "",

    extremeTitle: "",
    extremeSummary: "",
    extremeDescription: "",
  });

  const update = (k: string, v: any) => {
    setForm({ ...form, [k]: v });
  };

  const submit = async () => {
    await fetch("http://localhost:8080/api/perspectives", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: form.title,
        neutral: {
          title: form.neutralTitle,
          summary: form.neutralSummary,
          description: form.neutralDescription,
        },
        extreme: {
          title: form.extremeTitle,
          summary: form.extremeSummary,
          description: form.extremeDescription,
        },
      }),
    });

    const { addToast } = useToast.getState();
    addToast({
      title: "Success",
      description: "Successfully added perspective",
    });
    redirect("/dashboard/perspectives");
  };

  return (
    <div className="min-h-screen bg-[#02050a] text-white flex items-center justify-center p-10">
      <Breadcrumbs
        items={[
          { label: "Perspectives", href: "/dashboard/perspectives" },
          { label: "Add" },
        ]}
      />
      <Snackbar
        open={toast}
        message="Perspective emitted"
        onClose={() => setToast(false)}
      />

      <div
        className="w-full max-w-3xl p-10 rounded-2xl
        border border-cyan-500/20 bg-white/[0.02]
        backdrop-blur-xl shadow-[0_0_60px_rgba(34,211,238,0.08)]"
      >
        <h1 className="text-center text-3xl font-black text-cyan-400 mb-10">
          CREATE PERSPECTIVE LENS
        </h1>

        <div className="space-y-10">
          {/* PERSPECTIVE TITLE (FIXED) */}
          <Field
            label="Perspective Title"
            icon={Brain}
            value={form.title}
            onChange={(e: any) => update("title", e.target.value)}
          />

          {/* NEUTRAL */}
          <div className="p-6 border border-cyan-500/10 rounded-xl bg-white/[0.02]">
            <h2 className="text-cyan-300 font-black mb-4">NEUTRAL LAYER</h2>

            <div className="space-y-4">
              <Field
                label="Title"
                icon={Brain}
                value={form.neutralTitle}
                onChange={(e: any) => update("neutralTitle", e.target.value)}
              />

              <Field
                label="Summary"
                icon={FileText}
                value={form.neutralSummary}
                onChange={(e: any) => update("neutralSummary", e.target.value)}
              />

              <TextArea
                label="Description"
                icon={AlignLeft}
                value={form.neutralDescription}
                onChange={(e: any) =>
                  update("neutralDescription", e.target.value)
                }
              />
            </div>
          </div>

          {/* EXTREME */}
          <div className="p-6 border border-red-500/20 rounded-xl bg-white/[0.02]">
            <h2 className="text-red-400 font-black mb-4">EXTREME LAYER</h2>

            <div className="space-y-4">
              <Field
                label="Title"
                icon={Brain}
                value={form.extremeTitle}
                onChange={(e: any) => update("extremeTitle", e.target.value)}
              />

              <Field
                label="Summary"
                icon={FileText}
                value={form.extremeSummary}
                onChange={(e: any) => update("extremeSummary", e.target.value)}
              />

              <TextArea
                label="Description"
                icon={AlignLeft}
                value={form.extremeDescription}
                onChange={(e: any) =>
                  update("extremeDescription", e.target.value)
                }
              />
            </div>
          </div>

          <button
            onClick={submit}
            className="w-full p-5 bg-cyan-400 text-black font-black rounded-lg
            hover:shadow-[0_0_50px_rgba(34,211,238,0.6)]"
          >
            TRANSMIT PERSPECTIVE SPLIT
          </button>
        </div>
      </div>
    </div>
  );
}
