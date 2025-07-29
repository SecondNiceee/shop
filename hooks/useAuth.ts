"use client"

import { useState, useEffect } from "react"
import type { User, AuthState } from "../types"

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>("login")
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Проверяем сохраненного пользователя при загрузке
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setAuthState("authenticated")
    }
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    // Имитация запроса к серверу
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Простая проверка для демо
    if (email && password.length >= 6) {
      const newUser: User = {
        id: "1",
        email,
        name: email.split("@")[0],
      }
      setUser(newUser)
      setAuthState("authenticated")
      localStorage.setItem("user", JSON.stringify(newUser))
    } else {
      throw new Error("Неверный email или пароль")
    }
    setIsLoading(false)
  }

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    // Имитация запроса к серверу
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email && password.length >= 6 && name) {
      const newUser: User = {
        id: "1",
        email,
        name,
      }
      setUser(newUser)
      setAuthState("authenticated")
      localStorage.setItem("user", JSON.stringify(newUser))
    } else {
      throw new Error("Заполните все поля корректно")
    }
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    setAuthState("login")
    localStorage.removeItem("user")
  }

  return {
    authState,
    setAuthState,
    user,
    isLoading,
    login,
    register,
    logout,
  }
}
