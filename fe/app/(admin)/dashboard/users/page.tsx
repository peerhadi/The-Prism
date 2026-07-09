"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Snackbar from "@/app/components/Snackbar";
import { motion } from "framer-motion";
import Breadcrumbs from "@/app/components/Breadcrumb";
import { fetcher } from "@/lib/api/fetcher";

type User = {
  id: string;
  username: string;
  email: string;
  bio?: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    fetcher(`${process.env.NEXT_PUBLIC_API_URL}/api/users`).then(
      ({ data, error }) => {
        if (error) return;
        if (data) setUsers(data as User[]);
        setToast(true);
      },
    );
  }, []);

  return (
    <div
      className="min-h-screen p-10"
      style={{
        background: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <Breadcrumbs items={[{ label: "Users" }]} />

      <Snackbar
        open={toast}
        message="User spectrum loaded"
        onClose={() => setToast(false)}
      />

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black" style={{ color: "var(--primary)" }}>
          USERS GRID
        </h1>

        <Link
          href="/dashboard/users/add"
          className="px-5 py-2 font-bold transition"
          style={{
            border: "1px solid var(--primary-border)",
            background: "var(--primary-soft)",
            color: "var(--primary)",
          }}
        >
          + NEW USER
        </Link>
      </div>

      <div className="grid gap-4">
        {users.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="rounded-2xl p-6 transition"
            style={{
              border: "1px solid var(--card-border)",
              background: "var(--card)",
            }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2
                  className="text-xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {user.username}
                </h2>

                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {user.email}
                </p>
              </div>

              <Link
                href={`/dashboard/users/${user.id}`}
                style={{ color: "var(--primary)" }}
              >
                edit →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
