"use client";

import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import { FileText, Type, AlignLeft, Layers } from "lucide-react";

import BreadcrumbWrapper from "@/app/components/dashboard/BreadCrumbWrapper";
import SnackbarWrapper from "@/app/components/dashboard/SnackbarWrapper";
import FieldInput from "@/app/components/dashboard/FieldInput";

import { useToast } from "@/lib/toast/toastStore";

export default function EditArticle() {
  const { id } = useParams();
  const [form, setForm] = useState<any>(null);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/articles/${id}`)
      .then((r) => r.json())
      .then(setForm);
  }, [id]);

  const update = (k: string, v: any) => {
    setForm({ ...form, [k]: v });
  };

  const save = async () => {
    await fetch(`http://localhost:8080/api/articles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ...form,
        biasLevel: parseInt(form.biasLevel),
      }),
    });

    const { addToast } = useToast.getState();
    addToast({
      title: "Success",
      description: "Successfully modified article",
    });

    redirect("/dashboard/articles");
  };

  if (!form)
    return (
      <div className="text-cyan-400 p-10 animate-pulse">decoding signal...</div>
    );

  return (
    <div className="min-h-screen bg-[#02050a] text-white flex flex-col items-center justify-center p-10">
      <BreadcrumbWrapper
        items={[
          { label: "Articles", href: "/dashboard/articles" },
          { label: "Edit" },
        ]}
      />

      <SnackbarWrapper
        open={toast}
        message="Signal updated"
        onClose={() => setToast(false)}
      />

      {/* PAPER (UNCHANGED UI) */}
      <div className="w-full max-w-2xl p-10 rounded-2xl border border-cyan-500/20 bg-white/[0.02] backdrop-blur-xl shadow-[0_0_60px_rgba(34,211,238,0.08)]">
        <h1 className="text-center text-3xl font-black text-cyan-400 mb-10">
          EDIT SIGNAL
        </h1>

        <div className="space-y-6">
          <FieldInput
            label="Title"
            icon={Type}
            value={form.title}
            onChange={(e: any) => update("title", e.target.value)}
          />

          <FieldInput
            label="Description"
            icon={AlignLeft}
            value={form.description}
            onChange={(e: any) => update("description", e.target.value)}
          />

          <FieldInput
            label="Summary"
            icon={FileText}
            value={form.summary}
            onChange={(e: any) => update("summary", e.target.value)}
          />

          <FieldInput
            label="Bias Level"
            icon={Layers}
            value={form.biasLevel}
            onChange={(e: any) => update("biasLevel", e.target.value)}
          />

          <button
            onClick={save}
            className="w-full mt-4 p-4 bg-cyan-400 text-black font-black hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transition rounded-lg"
          >
            SAVE SIGNAL
          </button>
        </div>
      </div>
    </div>
  );
}
