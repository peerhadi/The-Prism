"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { User, Mail, Lock, Image, FileText } from "lucide-react";

import Breadcrumbs from "@/app/components/Breadcrumb";
import FormCard from "@/app/components/dashboard/FormCard";
import FieldInput from "@/app/components/dashboard/FieldInput";

import { useToast } from "@/lib/toast/toastStore";

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

  const update = (k: string, v: any) => {
    setForm((prev) => ({ ...prev, [k]: v }));
  };

  const submit = async () => {
    await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    });

    useToast.getState().addToast({
      title: "Success",
      description: "Successfully added user",
    });

    router.push("/dashboard/users");
  };

  return (
    <div className="min-h-screen bg-[#02050a] text-white flex flex-col items-center p-10">
      <Breadcrumbs
        items={[{ label: "Users", href: "/dashboard/users" }, { label: "Add" }]}
      />

      <FormCard title="CREATE USER NODE">
        <div className="space-y-6">
          <FieldInput
            label="Username"
            icon={User}
            value={form.username}
            onChange={(e: any) => update("username", e.target.value)}
          />

          <FieldInput
            label="Email"
            icon={Mail}
            value={form.email}
            onChange={(e: any) => update("email", e.target.value)}
          />

          <FieldInput
            label="Password"
            icon={Lock}
            type="password"
            value={form.password}
            onChange={(e: any) => update("password", e.target.value)}
          />

          <FieldInput
            label="Bio"
            icon={FileText}
            value={form.bio}
            onChange={(e: any) => update("bio", e.target.value)}
          />

          <FieldInput
            label="Profile Image URL"
            icon={Image}
            value={form.profileImageUrl}
            onChange={(e: any) => update("profileImageUrl", e.target.value)}
          />

          <FieldInput
            label="Banner URL"
            icon={Image}
            value={form.bannerUrl}
            onChange={(e: any) => update("bannerUrl", e.target.value)}
          />

          <button
            onClick={submit}
            className="w-full mt-4 p-4 bg-cyan-400 text-black font-black
            hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transition rounded-lg"
          >
            INITIALIZE USER
          </button>
        </div>
      </FormCard>
    </div>
  );
}
