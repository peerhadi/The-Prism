"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { User, Mail, Lock, Image, FileText } from "lucide-react";

import Breadcrumbs from "@/app/components/Breadcrumb";
import FormCard from "@/app/components/dashboard/FormCard";
import FieldInput from "@/app/components/dashboard/FieldInput";

import { toast } from "@/lib/toast/toast";
import { fetcher } from "@/lib/api/fetcher";

const USER_FIELDS = [
  {
    key: "username",
    label: "Username",
    icon: User,
  },
  {
    key: "email",
    label: "Email",
    icon: Mail,
  },
  {
    key: "password",
    label: "Password",
    icon: Lock,
    type: "password",
  },
  {
    key: "bio",
    label: "Bio",
    icon: FileText,
  },
  {
    key: "profileImageUrl",
    label: "Profile Image URL",
    icon: Image,
  },
  {
    key: "bannerUrl",
    label: "Banner URL",
    icon: Image,
  },
];

export default function AddUser() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
    profileImageUrl: "",
    bannerUrl: "",
  });

  const update = (k: string, v: string) => {
    setForm((prev) => ({ ...prev, [k]: v }));
  };

  const submit = async () => {
    try {
      const { error } = await fetcher(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
          body: form,
        },
      );

      if (error) {
        throw new Error(error);
      }

      toast.success("Successfully added user", "Success");

      router.push("/dashboard/users");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create user",
        "Creation Failed",
      );
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center p-10"
      style={{
        background: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <Breadcrumbs
        items={[{ label: "Users", href: "/dashboard/users" }, { label: "Add" }]}
      />

      <FormCard title="CREATE USER NODE">
        <div className="space-y-6">
          {USER_FIELDS.map((field) => (
            <FieldInput
              key={field.key}
              label={field.label}
              icon={field.icon}
              type={field.type}
              value={form[field.key as keyof typeof form]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(field.key, e.target.value)}
            />
          ))}

          <button
            onClick={submit}
            className="w-full mt-4 p-4 font-black rounded-lg transition"
            style={{
              background: "var(--button-primary)",
              color: "var(--primary-foreground)",
              border: "1px solid var(--primary-border)",
            }}
          >
            INITIALIZE USER
          </button>
        </div>
      </FormCard>
    </div>
  );
}
