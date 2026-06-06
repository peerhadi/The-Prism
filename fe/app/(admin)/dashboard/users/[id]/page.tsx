"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Breadcrumbs from "@/app/components/Breadcrumb";
import FormCard from "@/app/components/dashboard/FormCard";
import FieldInput from "@/app/components/dashboard/FieldInput";

import { useToast } from "@/lib/toast/toastStore";

export default function EditUser() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:8080/api/users/${id}`)
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
    await fetch(`http://localhost:8080/api/users/${id}`, {
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
      <div className="text-cyan-400 p-10 animate-pulse">
        decoding user node...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02050a] text-white flex flex-col items-center p-10">
      <Breadcrumbs
        items={[
          { label: "Users", href: "/dashboard/users" },
          { label: "Edit" },
        ]}
      />

      <FormCard title="EDIT USER NODE">
        <div className="space-y-5">
          <FieldInput
            label="Username"
            value={form.username ?? ""}
            onChange={(e: any) => update("username", e.target.value)}
          />

          <FieldInput
            label="Email"
            value={form.email ?? ""}
            onChange={(e: any) => update("email", e.target.value)}
          />

          <FieldInput
            label="Bio"
            value={form.bio ?? ""}
            onChange={(e: any) => update("bio", e.target.value)}
          />

          <FieldInput
            label="Profile Image URL"
            value={form.profileImageUrl ?? ""}
            onChange={(e: any) => update("profileImageUrl", e.target.value)}
          />

          <FieldInput
            label="Banner URL"
            value={form.bannerUrl ?? ""}
            onChange={(e: any) => update("bannerUrl", e.target.value)}
          />

          <button
            onClick={save}
            className="w-full p-5 bg-cyan-400 text-black font-black rounded-lg
            hover:shadow-[0_0_50px_rgba(34,211,238,0.6)] transition"
          >
            SAVE USER NODE
          </button>
        </div>
      </FormCard>
    </div>
  );
}
