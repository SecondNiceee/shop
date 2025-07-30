interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  url: string
  body?: any
  headers?: Record<string, string>
  credentials?: boolean
  timeout?: number
}

interface RequestError extends Error {
  status?: number
  statusText?: string
}

class ApiError extends Error implements RequestError {
  status?: number
  statusText?: string

  constructor(message: string, status?: number, statusText?: string) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.statusText = statusText
  }
}

export async function request<T = any>(options: RequestOptions): Promise<T> {
  const { method = "GET", url, body, headers = {}, credentials = false, timeout = 10000 } = options

  // Определяем базовый URL
  const baseURL = process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:3001"
  const fullUrl = url.startsWith("http") ? url : `${baseURL}${url}`

  // Настройка заголовков
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  }

  // Объединяем заголовки
  const finalHeaders = { ...defaultHeaders, ...headers }

  // Настройка fetch опций
  const fetchOptions: RequestInit = {
    method,
    headers: finalHeaders,
    ...(credentials && { credentials: "include" }),
  }

  // Добавляем body для методов, которые его поддерживают
  if (body && ["POST", "PUT", "PATCH"].includes(method)) {
    if (typeof body === "object" && !(body instanceof FormData)) {
      fetchOptions.body = JSON.stringify(body)
    } else {
      fetchOptions.body = body
      // Удаляем Content-Type для FormData, браузер установит его автоматически
      if (body instanceof FormData) {
        delete finalHeaders["Content-Type"]
      }
    }
  }

  // Создаем AbortController для таймаута
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  fetchOptions.signal = controller.signal

  try {
    const response = await fetch(fullUrl, fetchOptions)

    // Очищаем таймаут при успешном ответе
    clearTimeout(timeoutId)

    // Проверяем статус ответа
    if (!response.ok) {
      let errorMessage = `HTTP Error: ${response.status} ${response.statusText}`

      try {
        // Пытаемся получить детали ошибки из ответа
        const errorData = await response.json()
        if (errorData.message) {
          errorMessage = errorData.message
        } else if (errorData.error) {
          errorMessage = errorData.error
        } else if (errorData.errors && Array.isArray(errorData.errors)) {
          errorMessage = errorData.errors.map((err: any) => err.message || err).join(", ")
        }
      } catch {
        // Если не удалось распарсить JSON, используем стандартное сообщение
      }

      throw new ApiError(errorMessage, response.status, response.statusText)
    }

    // Проверяем, есть ли контент для парсинга
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      return await response.json()
    }

    // Если не JSON, возвращаем текст
    const text = await response.text()
    return text as unknown as T
  } catch (error) {
    clearTimeout(timeoutId)

    // Обработка ошибки таймаута
    if (error instanceof Error && error.name === "AbortError") {
      throw new ApiError("Request timeout", 408, "Request Timeout")
    }

    // Обработка сетевых ошибок
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiError("Network error. Please check your connection.", 0, "Network Error")
    }

    // Если это уже наша ошибка, просто пробрасываем
    if (error instanceof ApiError) {
      throw error
    }

    // Для всех остальных ошибок
    throw new ApiError(error instanceof Error ? error.message : "Unknown error occurred", 500, "Internal Error")
  }
}

// Вспомогательные функции для удобства
export const api = {
  get: <T = any>(url: string, options?: Omit<RequestOptions, "method" | "url">) =>
    request<T>({ method: "GET", url, ...options }),

  post: <T = any>(url: string, body?: any, options?: Omit<RequestOptions, "method" | "url" | "body">) =>
    request<T>({ method: "POST", url, body, ...options }),

  put: <T = any>(url: string, body?: any, options?: Omit<RequestOptions, "method" | "url" | "body">) =>
    request<T>({ method: "PUT", url, body, ...options }),

  patch: <T = any>(url: string, body?: any, options?: Omit<RequestOptions, "method" | "url" | "body">) =>
    request<T>({ method: "PATCH", url, body, ...options }),

  delete: <T = any>(url: string, options?: Omit<RequestOptions, "method" | "url">) =>
    request<T>({ method: "DELETE", url, ...options }),
}

// Экспортируем типы для использования в других файлах
export type { RequestOptions, RequestError }
export { ApiError }
