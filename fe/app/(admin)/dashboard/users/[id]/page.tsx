"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Breadcrumbs from "@/app/components/Breadcrumb";
import FormCard from "@/app/components/dashboard/FormCard";
import FieldInput from "@/app/components/dashboard/FieldInput";

import { toast } from "@/lib/toast/toast";
import { fetcher } from "@/lib/api/fetcher";

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

  const [form, setForm] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    if (!id) return;

    fetcher(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`).then(
      ({ data, error }) => {
        if (error) { toast.error(error, "Load Failed"); return; }
        if (data) setForm(data as Record<string, unknown>);
      },
    );
  }, [id]);

  const update = (k: string, v: string) => {
    setForm((prev) => ({
      ...prev,
      [k]: v,
    }));
  };

  const save = async () => {
    try {
      const { error } = await fetcher(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
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

      toast.success("Successfully modified user", "Success");

      router.push("/dashboard/users");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update user",
        "Update Failed",
      );
    }
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
              value={(form[field.key] as string) ?? ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(field.key, e.target.value)}
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
