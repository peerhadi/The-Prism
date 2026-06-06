"use client";

import React from "react";
import CyberCard from "./CyberCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PrivacyCard({
  passwordForm,
  setPasswordForm,
  changePassword,
  deleteAccount,
}: any) {
  return (
    <div className="flex flex-col gap-6">
      <CyberCard
        title="Privacy & Account"
        icon={require("lucide-react").Shield}
      >
        <div className="mt-8 pt-4">
          <div className="mb-6">
            <p className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
              Security
            </p>

            <h3 className="mt-2 text-2xl font-black tracking-tight">
              Change Password
            </h3>

            <p className="mt-2 text-sm text-white/40">
              Update your password to keep your account secure.
            </p>
          </div>

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
              className="h-12 rounded-xl border-white/10 bg-black/30"
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
              className="h-12 rounded-xl border-white/10 bg-black/30"
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
              className="h-12 rounded-xl border-white/10 bg-black/30"
              placeholder="Confirm New Password"
            />
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              onClick={changePassword}
              className="h-12 min-w-[180px] rounded-xl bg-cyan-500 px-8 text-black hover:bg-cyan-400"
            >
              Change Password
            </Button>
          </div>
        </div>
      </CyberCard>

      <div className="mt-10 pt-8">
        <h3 className="mb-2 text-lg font-bold text-red-400">Danger Zone</h3>

        <p className="mb-4 text-sm text-white/40">
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
