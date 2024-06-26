/** @type {import('next').NextConfig} */

var devconfig = {};
try {
devconfig = require('./dev.next.config.js')
} catch (ex) {}


const nextConfig = {
  basePath: '/ad',
  crossOrigin: 'use-credentials',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'dev-mitech-ai.fe153dab94c62b5c9235e33427e8c87e.r2.cloudflarestorage.com'
      },
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh'
      }
    ]
  },
  ...devconfig
};

module.exports = nextConfig;
