"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tags, Activity } from "lucide-react";

import Breadcrumbs from "@/app/components/Breadcrumb";
import FormCard from "@/app/components/dashboard/FormCard";
import FieldInput from "@/app/components/dashboard/FieldInput";
import { toast } from "@/lib/toast/toast";
import { fetcher } from "@/lib/api/fetcher";


export default function AddCategory() {
  const router = useRouter();

  const [form, setForm] = useState<{
    name: string;
    averageBias: string;
  }>({
    name: "",
    averageBias: "",
  });

  const update = (k: string, v: string) => {
    setForm((prev) => ({ ...prev, [k]: v }));
  };

  const submit = async () => {
    try {
      const { error } = await fetcher(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
          body: {
            ...form,
            averageBias: parseInt(form.averageBias || "0"),
          },
        },
      );

      if (error) {
        throw new Error(error);
      }

      toast.success("Successfully added category", "Success");

      router.push("/dashboard/categories");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create category",
        "Creation Failed",
      );
    }
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

      <FormCard title="CREATE CATEGORY NODE">
        <div className="space-y-6">
          <FieldInput
            label="Category Name"
            icon={Tags}
            value={form.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update("name", e.target.value)}
          />

          <FieldInput
            label="Average Bias"
            icon={Activity}
            value={form.averageBias}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update("averageBias", e.target.value)}
          />

          <button
            onClick={submit}
            className="w-full mt-4 rounded-lg p-4 font-black transition"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              border: "1px solid var(--primary-border)",
            }}
          >
            TRANSMIT NODE
          </button>
        </div>
      </FormCard>
    </div>
  );
}
