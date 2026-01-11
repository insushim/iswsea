import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'www.woodinsea.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.woodinsea.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'woodinsea.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'woodinsea.com',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
