"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Breadcrumbs from "@/app/components/Breadcrumb";
import FormCard from "@/app/components/dashboard/FormCard";
import FieldInput from "@/app/components/dashboard/FieldInput";

import { toast } from "@/lib/toast/toast";
import { fetcher } from "@/lib/api/fetcher";

const BREADCRUMBS = [
  { label: "Perspectives", href: "/dashboard/perspectives" },
  { label: "Edit" },
];

const SECTIONS = [
  {
    key: "neutral",
    title: "NEUTRAL",
    border: "var(--primary-border)",
    heading: "var(--primary)",
  },
  {
    key: "extreme",
    title: "EXTREME",
    border: "var(--danger-border)",
    heading: "var(--danger)",
  },
];

const FIELDS = [
  { key: "title", label: "Title" },
  { key: "summary", label: "Summary" },
  { key: "description", label: "Description" },
];

export default function EditPerspective() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<Record<string, unknown> | null>(null);

  const update = (path: string, value: string) => {
    setForm((prev) => {
      if (!prev) return prev;
      const copy = structuredClone(prev) as Record<string, unknown>;
      const keys = path.split(".");
      let obj: Record<string, unknown> = copy;

      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]] as Record<string, unknown>;
      }

      obj[keys[keys.length - 1]] = value;
      return copy;
    });
  };

  useEffect(() => {
    if (!id) return;

    fetcher(`${process.env.NEXT_PUBLIC_API_URL}/api/perspectives/${id}`).then(
      ({ data, error }) => {
        if (error) { toast.error(error, "Load Failed"); return; }
        if (data) setForm(data as Record<string, unknown>);
      },
    );
  }, [id]);

  const save = async () => {
    try {
      const { error } = await fetcher(
        `${process.env.NEXT_PUBLIC_API_URL}/api/perspectives/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
          body: form,
        },
      );

      if (error) {
        throw new Error(error);
      }

      toast.success("Successfully modified perspective", "Success");

      router.push("/dashboard/perspectives");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update perspective",
        "Update Failed",
      );
    }
  };

  if (!form) {
    return (
      <div className="p-10 animate-pulse" style={{ color: "var(--primary)" }}>
        decoding signal...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center p-10"
      style={{
        background: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <Breadcrumbs items={BREADCRUMBS} />

      <FormCard title="EDIT PERSPECTIVE LENS">
        <div className="mb-8">
          <FieldInput
            label="Perspective Title"
            value={form.title as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update("title", e.target.value)}
          />
        </div>

        {SECTIONS.map((section) => (
          <div
            key={section.key}
            className="mb-10 p-6 rounded-xl space-y-4"
            style={{
              border: `1px solid ${section.border}`,
            }}
          >
            <h2
              className="font-bold tracking-widest"
              style={{
                color: section.heading,
              }}
            >
              {section.title}
            </h2>

            {FIELDS.map((field) => (
              <FieldInput
                key={field.key}
                label={field.label}
                value={(form[section.key] as Record<string, string>)?.[field.key] ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  update(`${section.key}.${field.key}`, e.target.value)
                }
              />
            ))}
          </div>
        ))}

        <button
          onClick={save}
          className="w-full p-5 font-black rounded-lg transition"
          style={{
            background: "var(--button-primary)",
            color: "var(--primary-foreground)",
            border: "1px solid var(--primary-border)",
          }}
        >
          SAVE PERSPECTIVE
        </button>
      </FormCard>
    </div>
  );
}
