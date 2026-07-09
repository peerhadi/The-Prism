"use client";

import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import { FileText, Type, AlignLeft, Layers } from "lucide-react";

import Breadcrumbs from "@/app/components/Breadcrumb";
import Snackbar from "@/app/components/Snackbar";
import FieldInput from "@/app/components/dashboard/FieldInput";
import { toast as fetchToast } from "@/lib/toast/toast";
import { fetcher } from "@/lib/api/fetcher";

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
    fetcher(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${id}`).then(
      ({ data, error }) => {
        if (error) { fetchToast.error(error, "Load Failed"); return; }
        if (data) setForm(data as ArticleForm);
      },
    );
  }, [id]);

  const update = (k: string, v: string) => {
    if (!form) return;
    setForm({ ...form, [k]: v });
  };

  const save = async () => {
    try {
      if (!form) return;
      const { error } = await fetcher(
        `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
          body: {
            ...form,
            biasLevel: parseInt(form.biasLevel),
          },
        },
      );

      if (error) {
        throw new Error(error);
      }

      fetchToast.success("Successfully modified article", "Success");
      redirect("/dashboard/articles");
    } catch (error) {
      console.log(error);
      fetchToast.error("Failed to update article", "Update Failed");
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
      <Breadcrumbs
        items={[
          { label: "Articles", href: "/dashboard/articles" },
          { label: "Edit" },
        ]}
      />

      <Snackbar
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
