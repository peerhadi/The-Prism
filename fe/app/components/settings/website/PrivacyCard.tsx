"use client";

import React from "react";
import CyberCard from "./CyberCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export default function PrivacyCard({
  passwordForm,
  setPasswordForm,
  changePassword,
  deleteAccount,
}: any) {
  return (
    <div className="flex flex-col gap-6">
      <CyberCard title="Privacy & Account" icon={Shield}>
        <div className="mt-8 pt-4">
          {/* HEADER TEXT */}
          <div className="mb-6">
            <p
              className="text-[10px] font-black tracking-[0.3em] uppercase"
              style={{ color: "var(--primary)" }}
            >
              Security
            </p>

            <h3
              className="mt-2 text-2xl font-black tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Change Password
            </h3>

            <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
              Update your password to keep your account secure.
            </p>
          </div>

          {/* INPUTS */}
          <div className="space-y-5">
            <Input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm((p: any) => ({
                  ...p,
                  currentPassword: e.target.value,
                }))
              }
              className="h-12 rounded-xl"
              style={{
                background: "var(--input-bg)",
                border: "1px solid var(--input-border)",
                color: "var(--text-primary)",
              }}
              placeholder="Current Password"
            />

            <Input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm((p: any) => ({
                  ...p,
                  newPassword: e.target.value,
                }))
              }
              className="h-12 rounded-xl"
              style={{
                background: "var(--input-bg)",
                border: "1px solid var(--input-border)",
                color: "var(--text-primary)",
              }}
              placeholder="New Password"
            />

            <Input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                setPasswordForm((p: any) => ({
                  ...p,
                  confirmPassword: e.target.value,
                }))
              }
              className="h-12 rounded-xl"
              style={{
                background: "var(--input-bg)",
                border: "1px solid var(--input-border)",
                color: "var(--text-primary)",
              }}
              placeholder="Confirm New Password"
            />
          </div>

          {/* BUTTON */}
          <div className="mt-8 flex justify-end">
            <Button
              onClick={(e) =>
                changePassword(
                  passwordForm.currentPassword,
                  passwordForm.newPassword,
                )
              }
              className="h-12 min-w-[180px] rounded-xl px-8"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              Change Password
            </Button>
          </div>
        </div>
      </CyberCard>

      {/* DANGER ZONE */}
      <div className="mt-10 pt-8">
        <h3
          className="mb-2 text-lg font-bold"
          style={{ color: "var(--danger)" }}
        >
          Danger Zone
        </h3>

        <p className="mb-4 text-sm" style={{ color: "var(--text-muted)" }}>
          Permanently delete your account and all associated data.
        </p>

        <Button
          variant="destructive"
          onClick={deleteAccount}
          className="h-12 w-[180px] rounded-xl px-8"
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
}
