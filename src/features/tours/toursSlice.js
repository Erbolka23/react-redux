import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const STORAGE_KEY = "kg_tours_v1"

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (!Array.isArray(data)) return null
    return data
  } catch {
    return null
  }
}

function saveToStorage(tours) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tours))
  } catch {
    // ignore
  }
}

export const fetchTours = createAsyncThunk("tours/fetchTours", async () => {
  const fromStorage = loadFromStorage()
  if (fromStorage) return fromStorage

  const res = await fetch("/data/tours.json")
  if (!res.ok) throw new Error("Не удалось загрузить tours.json")
  const json = await res.json()
  const tours = json.tours || []
  saveToStorage(tours)
  return tours
})

const toursSlice = createSlice({
  name: "tours",
  initialState: {
    items: [],
    loading: false,
    error: "",
  },
  reducers: {
    addTour(state, action) {
      state.items.unshift(action.payload)
      saveToStorage(state.items)
    },
    updateTour(state, action) {
      const updated = action.payload
      const idx = state.items.findIndex((t) => t.id === updated.id)
      if (idx !== -1) {
        state.items[idx] = updated
        saveToStorage(state.items)
      }
    },
    deleteTour(state, action) {
      const id = action.payload
      state.items = state.items.filter((t) => t.id !== id)
      saveToStorage(state.items)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTours.pending, (state) => {
        state.loading = true
        state.error = ""
      })
      .addCase(fetchTours.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchTours.rejected, (state, action) => {
        state.loading = false
        state.error = action.error?.message || "Ошибка загрузки туров"
      })
  },
})

export const { addTour, updateTour, deleteTour } = toursSlice.actions
export default toursSlice.reducer