"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Tags, Activity } from "lucide-react";

import Breadcrumbs from "@/app/components/Breadcrumb";
import FieldInput from "@/app/components/dashboard/FieldInput";
import { useToast } from "@/lib/toast/toastStore";
import { toast } from "@/lib/toast/toast";

export default function EditCategory() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<{
    name: string;
    averageBias: string;
  } | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`)
      .then((r) => r.json())
      .then(setForm);
  }, [id]);

  const update = (k: string, v: any) => {
    setForm((prev) => (prev ? { ...prev, [k]: v } : prev));
  };

  const submit = async () => {
    if (!form) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            ...form,
            averageBias: parseInt(form.averageBias || "0"),
          }),
        },
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Failed to update category");
      }

      toast.success("Successfully modified category", "Success");

      router.push("/dashboard/categories");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update category",
        "Update Failed",
      );
    }
  };

  if (!form) {
    return (
      <div className="animate-pulse p-10" style={{ color: "var(--primary)" }}>
        decoding category node...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-10"
      style={{
        background: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <Breadcrumbs
        items={[
          { label: "Categories", href: "/dashboard/categories" },
          { label: "Edit" },
        ]}
      />

      <div
        className="w-full max-w-2xl rounded-2xl p-10 backdrop-blur-xl"
        style={{
          background: "var(--card)",
          border: "1px solid var(--card-border)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <h1
          className="mb-10 text-center text-3xl font-black"
          style={{
            color: "var(--primary)",
          }}
        >
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
            className="mt-4 w-full rounded-lg p-4 font-black transition"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              border: "1px solid var(--primary-border)",
            }}
          >
            SAVE NODE
          </button>
        </div>
      </div>
    </div>
  );
}
