import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchWithDelay } from "../api/fetchWithDelay"

export default function Home() {
  const [tours, setTours] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError("")

    Promise.all([
      fetchWithDelay("/data/tours.json", 800),
      fetchWithDelay("/data/services.json", 1200),
    ])
      .then(([toursJson, servicesJson]) => {
        if (!mounted) return

        setTours((toursJson.tours || []).slice(0, 2))
        setServices(servicesJson.services || [])
        setLoading(false)
      })
      .catch((e) => {
        if (!mounted) return
        setError(e.message)
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <p>Загрузка контента главной...</p>
  if (error) return <p>Ошибка: {error}</p>

  return (
    <section className="home">
      <h1>Главная</h1>
      <p>Добро пожаловать в Kyrgyz Horizont.</p>

      <section className="block">
        <h2>Популярные туры</h2>
        <ul>
          {tours.map((t) => (
            <li key={t.id}>
              <b>{t.title}</b> — {t.days} дн. — ${t.price} —{" "}
              <Link to={`/tours/${t.id}`}>подробнее</Link>
            </li>
          ))}
        </ul>
        <Link to="/tours">Смотреть все туры →</Link>
      </section>

      <section className="block">
        <h2>Наши услуги</h2>
        <ul>
          {services.map((s) => (
            <li key={s.id}>
              <b>{s.name}:</b> {s.text}
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}
