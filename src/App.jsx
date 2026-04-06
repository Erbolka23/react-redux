import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout.jsx"

import Home from "./pages/Home.jsx"
import Tours from "./pages/Tours.jsx"
import TourDetail from "./pages/TourDetail.jsx"
import TourForm from "./pages/TourForm.jsx"
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx"
import Login from "./pages/Login.jsx"           // 👈 новое
import Register from "./pages/Register.jsx"     // 👈 новое
import ProtectedRoute from "./components/ProtectedRoute.jsx" // 👈 новое

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="tours" element={<Tours />} />

        {/* 👇 tours/new и edit — только для залогиненных */}
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

        {/* 👇 новые страницы */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="*" element={<div style={{ padding: 24 }}>Страница не найдена</div>} />
      </Route>
    </Routes>
  )
}