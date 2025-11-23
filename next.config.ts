import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mainfacts.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "restcountries.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
