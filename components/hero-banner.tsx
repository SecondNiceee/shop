"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    title: "Холодные товары недели!",
    subtitle1: "АРБУЗ ХОЛОДНЫЙ Дагестан",
    subtitle2: "ДЫНЯ КОЛХОЗИЦА Узбекистан",
    bgColor: "from-yellow-200 via-orange-200 to-red-200",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: 2,
    title: "Свежие овощи каждый день!",
    subtitle1: "ПОМИДОРЫ сочные Краснодар",
    subtitle2: "ОГУРЦЫ хрустящие Подмосковье",
    bgColor: "from-green-200 via-lime-200 to-emerald-200",
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: 3,
    title: "Экзотические фрукты!",
    subtitle1: "МАНГО спелое Таиланд",
    subtitle2: "АВОКАДО нежное Израиль",
    bgColor: "from-purple-200 via-pink-200 to-rose-200",
    image: "/placeholder.svg?height=300&width=600",
  },
]

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[currentSlide]

  return (
    <div className={`bg-gradient-to-r ${slide.bgColor} py-12 relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="flex-1 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{slide.title}</h2>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-red-600">{slide.subtitle1}</div>
              <div className="text-2xl font-bold text-yellow-600">{slide.subtitle2}</div>
            </div>
          </div>

          <div
            className="absolute right-0 top-0 h-full w-1/2 bg-contain bg-no-repeat bg-right transition-all duration-500"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          ></div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-gray-800" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
