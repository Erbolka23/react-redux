import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { deleteTour, fetchTours, toggleLike, toggleFavorite, rateTour } from "../features/tours/toursSlice"

export default function TourDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector((s) => s.tours)

  // для оценки — храним выбранную звезду
  const [selectedRating, setSelectedRating] = useState(0)

  useEffect(() => {
    if (items.length === 0) dispatch(fetchTours())
  }, [dispatch, items.length])

  const tour = items.find((t) => t.id === id)

  function handleDelete() {
    const ok = confirm("Удалить этот тур?")
    if (!ok) return
    dispatch(deleteTour(id))
    navigate("/tours")
  }

  // 4. Средняя оценка
  function getAverage(ratings) {
    if (!ratings || ratings.length === 0) return "Нет оценок"
    const sum = ratings.reduce((a, b) => a + b, 0)
    return (sum / ratings.length).toFixed(1)
  }

  if (loading && items.length === 0) return <p>Загрузка тура...</p>
  if (error && items.length === 0) return <p>Ошибка: {error}</p>

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
      <p><b>Локация:</b> {tour.location}</p>
      <p><b>Дней:</b> {tour.days}</p>
      <p><b>Цена:</b> ${tour.price}</p>
      <p><b>Описание:</b> {tour.description}</p>

      <hr />

      {/* 1. Лайк */}
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => dispatch(toggleLike(tour.id))}>
          {tour.liked ? "❤️ Убрать лайк" : "🤍 Лайк"}
        </button>
      </div>

      {/* 2. Избранное */}
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => dispatch(toggleFavorite(tour.id))}>
          {tour.favorite ? "⭐ Убрать из избранного" : "☆ В избранное"}
        </button>
      </div>

      {/* 3. Оценка — 5 звёзд */}
      <div style={{ marginBottom: 12 }}>
        <p><b>Поставить оценку:</b></p>
        <div style={{ display: "flex", gap: 4 }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setSelectedRating(star)}
              style={{ fontSize: 24, cursor: "pointer" }}
            >
              {star <= selectedRating ? "★" : "☆"}
            </span>
          ))}
        </div>
        <button
          style={{ marginTop: 8 }}
          onClick={() => {
            if (selectedRating === 0) return
            dispatch(rateTour({ id: tour.id, rating: selectedRating }))
            setSelectedRating(0)
          }}
        >
          Отправить оценку
        </button>
      </div>

      {/* 4. Средняя оценка */}
      <div style={{ marginBottom: 12 }}>
        <p>
          <b>Средняя оценка:</b> {getAverage(tour.ratings)}
          {tour.ratings?.length > 0 && ` (${tour.ratings.length} голосов)`}
        </p>
      </div>

      <hr />

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Link to="/tours">← Назад к списку</Link>
        <Link to={`/tours/${tour.id}/edit`}>Редактировать</Link>
        <button onClick={handleDelete}>Удалить</button>
      </div>
    </section>
  )
}