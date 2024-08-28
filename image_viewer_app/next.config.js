/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ygoprodeck.com',
        pathname: '/images/**',
      },
    ],
  },
  serverRuntimeConfig: {
    myPort: process.env.PORT || 3000, // 環境変数PORTが設定されていない場合は3000を使用
  },
  output: 'standalone',
}

module.exports = nextConfig