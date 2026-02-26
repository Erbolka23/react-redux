import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { deleteTour, fetchTours } from "../features/tours/toursSlice"

export default function Tours() {
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector((s) => s.tours)

  useEffect(() => {
    if (items.length === 0) dispatch(fetchTours())
  }, [dispatch, items.length])

  function handleDelete(id) {
    const ok = confirm("Удалить этот тур?")
    if (!ok) return
    dispatch(deleteTour(id))
  }

  return (
    <section>
      <h1>Туры (СПИСОК)</h1>

      <div style={{ marginBottom: 12 }}>
        <Link to="/tours/new">+ Добавить тур</Link>
      </div>

      {loading && items.length === 0 && <p>Загрузка...</p>}
      {error && items.length === 0 && <p>Ошибка: {error}</p>}

      <ul>
        {items.map((t) => (
          <li key={t.id} style={{ marginBottom: 8 }}>
            <b>{t.title}</b> — {t.days} дн. — ${t.price} — {t.location} —{" "}
            <Link to={`/tours/${t.id}`}>Подробнее</Link>
            {" · "}
            <Link to={`/tours/${t.id}/edit`}>Редактировать</Link>
            <button onClick={() => handleDelete(t.id)} style={{ marginLeft: 8 }}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}