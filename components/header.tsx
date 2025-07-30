"use client"

import { Search, ShoppingCart, User, MapPin, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useUserStore } from "../store/auth-store"
import { useState } from "react"

export function Header() {
  const { user, logout, setShowAuthModal } = useUserStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleUserClick = () => {
    if (!user) {
      setShowAuthModal(true)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <header>
      {/* Main header */}
      <div className="bg-white border-b px-4 py-4">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="default"
                size="sm"
                onClick={handleUserClick}
                className="p-2 bg-green-400 hover:bg-green-300 rounded-full"
              >
                <User className="h-4 w-4 text-white" />
              </Button>
              <h1 className="text-2xl font-bold ml-3">Ecomarket</h1>
            </div>

            <div className="max-w-sm w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input type="text" placeholder="Поиск по товарам" className="pl-10 h-11 w-full" />
              </div>
            </div>

            <Button variant="outline" className="flex h-11 items-center space-x-2 bg-transparent">
              <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm"></div>
              </div>
              <span>Каталог</span>
            </Button>

            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-600" />
              <div>
                <div className="text-sm font-medium">Выберите адрес доставки</div>
                <div className="text-xs text-gray-500">И мы рассчитаем время и стоимость доставки</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm">Мин. сумма заказа 2000 ₽</div>
                <div className="text-xs text-gray-500">Доставим за 299 ₽</div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {2 > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {2}
                    </Badge>
                  )}
                </Button>

                {user ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Привет, {user.name || user.email}!</span>
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                      Выйти
                    </Button>
                  </div>
                ) : (
                  <Button variant="ghost" size="sm" onClick={handleUserClick}>
                    Войти
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Top row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleUserClick}
                  className="p-2 bg-green-400 hover:bg-green-300 rounded-full"
                >
                  <User className="h-4 w-4 text-white" />
                </Button>
                <h1 className="text-xl font-bold ml-2">Ecomarket</h1>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {2 > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {2}
                    </Badge>
                  )}
                </Button>

                <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Search row */}
            <div className="mb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input type="text" placeholder="Поиск по товарам" className="pl-10 h-10 w-full" />
              </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center mr-2">
                    <div className="w-3 h-3 bg-white rounded-sm"></div>
                  </div>
                  Каталог
                </Button>

                <div className="flex items-center space-x-2 p-2">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <div>
                    <div className="text-sm font-medium">Выберите адрес доставки</div>
                    <div className="text-xs text-gray-500">И мы рассчитаем время и стоимость</div>
                  </div>
                </div>

                {user ? (
                  <div className="flex items-center justify-between p-2">
                    <span className="text-sm">Привет, {user.name || user.email}!</span>
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                      Выйти
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" className="w-full bg-transparent" onClick={handleUserClick}>
                    Войти
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
