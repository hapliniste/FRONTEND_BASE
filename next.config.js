/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['https://MYSERVERURL.supabase.co'],
  },
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true
    }
  }
}

module.exports = nextConfig
