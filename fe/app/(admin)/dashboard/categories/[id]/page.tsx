"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Tags, Activity } from "lucide-react";

import Breadcrumbs from "@/app/components/Breadcrumb";
import FieldInput from "@/app/components/dashboard/FieldInput";
import { useToast } from "@/lib/toast/toastStore";

export default function EditCategory() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<{
    name: string;
    averageBias: string;
  } | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:8080/api/categories/${id}`)
      .then((r) => r.json())
      .then(setForm);
  }, [id]);

  const update = (k: string, v: any) => {
    setForm((prev) => (prev ? { ...prev, [k]: v } : prev));
  };

  const submit = async () => {
    if (!form) return;

    await fetch(`http://localhost:8080/api/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ...form,
        averageBias: parseInt(form.averageBias || "0"),
      }),
    });

    useToast.getState().addToast({
      title: "Success",
      description: "Successfully modified category",
    });

    router.push("/dashboard/categories");
  };

  if (!form) {
    return (
      <div className="text-cyan-400 p-10 animate-pulse">
        decoding category node...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02050a] text-white flex items-center justify-center p-10">
      <Breadcrumbs
        items={[
          { label: "Categories", href: "/dashboard/categories" },
          { label: "Edit" },
        ]}
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
          <FieldInput
            label="Category Name"
            icon={Tags}
            value={form.name}
            onChange={(e: any) => update("name", e.target.value)}
          />

          <FieldInput
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
