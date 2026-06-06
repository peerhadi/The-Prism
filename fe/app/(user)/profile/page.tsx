"use client";

import React from "react";
import { useFormik } from "formik";
import { PrismLoader } from "@/app/components/loadingScreen";

import ProfileHeader from "@/app/components/settings/profile/ProfileHeader";
import IdentitySection from "@/app/components/settings/profile/IdentitySection";
import StatsSection from "@/app/components/settings/profile/StatsSection";

export default function ProfilePage() {
  const [token, setToken] = React.useState("");
  const [user, setUser] = React.useState<any>({});

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: user?.username ?? "",
      email: user?.email ?? "",
      bio: user?.bio ?? "",
    },
    onSubmit: async (values) => {
      await fetch(`http://localhost:8080/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
        body: JSON.stringify(values),
      });

      const updated = await fetch("http://localhost:8080/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json());

      setUser(updated);
      window.location.reload();
    },
  });

  React.useEffect(() => {
    const t = window.localStorage.getItem("token") || "";
    setToken(t);

    fetch("http://localhost:8080/api/auth/me", {
      headers: { Authorization: `Bearer ${t}` },
    })
      .then((res) => res.json())
      .then(setUser);
  }, []);

  if (!user.id) return <PrismLoader />;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02040A] text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.12),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_30%)]" />

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <ProfileHeader />

        <IdentitySection user={user} formik={formik} />

        <StatsSection />
      </main>
    </div>
  );
}
