/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.unshift({
      resourceQuery: /raw/,
      type: 'asset/source',
    });

    return config;
  },
};

module.exports = nextConfig;
