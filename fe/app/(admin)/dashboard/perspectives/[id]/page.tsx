"use client";

import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import Snackbar from "@/app/components/Snackbar";
import Breadcrumbs from "@/app/components/Breadcrumb";
import { useToast } from "@/lib/toast/toastStore";

export default function EditPerspective() {
  const { id } = useParams();
  const [toast, setToast] = useState(false);
  const [form, setForm] = useState<any>(null);

  const update = (path: string, value: any) => {
    setForm((prev: any) => {
      const copy = structuredClone(prev);
      const keys = path.split(".");
      let obj = copy;

      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }

      obj[keys[keys.length - 1]] = value;
      return copy;
    });
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/perspectives/${id}`)
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        setForm(r);
      });
  }, [id]);

  const save = async () => {
    await fetch(`http://localhost:8080/api/perspectives/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    });

    const { addToast } = useToast.getState();
    addToast({
      title: "Success",
      description: "Successfully modified perspective",
    });
    redirect("/dashboard/perspectives");
  };

  if (!form)
    return <div className="text-cyan-400 p-10">decoding signal...</div>;

  return (
    <div className="min-h-screen bg-[#02050a] text-white flex justify-center p-10">
      <Breadcrumbs
        items={[
          { label: "Perspectives", href: "/dashboard/perspectives" },
          { label: "Edit" },
        ]}
      />
      <Snackbar
        open={toast}
        message="Perspective updated"
        onClose={() => setToast(false)}
      />

      <div
        className="w-full max-w-3xl p-10 rounded-2xl
        border border-cyan-500/20 bg-white/[0.02]
        backdrop-blur-xl shadow-[0_0_60px_rgba(34,211,238,0.08)]"
      >
        <h1 className="text-center text-3xl font-black text-cyan-400 mb-10">
          EDIT PERSPECTIVE LENS
        </h1>

        {/* FIXED TOP TITLE */}
        <div className="mb-8">
          <label className="text-cyan-300 text-xs tracking-[0.3em] uppercase">
            Perspective Title
          </label>

          <input
            className="w-full mt-2 p-4 bg-black/40 border border-cyan-500/10 rounded-lg"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
          />
        </div>

        {/* NEUTRAL */}
        <div className="mb-10 p-6 border border-cyan-500/10 rounded-xl">
          <h2 className="text-cyan-300 font-bold mb-4">NEUTRAL</h2>

          <input
            className="w-full mb-3 p-3 bg-black/40 border border-cyan-500/10 rounded"
            value={form.neutral.title}
            onChange={(e) => update("neutral.title", e.target.value)}
            placeholder="title"
          />

          <textarea
            className="w-full mb-3 p-3 bg-black/40 border border-cyan-500/10 rounded"
            value={form.neutral.summary}
            onChange={(e) => update("neutral.summary", e.target.value)}
            placeholder="summary"
          />

          <textarea
            className="w-full p-3 bg-black/40 border border-cyan-500/10 rounded"
            value={form.neutral.description}
            onChange={(e) => update("neutral.description", e.target.value)}
            placeholder="description"
          />
        </div>

        {/* EXTREME */}
        <div className="mb-10 p-6 border border-red-500/20 rounded-xl">
          <h2 className="text-red-400 font-bold mb-4">EXTREME</h2>

          <input
            className="w-full mb-3 p-3 bg-black/40 border border-cyan-500/10 rounded"
            value={form.extreme.title}
            onChange={(e) => update("extreme.title", e.target.value)}
            placeholder="title"
          />

          <textarea
            className="w-full mb-3 p-3 bg-black/40 border border-cyan-500/10 rounded"
            value={form.extreme.summary}
            onChange={(e) => update("extreme.summary", e.target.value)}
            placeholder="summary"
          />

          <textarea
            className="w-full p-3 bg-black/40 border border-cyan-500/10 rounded"
            value={form.extreme.description}
            onChange={(e) => update("extreme.description", e.target.value)}
            placeholder="description"
          />
        </div>

        <button
          onClick={save}
          className="w-full p-5 bg-cyan-400 text-black font-black rounded-lg
          hover:shadow-[0_0_50px_rgba(34,211,238,0.6)]"
        >
          SAVE PERSPECTIVE
        </button>
      </div>
    </div>
  );
}
