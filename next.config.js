const { i18n } = require('./next-i18next.config.js')

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
  }
}

module.exports = nextConfig
