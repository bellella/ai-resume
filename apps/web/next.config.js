/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.unshift({
      resourceQuery: /raw/,
      type: 'asset/source',
    });

    return config;
  },
  images: {
    domains: ['ai-resume-images.s3.ca-central-1.amazonaws.com'],
  },
};

module.exports = nextConfig;
