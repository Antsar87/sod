/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        // pathname: '/my-bucket/**',
      },
    ],
  },
};

module.exports = nextConfig;
