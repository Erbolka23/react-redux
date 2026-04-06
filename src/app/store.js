import { configureStore } from "@reduxjs/toolkit"
import uiReducer from "../features/ui/uiSlice"
import toursReducer from "../features/tours/toursSlice"
import authReducer from "../features/auth/authSlice" // 👈 новое

const store = configureStore({
  reducer: {
    ui: uiReducer,
    tours: toursReducer,
    auth: authReducer, // 👈 новое
  },
})

export default store