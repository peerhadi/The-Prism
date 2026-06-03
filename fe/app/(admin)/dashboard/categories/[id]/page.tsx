"use client";

import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import Snackbar from "@/app/components/Snackbar";
import { Tags, Activity } from "lucide-react";
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

export default function EditCategory() {
  const { id } = useParams();
  const [toast, setToast] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/categories/${id}`)
      .then((r) => r.json())
      .then(setForm);
  }, [id]);

  const [form, setForm] = useState<{ name: string; averageBias: string }>({
    name: "",
    averageBias: "",
  });

  const update = (k: string, v: any) => {
    setForm({ ...form, [k]: v });
  };

  const submit = async () => {
    await fetch(`http://localhost:8080/api/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ...form,
        averageBias: parseInt(form.averageBias),
      }),
    });

    setToast(true);
    redirect("/dashboard/categories");
  };

  if (!form)
    return (
      <div className="text-cyan-400 p-10 animate-pulse">
        decoding category node...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#02050a] text-white flex items-center justify-center p-10">
      <Breadcrumbs
        items={[
          { label: "Categories", href: "/dashboard/categories" },
          { label: "Edit" },
        ]}
      />
      <Snackbar
        open={toast}
        message="Category updated"
        onClose={() => setToast(false)}
      />

      <div
        className="w-full max-w-2xl p-10 rounded-2xl
        border border-cyan-500/20 bg-white/[0.02]
        backdrop-blur-xl shadow-[0_0_60px_rgba(34,211,238,0.08)]"
      >
        <h1 className="text-center text-3xl font-black text-cyan-400 mb-10">
          EDIT CATEGORY NODE
        </h1>

        <div className="space-y-6">
          <Field
            label="Category Name"
            icon={Tags}
            value={form.name}
            onChange={(e: any) => update("name", e.target.value)}
          />

          <Field
            label="Average Bias"
            icon={Activity}
            value={form.averageBias}
            onChange={(e: any) => update("averageBias", e.target.value)}
          />

          <button
            onClick={submit}
            className="w-full mt-4 p-4 bg-cyan-400 text-black font-black
            hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transition rounded-lg"
          >
            SAVE NODE
          </button>
        </div>
      </div>
    </div>
  );
}
