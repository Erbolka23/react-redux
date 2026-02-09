import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchWithDelay } from "../api/fetchWithDelay"

export default function Home() {
  const [tours, setTours] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)

    Promise.all([
      fetchWithDelay("/data/tours.json", 800),
      fetchWithDelay("/data/services.json", 1200),
    ]).then(([toursData, servicesData]) => {
      if (!mounted) return
      setTours(toursData.slice(0, 2))      // не “локальные данные”, это срез JSON
      setServices(servicesData)
      setLoading(false)
    })

    return () => (mounted = false)
  }, [])

  if (loading) return <p>Загрузка контента главной...</p>

  return (
    <section>
      <h1>Главная</h1>
      <p>Добро пожаловать в Kyrgyz Horizont.</p>

      <hr />

      <h2>Популярные туры</h2>
      <ul>
        {tours.map((t) => (
          <li key={t.id}>
            <b>{t.title}</b> — {t.days} дн. — ${t.price} —{" "}
            <Link to={`/tours/${t.id}`}>detail</Link>
          </li>
        ))}
      </ul>
      <Link to="/tours">Смотреть все туры →</Link>

      <hr />

      <h2>Наши услуги</h2>
      <ul>
        {services.map((s) => (
          <li key={s.id}>
            <b>{s.name}:</b> {s.text}
          </li>
        ))}
      </ul>
    </section>
  )
}
