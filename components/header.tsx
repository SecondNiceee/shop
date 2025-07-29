"use client"

import { Search, ShoppingCart, User, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuthStore } from "../store/auth-store"

interface HeaderProps {
  cartItemsCount: number
}

export function Header({ cartItemsCount }: HeaderProps) {
  const { user, logout, setShowAuthModal } = useAuthStore()

  const handleUserClick = () => {
    if (!user) {
      setShowAuthModal(true)
    }
  }

  return (
    <div>
      {/* Top bar */}
      <div className="bg-gray-100 px-4 py-2 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-gray-600">Нажмите, чтобы вернуться. Удерживайте, чтобы просмотреть историю.</div>
          <div className="flex items-center space-x-6 text-gray-600">
            <span>Бережём природу</span>
            <span>О нас</span>
            <span>Блог</span>
            <span>Доставка</span>
            <span>Оплата</span>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />8 (495) 159-90-09
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white border-b px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleUserClick}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </Button>
              <h1 className="text-2xl font-bold ml-3">Ecomarket</h1>
            </div>

            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Поиск по товарам" className="pl-10" />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
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
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>

                {user && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Привет, {user.name}!</span>
                    <Button variant="ghost" size="sm" onClick={logout}>
                      Выйти
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
