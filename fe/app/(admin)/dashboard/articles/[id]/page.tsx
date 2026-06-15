"use client";

import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import { FileText, Type, AlignLeft, Layers } from "lucide-react";

import BreadcrumbWrapper from "@/app/components/dashboard/BreadCrumbWrapper";
import SnackbarWrapper from "@/app/components/dashboard/SnackbarWrapper";
import FieldInput from "@/app/components/dashboard/FieldInput";
import { toast as fetchToast } from "@/lib/toast/toast";

type ArticleForm = {
  title: string;
  description: string;
  summary: string;
  biasLevel: string;
};

export default function EditArticle() {
  const { id } = useParams();
  const [form, setForm] = useState<ArticleForm | null>(null);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${id}`)
      .then((r) => r.json())
      .then(setForm);
  }, [id]);

  const update = (k: string, v: string) => {
    if (!form) return;
    setForm({ ...form, [k]: v });
  };

  const save = async () => {
    let isSuccessful = false;
    try {
      if (!form) return;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            ...form,
            biasLevel: parseInt(form.biasLevel),
          }),
        },
      );
      isSuccessful = true;
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Failed to update article");
      }

      fetchToast.success("Successfully modified article", "Success");
    } catch (error) {
      console.log(error);
      fetchToast.error("Failed to update article", "Update Failed");
    }
    if (isSuccessful) {
      redirect("/dashboard/articles");
    }
  };

  if (!form)
    return (
      <div className="p-10 animate-pulse" style={{ color: "var(--primary)" }}>
        decoding signal...
      </div>
    );

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-10"
      style={{
        background: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <BreadcrumbWrapper
        items={[
          { label: "Articles", href: "/dashboard/articles" },
          { label: "Edit", href: "#" },
        ]}
      />

      <SnackbarWrapper
        open={toast}
        message="Signal updated"
        onClose={() => setToast(false)}
      />

      <div
        className="w-full max-w-2xl p-10 rounded-2xl backdrop-blur-xl"
        style={{
          background: "var(--card)",
          border: "1px solid var(--card-border)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <h1
          className="mb-10 text-center text-3xl font-black"
          style={{ color: "var(--primary)" }}
        >
          EDIT SIGNAL
        </h1>

        <div className="space-y-6">
          <FieldInput
            label="Title"
            icon={Type}
            value={form.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update("title", e.target.value)}
          />

          <FieldInput
            label="Description"
            icon={AlignLeft}
            value={form.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update("description", e.target.value)}
          />

          <FieldInput
            label="Summary"
            icon={FileText}
            value={form.summary}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update("summary", e.target.value)}
          />

          <FieldInput
            label="Bias Level"
            icon={Layers}
            value={form.biasLevel}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update("biasLevel", e.target.value)}
          />

          <button
            onClick={save}
            className="mt-4 w-full rounded-lg p-4 font-black transition"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              border: "1px solid var(--primary-border)",
            }}
          >
            SAVE SIGNAL
          </button>
        </div>
      </div>
    </div>
  );
}
