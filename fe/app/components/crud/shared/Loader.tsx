"use client";

import React from "react";
import { PrismLoader } from "@/app/components/loadingScreen";

export default function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <PrismLoader />
    </div>
  );
}
