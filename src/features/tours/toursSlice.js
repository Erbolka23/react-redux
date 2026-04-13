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
  } catch {}
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
      state.items = state.items.filter((t) => t.id !== action.payload)
      saveToStorage(state.items)
    },

    // 👇 1. Лайк
    toggleLike(state, action) {
      const tour = state.items.find((t) => t.id === action.payload)
      if (tour) {
        tour.liked = !tour.liked
        saveToStorage(state.items)
      }
    },

    // 👇 2. Избранное
    toggleFavorite(state, action) {
      const tour = state.items.find((t) => t.id === action.payload)
      if (tour) {
        tour.favorite = !tour.favorite
        saveToStorage(state.items)
      }
    },

    // 👇 3. Добавление оценки
    rateTour(state, action) {
      const { id, rating } = action.payload
      const tour = state.items.find((t) => t.id === id)
      if (tour) {
        // ratings — массив оценок, например [4, 5, 3]
        if (!tour.ratings) tour.ratings = []
        tour.ratings.push(rating)
        saveToStorage(state.items)
      }
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

export const { addTour, updateTour, deleteTour, toggleLike, toggleFavorite, rateTour } = toursSlice.actions
export default toursSlice.reducer