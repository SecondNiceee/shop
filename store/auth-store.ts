"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { request } from "../shared/utils/request"
import type { User } from "../payload-types"

interface RequestError extends Error {
  status?: number
  message: string
}

export type AuthState = "login" | "register" | "authenticated" | "loading"

interface UserStore {
  user: User | null
  authState: AuthState
  isLoading: boolean
  error: RequestError | null
  showAuthModal: boolean

  // Actions
  setUser: (user: User | null) => void
  setAuthState: (state: AuthState) => void
  setIsLoading: (loading: boolean) => void
  setError: (error: RequestError | null) => void
  setShowAuthModal: (show: boolean) => void

  // Auth methods
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  findMe: () => Promise<void>
  logout: () => Promise<void>
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      authState: "login",
      isLoading: false,
      error: null,
      showAuthModal: false,

      setUser: (user) => set({ user }),
      setAuthState: (authState) => set({ authState }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setShowAuthModal: (showAuthModal) => set({ showAuthModal }),

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })

        try {
          const result = await request({
            method: "POST",
            url: "/api/users/login",
            body: { email, password },
            credentials: true,
          })

          console.log("Login result:", result)

          set({
            user: result.user,
            authState: "authenticated",
            showAuthModal: false,
            isLoading: false,
            error: null,
          })
        } catch (e) {
          const error = e as RequestError
          set({
            isLoading: false,
            error: {
              message: error.message || "Ошибка авторизации",
              name: error.name || "LoginError",
              status: error.status || 400,
            },
          })
          throw error
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null })

        try {
          const result = await request({
            method: "POST",
            url: "/api/users",
            body: { name, email, password },
            credentials: true,
          })

          console.log("Register result:", result)

          set({
            user: result.user || result,
            authState: "authenticated",
            showAuthModal: false,
            isLoading: false,
            error: null,
          })
        } catch (e) {
          const error = e as RequestError
          set({
            isLoading: false,
            error: {
              message: error.message || "Ошибка регистрации",
              name: error.name || "RegisterError",
              status: error.status || 400,
            },
          })
          throw error
        }
      },

      findMe: async () => {
        set({ isLoading: true, error: null })

        try {
          const result = await request({
            method: "GET",
            url: "/api/users/me",
            credentials: true,
          })

          set({
            user: result.user,
            authState: "authenticated",
            isLoading: false,
            error: null,
          })
        } catch (e) {
          const error = e as RequestError
          set({
            user: null,
            authState: "login",
            isLoading: false,
            error: {
              message: error.message || "Пользователь не авторизован",
              name: error.name || "NotAuthorized",
              status: error.status || 401,
            },
          })
          throw error
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null })

        try {
          await request({
            method: "POST",
            url: "/api/users/logout",
            credentials: true,
          })

          set({
            user: null,
            authState: "login",
            showAuthModal: false,
            isLoading: false,
            error: null,
          })
        } catch (e) {
          const error = e as RequestError
          // Даже если logout не удался на сервере, очищаем локальное состояние
          set({
            user: null,
            authState: "login",
            showAuthModal: false,
            isLoading: false,
            error: {
              message: error.message || "Ошибка при выходе",
              name: error.name || "LogoutError",
              status: error.status || 500,
            },
          })
          throw error
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        authState: state.authState,
      }),
    },
  ),
)
