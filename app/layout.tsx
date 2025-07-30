import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "Ecomarket - Интернет-магазин продуктов",
  description: "Свежие продукты с доставкой на дом. Фрукты, овощи, молочные продукты и многое другое.",
  keywords: ["продукты", "доставка", "фрукты", "овощи", "интернет-магазин"],
  authors: [{ name: "Ecomarket Team" }],
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
