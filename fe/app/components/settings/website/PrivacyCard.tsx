"use client";

import React from "react";
import CyberCard from "./CyberCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
export default function PrivacyCard({
  passwordForm,
  setPasswordForm,
  changePassword,
  deleteAccount,
}: {
  passwordForm: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  setPasswordForm: React.Dispatch<
    React.SetStateAction<{
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }>
  >;
  changePassword: (current: string, newPwd: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
}) {
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
                setPasswordForm((p) => ({
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
                setPasswordForm((p) => ({
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
                setPasswordForm((p) => ({
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
              onClick={() =>
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

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="h-12 w-[150px] rounded-xl px-8 text-[var(--danger)] flex gap-2 hover:opacity-60"
            >
              <Trash />
              Delete Account
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent
            className="
    max-w-md
    border
    rounded-2xl
    backdrop-blur-xl
    p-0
    overflow-hidden
  "
            style={{
              background: "var(--modal)",
              borderColor: "var(--danger-border)",
              boxShadow: "0 0 0 1px var(--danger-border)",
            }}
          >
            {/* TOP BAR */}
            <div
              className="h-1 w-full"
              style={{
                background:
                  "linear-gradient(90deg,var(--danger),transparent,var(--danger))",
              }}
            />

            <div className="p-6">
              <AlertDialogHeader>
                <div
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{
                    background: "var(--danger-soft)",
                    border: "1px solid var(--danger-border)",
                  }}
                >
                  <Trash size={24} style={{ color: "var(--danger)" }} />
                </div>

                <AlertDialogTitle
                  className="text-2xl font-black"
                  style={{ color: "var(--text-primary)" }}
                >
                  Delete Account
                </AlertDialogTitle>

                <AlertDialogDescription
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  This action is permanent and cannot be undone. All account
                  data, preferences, saved content, and settings will be removed
                  forever.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="mt-6 border-0">
                <AlertDialogCancel
                  style={{
                    background: "var(--surface)",
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                >
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={deleteAccount}
                  style={{
                    background: "var(--danger)",
                    color: "white",
                  }}
                >
                  Delete Forever
                </AlertDialogAction>
              </AlertDialogFooter>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
