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

    fetchWithDelay("/data/tours.json", 700)
      .then((json) => {
        if (!mounted) return
        const found = (json.tours || []).find((t) => t.id === id)
        setTour(found || null)
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
  }, [id])

  if (loading) return <p>Загрузка тура...</p>
  if (error) return <p>Ошибка: {error}</p>
  if (!tour)
    return (
      <div>
        <p>Тур не найден.</p>
        <Link to="/tours">← Назад</Link>
      </div>
    )

  return (
    <section>
      <h1>{tour.title}</h1>
      <p>
        <b>Локация:</b> {tour.location}
      </p>
      <p>
        <b>Дней:</b> {tour.days}
      </p>
      <p>
        <b>Цена:</b> ${tour.price}
      </p>
      <p>
        <b>Описание:</b> {tour.description}
      </p>

      <hr />
      <Link to="/tours">← Назад к списку</Link>
    </section>
  )
}
