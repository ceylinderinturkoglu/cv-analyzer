/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GITHUB_TOKEN: "BURAYA_API_KEY_YAZIN",
  },
  experimental: {
    turbo: {
      // ...
    },
  },
};

module.exports = nextConfig;
