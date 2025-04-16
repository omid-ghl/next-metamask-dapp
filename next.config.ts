// next.config.ts
import type { NextConfig } from "next";
import { i18n } from "./next-i18next.config";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n, // Adding i18n config to your Next.js configuration
};

export default nextConfig;
