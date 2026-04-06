import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout.jsx"

import Home from "./pages/Home.jsx"
import Tours from "./pages/Tours.jsx"
import TourDetail from "./pages/TourDetail.jsx"
import TourForm from "./pages/TourForm.jsx"
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import Todos from "./pages/Todos.jsx"           // 👈 новое
import TodoDetail from "./pages/TodoDetail.jsx" // 👈 новое

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="tours" element={<Tours />} />
        <Route path="tours/new" element={
          <ProtectedRoute>
            <TourForm />
          </ProtectedRoute>
        } />
        <Route path="tours/:id" element={<TourDetail />} />
        <Route path="tours/:id/edit" element={
          <ProtectedRoute>
            <TourForm />
          </ProtectedRoute>
        } />

        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* 👇 Todo маршруты */}
        <Route path="todos" element={<Todos />} />
        <Route path="todos/:id" element={<TodoDetail />} />

        <Route path="*" element={<div style={{ padding: 24 }}>Страница не найдена</div>} />
      </Route>
    </Routes>
  )
}