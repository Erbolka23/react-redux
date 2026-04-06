// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit'

// Достаём текущего пользователя из localStorage при загрузке
const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('currentUser')
    return user ? JSON.parse(user) : null
  } catch {
    return null
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getCurrentUser(), // null если не залогинен
    error: null,
  },
  reducers: {
    // Регистрация
    register: (state, action) => {
      const { login, password } = action.payload

      // Достаём всех пользователей из localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')

      // Проверяем: вдруг такой логин уже есть?
      const exists = users.find(u => u.login === login)
      if (exists) {
        state.error = 'Пользователь с таким логином уже существует'
        return
      }

      // Сохраняем нового пользователя
      users.push({ login, password })
      localStorage.setItem('users', JSON.stringify(users))

      // Сразу авторизуем его
      state.user = { login }
      state.error = null
      localStorage.setItem('currentUser', JSON.stringify({ login }))
    },

    // Вход
    login: (state, action) => {
      const { login, password } = action.payload

      const users = JSON.parse(localStorage.getItem('users') || '[]')

      // Ищем пользователя с таким логином и паролем
      const user = users.find(
        u => u.login === login && u.password === password
      )

      if (!user) {
        state.error = 'Неверный логин или пароль'
        return
      }

      // Авторизуем
      state.user = { login }
      state.error = null
      localStorage.setItem('currentUser', JSON.stringify({ login }))
    },

    // Выход
    logout: (state) => {
      state.user = null
      state.error = null
      localStorage.removeItem('currentUser')
    },

    // Очищаем ошибку
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { register, login, logout, clearError } = authSlice.actions
export default authSlice.reducer