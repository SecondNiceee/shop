export interface User {
  id: string
  email: string
  name: string
}

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  category: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export type AuthState = "login" | "register" | "authenticated" | "loading"
