"use client";

import dynamic from "next/dynamic";

// Create a client-only version of the Sparkles component
const ClientSparkles = dynamic(
  () => import("./sparkles").then(mod => mod.Sparkles),
  { ssr: false }
);

export { ClientSparkles };
