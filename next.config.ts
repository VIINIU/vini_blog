// next.config.js
const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  experimental: {
    allowedDevOrigins: ['https://vini-blog.dev-lr.com'],
  },
  output : 'standalone'
};

module.exports = withMDX(nextConfig);
