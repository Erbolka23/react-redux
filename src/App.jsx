import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout.jsx"

import Home from "./pages/Home.jsx"
import Tours from "./pages/Tours.jsx"
import TourDetail from "./pages/TourDetail.jsx"
import TourForm from "./pages/TourForm.jsx"
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="tours" element={<Tours />} />
        <Route path="tours/new" element={<TourForm />} />
        <Route path="tours/:id" element={<TourDetail />} />
        <Route path="tours/:id/edit" element={<TourForm />} />

        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<div style={{ padding: 24 }}>Страница не найдена</div>} />
      </Route>
    </Routes>
  )
}