import process from "node:process";
import { withSentryConfig } from "@sentry/nextjs";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@sportycoon/ui"],
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  env: {
    _next_intl_trailing_slash: "false",
  },
};

export default withSentryConfig(withNextIntl(nextConfig), {
  org: "sportycoon",
  project: "sportycoon-admin",

  silent: !process.env.CI,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
