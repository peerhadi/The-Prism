"use client";

import Snackbar from "@/app/components/Snackbar";

export default function SnackbarWrapper({ open, message, onClose }: any) {
  return <Snackbar open={open} message={message} onClose={onClose} />;
}
