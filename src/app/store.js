import { configureStore } from "@reduxjs/toolkit"
import uiReducer from "../features/ui/uiSlice"
import toursReducer from "../features/tours/toursSlice"
import authReducer from "../features/auth/authSlice"
import todosReducer from "../features/todos/todosSlice" // 👈 новое

const store = configureStore({
  reducer: {
    ui: uiReducer,
    tours: toursReducer,
    auth: authReducer,
    todos: todosReducer, // 👈 новое
  },
})

export default store