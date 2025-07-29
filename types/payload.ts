export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  phone?: string
  address?: {
    street?: string
    city?: string
    zipCode?: string
  }
  preferences?: {
    newsletter?: boolean
    notifications?: boolean
  }
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  message?: string
  user?: User
  token?: string
  exp?: number
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  passwordConfirm?: string
}
