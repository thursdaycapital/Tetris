/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/.well-known/farcaster.json',
        destination: 'https://api.farcaster.xyz/miniapps/hosted-manifest/019aed6f-49da-c5f3-1913-49746a3ba94a',
        permanent: false, // 307 临时重定向
      },
    ];
  },
}

module.exports = nextConfig

