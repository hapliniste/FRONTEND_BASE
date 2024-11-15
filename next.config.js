/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
