import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.gr-assets.com",
        protocol: "https",
        pathname: "/images/**",
      },
      {
        hostname: "covers.openlibrary.org",
        protocol: "https",
        pathname: "/b/**",
      }
    ],
  },
};

export default nextConfig;
