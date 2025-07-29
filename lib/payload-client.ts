"use client"

import type { User, AuthResponse, LoginCredentials, RegisterCredentials } from "../types/payload"

const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:3001"

class PayloadClient {
  private baseURL: string
  private token: string | null = null

  constructor() {
    this.baseURL = `${PAYLOAD_API_URL}/api`
    // Получаем токен из localStorage при инициализации
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("payload-token")
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(this.token && { Authorization: `JWT ${this.token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Payload API Error:", error)
      throw error
    }
  }

  // Регистрация пользователя
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>("/users", {
      method: "POST",
      body: JSON.stringify(credentials),
    })

    if (response.token) {
      this.setToken(response.token)
    }

    return response
  }

  // Авторизация пользователя
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>("/users/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })

    if (response.token) {
      this.setToken(response.token)
    }

    return response
  }

  // Выход из системы
  async logout(): Promise<void> {
    try {
      await this.request("/users/logout", {
        method: "POST",
      })
    } finally {
      this.clearToken()
    }
  }

  // Получение текущего пользователя
  async getCurrentUser(): Promise<User | null> {
    if (!this.token) return null

    try {
      const response = await this.request<{ user: User }>("/users/me")
      return response.user
    } catch (error) {
      // Если токен недействителен, очищаем его
      this.clearToken()
      return null
    }
  }

  // Обновление профиля пользователя
  async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    const response = await this.request<User>(`/users/${userId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
    return response
  }

  // Сброс пароля
  async forgotPassword(email: string): Promise<{ message: string }> {
    return await this.request("/users/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  }

  // Установка токена
  private setToken(token: string): void {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("payload-token", token)
    }
  }

  // Очистка токена
  private clearToken(): void {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("payload-token")
    }
  }

  // Проверка наличия токена
  hasToken(): boolean {
    return !!this.token
  }
}

export const payloadClient = new PayloadClient()
