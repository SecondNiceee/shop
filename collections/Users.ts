import type { CollectionConfig } from "payload/types"

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    tokenExpiration: 7200, // 2 hours
    verify: false, // Отключаем верификацию email для упрощения
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 minutes
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "role"],
  },
  access: {
    create: () => true, // Разрешаем регистрацию всем
    read: ({ req: { user } }) => {
      // Пользователи могут читать только свои данные
      if (user?.role === "admin") return true
      return {
        id: {
          equals: user?.id,
        },
      }
    },
    update: ({ req: { user } }) => {
      // Пользователи могут обновлять только свои данные
      if (user?.role === "admin") return true
      return {
        id: {
          equals: user?.id,
        },
      }
    },
    delete: ({ req: { user } }) => {
      // Только админы могут удалять пользователей
      return user?.role === "admin"
    },
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Имя",
    },
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
      label: "Email",
    },
    {
      name: "role",
      type: "select",
      options: [
        {
          label: "Пользователь",
          value: "user",
        },
        {
          label: "Администратор",
          value: "admin",
        },
      ],
      defaultValue: "user",
      required: true,
      label: "Роль",
    },
    {
      name: "phone",
      type: "text",
      label: "Телефон",
    },
    {
      name: "address",
      type: "group",
      label: "Адрес",
      fields: [
        {
          name: "street",
          type: "text",
          label: "Улица",
        },
        {
          name: "city",
          type: "text",
          label: "Город",
        },
        {
          name: "zipCode",
          type: "text",
          label: "Индекс",
        },
      ],
    },
    {
      name: "preferences",
      type: "group",
      label: "Настройки",
      fields: [
        {
          name: "newsletter",
          type: "checkbox",
          label: "Подписка на новости",
          defaultValue: false,
        },
        {
          name: "notifications",
          type: "checkbox",
          label: "Push уведомления",
          defaultValue: true,
        },
      ],
    },
  ],
  timestamps: true,
}
