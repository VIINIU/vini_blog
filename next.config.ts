// next.config.js
const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['https://vini-blog.dev-lr.com'],
    },
  },
  output: 'standalone',
  async headers() {
    return [{
      source: '/sw.js',
      headers: [
        { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
        { key: 'Content-Type', value: 'application/javascript; charset=utf-8' },
      ],
    }];
  },
};

module.exports = withMDX(nextConfig);
