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
      // The Zirakpur SEO page lives at the flat location URL. This alias used
      // to 404; point it at the real page so any shared link or citation
      // resolves instead of landing on the not-found page.
      {
        source: "/services/seo-services-in-zirakpur",
        destination: "/seo-services-zirakpur",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
