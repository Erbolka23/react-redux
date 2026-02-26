import { configureStore } from "@reduxjs/toolkit"
import uiReducer from "../features/ui/uiSlice"
import toursReducer from "../features/tours/toursSlice"

const store = configureStore({
  reducer: {
    ui: uiReducer,
    tours: toursReducer,
  },
})

export default store