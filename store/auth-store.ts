"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { payloadClient } from "../lib/payload-client"
import type { User } from "../types/payload"

export type AuthState = "login" | "register" | "authenticated" | "loading"

interface AuthStore {
  user: User | null
  authState: AuthState
  isLoading: boolean
  showAuthModal: boolean
  error: string | null

  // Actions
  setUser: (user: User | null) => void
  setAuthState: (state: AuthState) => void
  setIsLoading: (loading: boolean) => void
  setShowAuthModal: (show: boolean) => void
  setError: (error: string | null) => void

  // Auth methods
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      authState: "login",
      isLoading: false,
      showAuthModal: false,
      error: null,

      setUser: (user) => set({ user }),
      setAuthState: (authState) => set({ authState }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setShowAuthModal: (showAuthModal) => set({ showAuthModal }),
      setError: (error) => set({ error }),

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })

        try {
          const response = await payloadClient.login({ email, password })

          if (response.user) {
            set({
              user: response.user,
              authState: "authenticated",
              showAuthModal: false,
              isLoading: false,
            })
          } else {
            throw new Error("Не удалось получить данные пользователя")
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Ошибка авторизации",
            isLoading: false,
          })
          throw error
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null })

        try {
          const response = await payloadClient.register({
            name,
            email,
            password,
            passwordConfirm: password,
          })

          if (response.user) {
            set({
              user: response.user,
              authState: "authenticated",
              showAuthModal: false,
              isLoading: false,
            })
          } else {
            throw new Error("Не удалось создать аккаунт")
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Ошибка регистрации",
            isLoading: false,
          })
          throw error
        }
      },

      logout: async () => {
        set({ isLoading: true })

        try {
          await payloadClient.logout()
        } catch (error) {
          console.error("Ошибка при выходе:", error)
        } finally {
          set({
            user: null,
            authState: "login",
            showAuthModal: false,
            isLoading: false,
            error: null,
          })
        }
      },

      checkAuth: async () => {
        if (!payloadClient.hasToken()) {
          set({ user: null, authState: "login" })
          return
        }

        set({ isLoading: true })

        try {
          const user = await payloadClient.getCurrentUser()

          if (user) {
            set({
              user,
              authState: "authenticated",
              isLoading: false,
            })
          } else {
            set({
              user: null,
              authState: "login",
              isLoading: false,
            })
          }
        } catch (error) {
          console.error("Ошибка проверки авторизации:", error)
          set({
            user: null,
            authState: "login",
            isLoading: false,
          })
        }
      },

      updateProfile: async (data: Partial<User>) => {
        const { user } = get()
        if (!user) throw new Error("Пользователь не авторизован")

        set({ isLoading: true, error: null })

        try {
          const updatedUser = await payloadClient.updateProfile(user.id, data)
          set({
            user: updatedUser,
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Ошибка обновления профиля",
            isLoading: false,
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
