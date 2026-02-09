import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { fetchWithDelay } from "../api/fetchWithDelay"

export default function TourDetail() {
  const { id } = useParams()
  const [tour, setTour] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError("")

    fetchWithDelay("/data/tours.json", 900)
      .then((data) => {
        const found = data.find((x) => String(x.id) === String(id))
        if (!found) throw new Error("Тур не найден")
        if (mounted) setTour(found)
      })
      .catch((e) => mounted && setError(e.message))
      .finally(() => mounted && setLoading(false))

    return () => {
      mounted = false
    }
  }, [id])

  if (loading) return <p>Загрузка детали...</p>
  if (error) return <p>Ошибка: {error}</p>

  return (
    <section>
      <h1>{tour.title} (DETAIL)</h1>
      <p><b>Локация:</b> {tour.location}</p>
      <p><b>Длительность:</b> {tour.days} дней</p>
      <p><b>Цена:</b> ${tour.price}</p>
      <p>{tour.description}</p>

      <h3>Highlights</h3>
      <ul>
        {tour.highlights.map((h, i) => <li key={i}>{h}</li>)}
      </ul>

      <Link to="/tours">← Назад к списку</Link>
    </section>
  )
}
