"use client"

import { useEffect } from "react"
import { useUserStore } from "../store/auth-store"
import { useCart } from "../hooks/useCart"
import { AuthModal } from "../components/auth-modal"
import { Header } from "../components/header"
import { Categories } from "../components/categories"
import { ProductCard } from "../components/product-card"
import { HeroBanner } from "../components/hero-banner"
import { products } from "../data/products"
import { Button } from "@/components/ui/button"

export default function EcomarketApp() {
  const { user, showAuthModal, findMe } = useUserStore()
  const { addToCart, getTotalItems } = useCart()

  // Проверяем авторизацию при загрузке приложения
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await findMe()
      } catch (error) {
        // Пользователь не авторизован, это нормально
        console.log("User not authenticated")
      }
    }

    checkAuth()
  }, [findMe])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {showAuthModal && <AuthModal />}

      <HeroBanner />

      <Categories />

      {/* Popular Products */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold">ПОПУЛЯРНОЕ</h2>
          <Button variant="link" className="text-green-600 text-sm md:text-base">
            +29 ещё →
          </Button>
        </div>

        {/* Responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </div>

      {/* User welcome message - mobile optimized */}
      {user && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 md:p-4">
            <p className="text-green-800 text-sm md:text-base">
              Добро пожаловать, <strong>{user.name || user.email}</strong>!{user.role === "admin" && " (Администратор)"}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
