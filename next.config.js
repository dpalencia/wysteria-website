/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GALLERY_BUCKET_NAME: 'wysteria-image-gallery',
  },
  images: {
    domains: ['storage.googleapis.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/wysteria-gallery/**',
      },
    ],
  },
  // Disable Turbopack to use Webpack (for compatibility)
  experimental: {
    turbo: false,
  },
};

module.exports = nextConfig;