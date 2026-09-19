import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/products/lead-management-system",
        destination: "/products",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
