import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchWithDelay } from "../api/fetchWithDelay"

export default function Tours() {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError("")

    fetchWithDelay("/data/tours.json", 1200)
      .then((data) => {
        if (mounted) setTours(data)
      })
      .catch((e) => {
        if (mounted) setError(e.message)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <p>Загрузка туров...</p>
  if (error) return <p>Ошибка: {error}</p>

  return (
    <section>
      <h1>Туры (LIST)</h1>
      <ul>
        {tours.map((t) => (
          <li key={t.id} style={{ marginBottom: 10 }}>
            <b>{t.title}</b> — {t.days} дн. — ${t.price} — {t.location}{" "}
            <Link to={`/tours/${t.id}`}>Подробнее</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
