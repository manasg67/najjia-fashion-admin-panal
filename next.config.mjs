import { resolve } from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn-icons-png.flaticon.com'],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = resolve('./');
    return config;
  },
};

export default nextConfig;
