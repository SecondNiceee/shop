"use client"

import {
  Star,
  Baby,
  Clock,
  Milk,
  Fish,
  CroissantIcon as Bread,
  Coffee,
  Cake,
  Wine,
  Leaf,
  Heart,
  Snowflake,
  Gift,
  Home,
} from "lucide-react"

const categories = [
  { icon: Star, name: "Популярное" },
  { icon: Baby, name: "Дача и пикник" },
  { icon: Clock, name: "Фрукты, овощи и зелень" },
  { icon: Milk, name: "Молочная продукция" },
  { icon: Fish, name: "Мясо, птица и рыба" },
  { icon: Bread, name: "Хлеб и выпечка" },
  { icon: Coffee, name: "Готовая еда" },
  { icon: Cake, name: "Кондитерские изделия" },
  { icon: Wine, name: "Бакалея" },
  { icon: Leaf, name: "Вода и соки" },
  { icon: Heart, name: "Сухофрукты и орехи" },
  { icon: Snowflake, name: "Замороженные продукты" },
  { icon: Gift, name: "Для детей и животных" },
  { icon: Home, name: "Для дома" },
]

export function Categories() {
  return (
    <div className="bg-white py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop - horizontal scroll */}
        <div className="hidden md:flex items-center space-x-8 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 min-w-[80px] cursor-pointer hover:text-green-600 transition-colors"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-50">
                <category.icon className="h-6 w-6" />
              </div>
              <span className="text-xs text-center leading-tight">{category.name}</span>
            </div>
          ))}
        </div>

        {/* Mobile - grid layout */}
        <div className="md:hidden">
          <div className="grid grid-cols-4 gap-4">
            {categories.slice(0, 8).map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 cursor-pointer hover:text-green-600 transition-colors"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-50">
                  <category.icon className="h-5 w-5" />
                </div>
                <span className="text-xs text-center leading-tight">{category.name}</span>
              </div>
            ))}
          </div>

          {/* Show more button on mobile */}
          <div className="text-center mt-4">
            <button className="text-green-600 text-sm font-medium">Показать все категории</button>
          </div>
        </div>
      </div>
    </div>
  )
}
