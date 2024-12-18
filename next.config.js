/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GITHUB_TOKEN: "",
  },
  experimental: {
    turbo: {
      // ...
    },
  },
};

module.exports = nextConfig;
