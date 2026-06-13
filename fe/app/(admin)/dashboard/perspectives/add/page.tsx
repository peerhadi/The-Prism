"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Brain, FileText, AlignLeft } from "lucide-react";

import Breadcrumbs from "@/app/components/Breadcrumb";
import FormCard from "@/app/components/dashboard/FormCard";
import FieldInput from "@/app/components/dashboard/FieldInput";
import FieldTextArea from "@/app/components/dashboard/FieldTextArea";

import { useToast } from "@/lib/toast/toastStore";

const BREADCRUMBS = [
  { label: "Perspectives", href: "/dashboard/perspectives" },
  { label: "Add" },
];

const SECTIONS = [
  {
    key: "neutral",
    title: "NEUTRAL LAYER",
    border: "var(--primary-border)",
    heading: "var(--primary)",
  },
  {
    key: "extreme",
    title: "EXTREME LAYER",
    border: "var(--danger-border)",
    heading: "var(--danger)",
  },
];

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
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/perspectives`, {
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
    <div
      className="min-h-screen flex flex-col items-center p-10"
      style={{
        background: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <Breadcrumbs items={BREADCRUMBS} />

      <FormCard title="CREATE PERSPECTIVE LENS">
        <div className="space-y-8">
          <FieldInput
            label="Perspective Title"
            icon={Brain}
            value={form.title}
            onChange={(e: any) => update("title", e.target.value)}
          />

          {SECTIONS.map((section) => (
            <div
              key={section.key}
              className="p-6 rounded-xl space-y-4"
              style={{
                border: `1px solid ${section.border}`,
              }}
            >
              <h2
                className="font-black"
                style={{
                  color: section.heading,
                }}
              >
                {section.title}
              </h2>

              <FieldInput
                label="Title"
                icon={Brain}
                value={form[`${section.key}Title` as keyof typeof form]}
                onChange={(e: any) =>
                  update(`${section.key}Title`, e.target.value)
                }
              />

              <FieldInput
                label="Summary"
                icon={FileText}
                value={form[`${section.key}Summary` as keyof typeof form]}
                onChange={(e: any) =>
                  update(`${section.key}Summary`, e.target.value)
                }
              />

              <FieldTextArea
                label="Description"
                icon={AlignLeft}
                value={form[`${section.key}Description` as keyof typeof form]}
                onChange={(e: any) =>
                  update(`${section.key}Description`, e.target.value)
                }
              />
            </div>
          ))}

          <button
            onClick={submit}
            className="w-full p-5 font-black rounded-lg transition"
            style={{
              background: "var(--button-primary)",
              color: "var(--primary-foreground)",
              border: "1px solid var(--primary-border)",
            }}
          >
            TRANSMIT PERSPECTIVE SPLIT
          </button>
        </div>
      </FormCard>
    </div>
  );
}
