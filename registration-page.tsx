"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, User, AlertCircle, CheckCircle } from "lucide-react"

type UserState = "unregistered" | "registered" | "loading" | "error"

export default function RegistrationPage() {
  const [userState, setUserState] = useState<UserState>("unregistered")
  const [userName, setUserName] = useState("Nick")

  const renderContent = () => {
    switch (userState) {
      case "unregistered":
        return (
          <div className="text-center space-y-4">
            <User className="mx-auto h-12 w-12 text-muted-foreground" />
            <div>
              <h2 className="text-xl font-semibold">Пользователь не зарегистрирован</h2>
              <p className="text-muted-foreground mt-2">Для доступа к функциям сайта необходимо зарегистрироваться</p>
            </div>
          </div>
        )

      case "registered":
        return (
          <div className="text-center space-y-4">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <div>
              <h2 className="text-xl font-semibold text-green-700">Пользователь зарегистрирован</h2>
              <p className="text-lg font-medium mt-2">Привет, {userName}!</p>
            </div>
          </div>
        )

      case "loading":
        return (
          <div className="text-center space-y-4">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-500" />
            <div>
              <h2 className="text-xl font-semibold">Загрузка...</h2>
              <p className="text-muted-foreground mt-2">Пожалуйста, подождите</p>
            </div>
          </div>
        )

      case "error":
        return (
          <div className="text-center space-y-4">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
            <div>
              <h2 className="text-xl font-semibold text-red-700">Ошибка</h2>
              <p className="text-muted-foreground mt-2">Произошла ошибка при обработке запроса</p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Статус регистрации</CardTitle>
            <CardDescription>Текущее состояние пользователя в системе</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">{renderContent()}</CardContent>
        </Card>

        {/* Демо кнопки для переключения состояний */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Демо управление (для разработки)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={() => setUserState("unregistered")}>
                Не зарегистрирован
              </Button>
              <Button variant="outline" size="sm" onClick={() => setUserState("registered")}>
                Зарегистрирован
              </Button>
              <Button variant="outline" size="sm" onClick={() => setUserState("loading")}>
                Загрузка
              </Button>
              <Button variant="outline" size="sm" onClick={() => setUserState("error")}>
                Ошибка
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
