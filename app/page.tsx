"use client"

import { useEffect } from "react"
import { useAuthStore } from "../store/auth-store"
import { useCart } from "../hooks/useCart"
import { AuthModal } from "../components/auth-modal"
import { Header } from "../components/header"
import { Categories } from "../components/categories"
import { ProductCard } from "../components/product-card"
import { HeroBanner } from "../components/hero-banner"
import { products } from "../data/products"
import { Button } from "@/components/ui/button"

export default function EcomarketApp() {
  const { user, showAuthModal, checkAuth } = useAuthStore()
  const { addToCart, getTotalItems } = useCart()

  // Проверяем авторизацию при загрузке приложения
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemsCount={getTotalItems()} />

      {showAuthModal && <AuthModal />}

      <HeroBanner />

      <Categories />

      {/* Popular Products */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">ПОПУЛЯРНОЕ</h2>
          <Button variant="link" className="text-green-600">
            +29 ещё →
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </div>

      {/* Показываем приветствие для авторизованных пользователей */}
      {user && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">
              Добро пожаловать, <strong>{user.name}</strong>!{user.role === "admin" && " (Администратор)"}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
