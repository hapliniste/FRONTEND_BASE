const { i18n } = require('./next-i18next.config.js')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true
    }
  },
  images: {
    domains: ['placehold.co']
  },
  // Add webpack configuration for HLS files
  webpack: (config, { isServer }) => {
    // Add a rule for .ts video segments
    config.module.rules.push({
      test: /\.ts$/,
      include: /public\/portfolio/,
      type: 'asset/resource'
    });
    
    return config;
  }
}

module.exports = withBundleAnalyzer(nextConfig)
