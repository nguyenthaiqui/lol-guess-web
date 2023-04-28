/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: 'http://localhost:3000',
    PATH: {
      CHAMPION: 'champion',
    },
  },
};

module.exports = nextConfig;
