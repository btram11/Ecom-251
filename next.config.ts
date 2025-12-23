import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': require('path').resolve(__dirname, 'src/components'),
      '@features': require('path').resolve(__dirname, 'src/features'),
      '@utils': require('path').resolve(__dirname, 'src/utils'),
    };
    return config;
  },
};

export default nextConfig;
