"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Breadcrumbs from "@/app/components/Breadcrumb";
import FormCard from "@/app/components/dashboard/FormCard";
import FieldInput from "@/app/components/dashboard/FieldInput";

import { useToast } from "@/lib/toast/toastStore";

export default function EditPerspective() {
  const { id } = useParams();
  const router = useRouter();

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
    if (!id) return;

    fetch(`http://localhost:8080/api/perspectives/${id}`)
      .then((r) => r.json())
      .then(setForm);
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

    useToast.getState().addToast({
      title: "Success",
      description: "Successfully modified perspective",
    });

    router.push("/dashboard/perspectives");
  };

  if (!form) {
    return (
      <div className="text-cyan-400 p-10 animate-pulse">decoding signal...</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02050a] text-white flex flex-col items-center p-10">
      <Breadcrumbs
        items={[
          { label: "Perspectives", href: "/dashboard/perspectives" },
          { label: "Edit" },
        ]}
      />

      <FormCard title="EDIT PERSPECTIVE LENS">
        {/* TOP TITLE */}
        <div className="mb-8">
          <FieldInput
            label="Perspective Title"
            value={form.title}
            onChange={(e: any) => update("title", e.target.value)}
          />
        </div>

        {/* NEUTRAL */}
        <div className="mb-10 p-6 border border-cyan-500/10 rounded-xl space-y-4">
          <h2 className="text-cyan-300 font-bold tracking-widest">NEUTRAL</h2>

          <FieldInput
            label="Title"
            value={form.neutral.title}
            onChange={(e: any) => update("neutral.title", e.target.value)}
          />

          <FieldInput
            label="Summary"
            value={form.neutral.summary}
            onChange={(e: any) => update("neutral.summary", e.target.value)}
          />

          <FieldInput
            label="Description"
            value={form.neutral.description}
            onChange={(e: any) => update("neutral.description", e.target.value)}
          />
        </div>

        {/* EXTREME */}
        <div className="mb-10 p-6 border border-red-500/20 rounded-xl space-y-4">
          <h2 className="text-red-400 font-bold tracking-widest">EXTREME</h2>

          <FieldInput
            label="Title"
            value={form.extreme.title}
            onChange={(e: any) => update("extreme.title", e.target.value)}
          />

          <FieldInput
            label="Summary"
            value={form.extreme.summary}
            onChange={(e: any) => update("extreme.summary", e.target.value)}
          />

          <FieldInput
            label="Description"
            value={form.extreme.description}
            onChange={(e: any) => update("extreme.description", e.target.value)}
          />
        </div>

        <button
          onClick={save}
          className="w-full p-5 bg-cyan-400 text-black font-black rounded-lg
          hover:shadow-[0_0_50px_rgba(34,211,238,0.6)] transition"
        >
          SAVE PERSPECTIVE
        </button>
      </FormCard>
    </div>
  );
}
