import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c.animaapp.com",
      },
    ],
  },
};

export default nextConfig;
