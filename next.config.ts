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
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
