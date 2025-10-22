import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    // This is the magic that enables polling
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300, // Add a delay before rebuilding
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '*',
      },
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
};

export default nextConfig;
