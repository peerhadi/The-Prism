"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Breadcrumbs from "@/app/components/Breadcrumb";
import FormCard from "@/app/components/dashboard/FormCard";
import FieldInput from "@/app/components/dashboard/FieldInput";

import { useToast } from "@/lib/toast/toastStore";

const BREADCRUMBS = [
  { label: "Users", href: "/dashboard/users" },
  { label: "Edit" },
];

const FIELDS = [
  { key: "username", label: "Username" },
  { key: "email", label: "Email" },
  { key: "bio", label: "Bio" },
  { key: "profileImageUrl", label: "Profile Image URL" },
  { key: "bannerUrl", label: "Banner URL" },
];

export default function EditUser() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`)
      .then((r) => r.json())
      .then(setForm);
  }, [id]);

  const update = (k: string, v: any) => {
    setForm((prev: any) => ({
      ...prev,
      [k]: v,
    }));
  };

  const save = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    });

    useToast.getState().addToast({
      title: "Success",
      description: "Successfully modified user",
    });

    router.push("/dashboard/users");
  };

  if (!form) {
    return (
      <div className="p-10 animate-pulse" style={{ color: "var(--primary)" }}>
        decoding user node...
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

      <FormCard title="EDIT USER NODE">
        <div className="space-y-5">
          {FIELDS.map((field) => (
            <FieldInput
              key={field.key}
              label={field.label}
              value={form[field.key] ?? ""}
              onChange={(e: any) => update(field.key, e.target.value)}
            />
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
            SAVE USER NODE
          </button>
        </div>
      </FormCard>
    </div>
  );
}
