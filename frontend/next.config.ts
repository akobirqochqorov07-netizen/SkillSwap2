import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/SkillSwap2",
  assetPrefix: "/SkillSwap2/",
  trailingSlash: true, // 🔥 MUHIM
};

export default nextConfig;