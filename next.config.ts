import type { NextConfig } from "next";
import { type RemotePattern } from "next/dist/shared/lib/image-config";

const remotePatterns: RemotePattern[] | undefined = [
  {
    hostname: "i.gr-assets.com",
    protocol: "https",
    pathname: "/images/**",
  },
  {
    hostname: "covers.openlibrary.org",
    protocol: "https",
    pathname: "/b/**",
  },
  {
    hostname: "covers.openlibrary.org",
    protocol: "https",
    pathname: "/a/**",
  },
  {
    hostname: "images.unsplash.com",
    protocol: "https",
    pathname: "/**",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
