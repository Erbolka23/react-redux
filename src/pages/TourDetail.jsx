import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { deleteTour, fetchTours } from "../features/tours/toursSlice"

export default function TourDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector((s) => s.tours)

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

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Link to="/tours">← Назад к списку</Link>
        <Link to={`/tours/${tour.id}/edit`}>Редактировать</Link>
        <button onClick={handleDelete}>Удалить</button>
      </div>
    </section>
  )
}