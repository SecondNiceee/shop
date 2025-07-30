import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Включаем новые экспериментальные функции Next.js 15
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },

  // Настройки для изображений
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placeholder.svg",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
      },
    ],
    unoptimized: true, // Обновлено
  },

  // Настройки для API routes
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:3001"}/api/:path*`,
      },
    ]
  },

  // Настройки для CORS
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
          },
        ],
      },
    ]
  },

  eslint: {
    ignoreDuringBuilds: true, // Добавлено
  },
  typescript: {
    ignoreBuildErrors: true, // Добавлено
  },
}

export default withPayload(nextConfig)