"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "../types"

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
      {product.discount && (
        <Badge className="absolute top-1 left-1 md:top-2 md:left-2 bg-orange-500 hover:bg-orange-600 text-xs">
          -{product.discount}%
        </Badge>
      )}

      <CardContent className="p-2 md:p-4">
        <div className="aspect-square mb-2 md:mb-4 bg-gray-100 rounded-lg overflow-hidden">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <h3 className="font-medium text-xs md:text-sm mb-2 line-clamp-2 leading-tight">{product.name}</h3>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
              <span className="font-bold text-sm md:text-lg">{product.price} ₽</span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through text-xs md:text-sm">{product.originalPrice} ₽</span>
              )}
            </div>
          </div>

          <Button
            size="sm"
            onClick={() => onAddToCart(product)}
            className="w-full bg-green-600 hover:bg-green-700 text-xs md:text-sm h-8 md:h-9"
          >
            В корзину
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
