import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Cloudflare Pages 정적 배포용
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
