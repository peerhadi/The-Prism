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

  /* ---------------- FORM ---------------- */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: user?.username ?? "",
      email: user?.email ?? "",
      bio: user?.bio ?? "",
    },
    onSubmit: async (values) => {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
        body: JSON.stringify(values),
      });

      const updated = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json());

      setUser(updated);
      window.location.reload();
    },
  });

  /* ---------------- AUTH LOAD ---------------- */
  React.useEffect(() => {
    const t = window.localStorage.getItem("token") || "";
    setToken(t);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${t}` },
    })
      .then((res) => res.json())
      .then(setUser);
  }, []);

  if (!user.id) return <PrismLoader />;

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* BACKGROUND LAYERS */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top, var(--primary-soft), transparent 40%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at bottom right, var(--secondary-soft), transparent 40%)",
          }}
        />
      </div>

      {/* CONTENT */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <ProfileHeader />

        <IdentitySection user={user} formik={formik} />

        <StatsSection />
      </main>
    </div>
  );
}
