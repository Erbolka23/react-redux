// src/features/todos/todosSlice.js
import { createSlice } from '@reduxjs/toolkit'

// Загружаем из localStorage при старте
const loadTodos = () => {
  try {
    const data = localStorage.getItem('todos')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

// Сохраняем в localStorage
const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos))
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: loadTodos(),
  },
  reducers: {
    // CREATE
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        done: false,
      }
      state.items.push(newTodo)
      saveTodos(state.items)
    },

    // UPDATE
    updateTodo: (state, action) => {
      const { id, title, description } = action.payload
      const todo = state.items.find(t => t.id === id)
      if (todo) {
        todo.title = title
        todo.description = description
        saveTodos(state.items)
      }
    },

    // toggle done/undone
    toggleTodo: (state, action) => {
      const todo = state.items.find(t => t.id === action.payload)
      if (todo) {
        todo.done = !todo.done
        saveTodos(state.items)
      }
    },

    // DELETE
    deleteTodo: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload)
      saveTodos(state.items)
    },
  },
})

export const { addTodo, updateTodo, toggleTodo, deleteTodo } = todosSlice.actions
export default todosSlice.reducer