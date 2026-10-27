import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "atlantaworld.in",
      },
      {
        protocol: "https",
        hostname: "www.atlantaworld.in",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/admin/products/:file",
        destination: "/api/media/:file",
      },
    ];
  },
};

export default nextConfig;
