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

    fetchWithDelay("/data/tours.json", 900)
      .then((json) => {
        if (!mounted) return
        setTours(json.tours || [])
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

  if (loading) return <p>Загрузка туров...</p>
  if (error) return <p>Ошибка: {error}</p>

  return (
    <section>
      <h1>Туры (LIST)</h1>
      <ul>
        {tours.map((t) => (
          <li key={t.id}>
            <b>{t.title}</b> — {t.days} дн. — ${t.price} — {t.location} —{" "}
            <Link to={`/tours/${t.id}`}>Подробнее</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
