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
        <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">-{product.discount}%</Badge>
      )}

      <CardContent className="p-4">
        <div className="aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg">{product.price} ₽</span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-sm">{product.originalPrice} ₽</span>
            )}
          </div>

          <Button size="sm" onClick={() => onAddToCart(product)} className="bg-green-600 hover:bg-green-700">
            В корзину
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
