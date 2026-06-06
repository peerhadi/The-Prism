"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tags, Activity } from "lucide-react";

import Breadcrumbs from "@/app/components/Breadcrumb";
import FieldInput from "@/app/components/dashboard/FieldInput";
import { useToast } from "@/lib/toast/toastStore";

export default function AddCategory() {
  const router = useRouter();

  const [form, setForm] = useState<{
    name: string;
    averageBias: string;
  }>({
    name: "",
    averageBias: "",
  });

  const update = (k: string, v: any) => {
    setForm((prev) => ({ ...prev, [k]: v }));
  };

  const submit = async () => {
    await fetch("http://localhost:8080/api/categories", {
      method: "POST",
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
      description: "Successfully added category",
    });

    router.push("/dashboard/categories");
  };

  return (
    <div className="min-h-screen bg-[#02050a] text-white flex items-center justify-center p-10">
      <Breadcrumbs
        items={[
          { label: "Categories", href: "/dashboard/categories" },
          { label: "Add" },
        ]}
      />

      <div
        className="w-full max-w-2xl p-10 rounded-2xl
        border border-cyan-500/20 bg-white/[0.02]
        backdrop-blur-xl shadow-[0_0_60px_rgba(34,211,238,0.08)]"
      >
        <h1 className="text-center text-3xl font-black text-cyan-400 mb-10">
          CREATE CATEGORY NODE
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
            TRANSMIT NODE
          </button>
        </div>
      </div>
    </div>
  );
}
