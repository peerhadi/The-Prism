"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Brain, FileText, AlignLeft } from "lucide-react";

import Breadcrumbs from "@/app/components/Breadcrumb";
import FormCard from "@/app/components/dashboard/FormCard";
import FieldInput from "@/app/components/dashboard/FieldInput";
import FieldTextArea from "@/app/components/dashboard/FieldTextArea";

import { useToast } from "@/lib/toast/toastStore";

export default function AddPerspective() {
  const router = useRouter();

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
    setForm((prev) => ({ ...prev, [k]: v }));
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

    useToast.getState().addToast({
      title: "Success",
      description: "Successfully added perspective",
    });

    router.push("/dashboard/perspectives");
  };

  return (
    <div className="min-h-screen bg-[#02050a] text-white flex flex-col items-center p-10">
      <Breadcrumbs
        items={[
          { label: "Perspectives", href: "/dashboard/perspectives" },
          { label: "Add" },
        ]}
      />

      <FormCard title="CREATE PERSPECTIVE LENS">
        <div className="space-y-8">
          {/* TITLE */}
          <FieldInput
            label="Perspective Title"
            icon={Brain}
            value={form.title}
            onChange={(e: any) => update("title", e.target.value)}
          />

          {/* NEUTRAL */}
          <div className="p-6 border border-cyan-500/10 rounded-xl space-y-4">
            <h2 className="text-cyan-300 font-black">NEUTRAL LAYER</h2>

            <FieldInput
              label="Title"
              icon={Brain}
              value={form.neutralTitle}
              onChange={(e: any) => update("neutralTitle", e.target.value)}
            />

            <FieldInput
              label="Summary"
              icon={FileText}
              value={form.neutralSummary}
              onChange={(e: any) => update("neutralSummary", e.target.value)}
            />

            <FieldTextArea
              label="Description"
              icon={AlignLeft}
              value={form.neutralDescription}
              onChange={(e: any) =>
                update("neutralDescription", e.target.value)
              }
            />
          </div>

          {/* EXTREME */}
          <div className="p-6 border border-red-500/20 rounded-xl space-y-4">
            <h2 className="text-red-400 font-black">EXTREME LAYER</h2>

            <FieldInput
              label="Title"
              icon={Brain}
              value={form.extremeTitle}
              onChange={(e: any) => update("extremeTitle", e.target.value)}
            />

            <FieldInput
              label="Summary"
              icon={FileText}
              value={form.extremeSummary}
              onChange={(e: any) => update("extremeSummary", e.target.value)}
            />

            <FieldTextArea
              label="Description"
              icon={AlignLeft}
              value={form.extremeDescription}
              onChange={(e: any) =>
                update("extremeDescription", e.target.value)
              }
            />
          </div>

          <button
            onClick={submit}
            className="w-full p-5 bg-cyan-400 text-black font-black rounded-lg
            hover:shadow-[0_0_50px_rgba(34,211,238,0.6)] transition"
          >
            TRANSMIT PERSPECTIVE SPLIT
          </button>
        </div>
      </FormCard>
    </div>
  );
}
