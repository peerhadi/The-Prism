"use client";

import { useState } from "react";
import { FileText, Type, AlignLeft, Layers } from "lucide-react";
import { redirect } from "next/navigation";

import BreadcrumbWrapper from "@/app/components/dashboard/BreadCrumbWrapper";
import SnackbarWrapper from "@/app/components/dashboard/SnackbarWrapper";
import FieldInput from "@/app/components/dashboard/FieldInput";

import { useToast } from "@/lib/toast/toastStore";

export default function AddArticle() {
  const [toast, setToast] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    summary: "",
    biasLevel: 0,
    imageUrl: "",
    type: "NEWS",
  });

  const update = (k: string, v: any) => {
    setForm({ ...form, [k]: v });
  };

  const submit = async () => {
    await fetch("http://localhost:8080/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ...form,
        biasLevel: parseInt(form.biasLevel as any),
      }),
    });

    const { addToast } = useToast.getState();

    addToast({
      title: "Success",
      description: "Successfully added article",
    });

    redirect("/dashboard/articles");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-10"
      style={{
        background: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <BreadcrumbWrapper
        items={[
          { label: "Articles", href: "/dashboard/articles" },
          { label: "Add" },
        ]}
      />

      <SnackbarWrapper
        open={toast}
        message="Article emitted"
        onClose={() => setToast(false)}
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
          CREATE SIGNAL
        </h1>

        <div className="space-y-6">
          <FieldInput
            label="Title"
            icon={Type}
            value={form.title}
            onChange={(e: any) => update("title", e.target.value)}
          />

          <FieldInput
            label="Description"
            icon={AlignLeft}
            value={form.description}
            onChange={(e: any) => update("description", e.target.value)}
          />

          <FieldInput
            label="Summary"
            icon={FileText}
            value={form.summary}
            onChange={(e: any) => update("summary", e.target.value)}
          />

          <FieldInput
            label="Bias Level"
            icon={Layers}
            value={form.biasLevel}
            onChange={(e: any) => update("biasLevel", e.target.value)}
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
            TRANSMIT
          </button>
        </div>
      </div>
    </div>
  );
}
