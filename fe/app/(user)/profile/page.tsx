"use client";

import React from "react";
import { useFormik } from "formik";
import { PrismLoader } from "@/app/components/loadingScreen";

import ProfileHeader from "@/app/components/settings/profile/ProfileHeader";
import IdentitySection from "@/app/components/settings/profile/IdentitySection";
import StatsSection from "@/app/components/settings/profile/StatsSection";
import { toast } from "@/lib/toast/toast";
import { fetcher } from "@/lib/api/fetcher";

interface ProfileUser {
  id: number;
  username: string;
  email: string;
  bio: string;
  profileImageUrl?: string;
}

export default function ProfilePage() {
  const [token] = React.useState(() => typeof window !== "undefined" ? window.localStorage.getItem("token") || "" : "");
  const [user, setUser] = React.useState<ProfileUser>({} as ProfileUser);

  /* ---------------- FORM ---------------- */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: user?.username ?? "",
      email: user?.email ?? "",
      bio: user?.bio ?? "",
    },
    onSubmit: async (values) => {
      try {
        const { error } = await fetcher(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}`,
          {
            method: "PUT",
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token"),
            },
            body: values,
          },
        );

        if (error) {
          throw new Error(error);
        }

        toast.success("Profile updated successfully", "Success");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to update profile",
          "Update Failed",
        );
      }
      const { data: updated, error: refreshErr } = await fetcher(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (refreshErr) { toast.error(refreshErr, "Refresh Failed"); return; }
      if (updated) setUser(updated as ProfileUser);
      window.location.reload();
    },
  });

  /* ---------------- AUTH LOAD ---------------- */
  React.useEffect(() => {
    fetcher(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ data, error }) => {
      if (error) { toast.error(error, "Load Failed"); return; }
      if (data) setUser(data as ProfileUser);
    });
  }, [token]);

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
