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
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
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
          { label: "Add" },
        ]}
      />

      <div
        className="w-full max-w-2xl p-10 rounded-2xl border backdrop-blur-xl"
        style={{
          background: "var(--card)",
          borderColor: "var(--card-border)",
        }}
      >
        <h1
          className="text-center text-3xl font-black mb-10"
          style={{
            color: "var(--primary)",
          }}
        >
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
            className="w-full mt-4 p-4 font-black transition rounded-lg"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            TRANSMIT NODE
          </button>
        </div>
      </div>
    </div>
  );
}
