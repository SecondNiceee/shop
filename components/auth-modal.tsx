"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Lock, User, AlertCircle } from "lucide-react"
import { useUserStore } from "../store/auth-store"

export function AuthModal() {
  const { authState, setAuthState, login, register, isLoading, showAuthModal, setShowAuthModal, error, setError } =
    useUserStore()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  // Очищаем форму при закрытии модалки
  useEffect(() => {
    if (!showAuthModal) {
      setEmail("")
      setPassword("")
      setName("")
      setError(null)
    }
  }, [showAuthModal, setError])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      if (authState === "login") {
        await login(email, password)
      } else {
        await register(name, email, password)
      }
    } catch (err) {
      // Ошибка уже установлена в store
      console.error("Auth error:", err)
    }
  }

  const isLogin = authState === "login"

  return (
    <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
      <DialogContent className="sm:max-w-md w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-green-600 text-center">Ecomarket</DialogTitle>
          <p className="text-center text-muted-foreground text-sm md:text-base">
            {isLogin ? "Войдите в свой аккаунт" : "Создайте новый аккаунт"}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm">
                Имя *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-10 md:h-11"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm">
              Email *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-10 md:h-11"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm">
              Пароль *
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="Минимум 6 символов"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-10 md:h-11"
                required
                minLength={6}
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 h-10 md:h-11" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isLogin ? "Вход..." : "Регистрация..."}
              </>
            ) : isLogin ? (
              "Войти"
            ) : (
              "Зарегистрироваться"
            )}
          </Button>
        </form>

        <div className="text-center">
          <Button
            variant="link"
            onClick={() => {
              setAuthState(isLogin ? "register" : "login")
              setError(null)
            }}
            className="text-green-600 text-sm"
            disabled={isLoading}
          >
            {isLogin ? "Нет аккаунта? Зарегистрируйтесь" : "Уже есть аккаунт? Войдите"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
