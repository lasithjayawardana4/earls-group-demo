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
        hostname: "d3a2q5al71qg9.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "*.bstatic.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "*.hotels-colombo.com",
      },
      {
        protocol: "https",
        hostname: "www.earlshotels.com",
      },
      {
        protocol: "https",
        hostname: "*.kandy-hotels.com",
      },
      {
        protocol: "https",
        hostname: "images.trvl-media.com",
      },
    ],
  },
};

export default nextConfig;
