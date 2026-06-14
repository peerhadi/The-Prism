"use client";

import Snackbar from "@/app/components/Snackbar";

export default function SnackbarWrapper({ open, message, onClose }: { open: boolean; message: string; onClose: () => void }) {
  return <Snackbar open={open} message={message} onClose={onClose} />;
}
