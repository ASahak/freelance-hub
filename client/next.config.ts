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
  // eslint-disable-next-line
  async rewrites() {
    const apiUrl =
      process.env.API_GATEWAY_URL ||
      process.env.INTERNAL_API_URL ||
      'http://api-gateway:5000';

    console.log('Proxy Destination:', apiUrl);
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
