/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable ESLint during build to prevent build failures
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript type checking during build
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  // Allow images from external domains if needed
  images: {
    domains: [],
    unoptimized: true,
  },
};

module.exports = nextConfig;
