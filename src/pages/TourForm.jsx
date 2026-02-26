import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { addTour, fetchTours, updateTour } from "../features/tours/toursSlice"

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/(^-|-$)/g, "")
}

export default function TourForm() {
  const { id } = useParams() // если есть id => редактирование
  const isEdit = Boolean(id)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, loading, error } = useSelector((s) => s.tours)

  useEffect(() => {
    if (items.length === 0) dispatch(fetchTours())
  }, [dispatch, items.length])

  const existing = useMemo(() => items.find((t) => t.id === id), [items, id])

  const [title, setTitle] = useState("")
  const [days, setDays] = useState(1)
  const [price, setPrice] = useState(0)
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [customId, setCustomId] = useState("")
  const [formError, setFormError] = useState("")

  useEffect(() => {
    if (isEdit && existing) {
      setTitle(existing.title)
      setDays(existing.days)
      setPrice(existing.price)
      setLocation(existing.location)
      setDescription(existing.description)
      setCustomId(existing.id)
    }
  }, [isEdit, existing])

  function validate() {
    if (!title.trim()) return "Введите название тура"
    if (!location.trim()) return "Введите локацию"
    if (Number(days) <= 0) return "Дней должно быть больше 0"
    if (Number(price) < 0) return "Цена не может быть отрицательной"
    return ""
  }

  function handleSubmit(e) {
    e.preventDefault()
    const v = validate()
    if (v) {
      setFormError(v)
      return
    }

    const finalId = isEdit ? id : (customId.trim() || slugify(title))
    if (!finalId) {
      setFormError("Не удалось создать id")
      return
    }

    // проверка уникальности id при создании
    if (!isEdit && items.some((t) => t.id === finalId)) {
      setFormError("Такой id уже существует. Измени id или название.")
      return
    }

    const payload = {
      id: finalId,
      title: title.trim(),
      days: Number(days),
      price: Number(price),
      location: location.trim(),
      description: description.trim(),
    }

    if (isEdit) dispatch(updateTour(payload))
    else dispatch(addTour(payload))

    navigate(`/tours/${finalId}`)
  }

  if (loading && items.length === 0) return <p>Загрузка...</p>
  if (error && items.length === 0) return <p>Ошибка: {error}</p>

  if (isEdit && !existing) {
    return (
      <section>
        <p>Тур для редактирования не найден.</p>
        <Link to="/tours">← Назад</Link>
      </section>
    )
  }

  return (
    <section style={{ maxWidth: 700 }}>
      <h1>{isEdit ? "Редактировать тур" : "Создать тур"}</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Название
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        {!isEdit && (
          <label>
            ID (можно оставить пустым — сделаем автоматически)
            <input value={customId} onChange={(e) => setCustomId(e.target.value)} />
          </label>
        )}

        <label>
          Локация
          <input value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>

        <label>
          Дней
          <input
            type="number"
            value={days}
            min={1}
            onChange={(e) => setDays(e.target.value)}
          />
        </label>

        <label>
          Цена ($)
          <input
            type="number"
            value={price}
            min={0}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        <label>
          Описание
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        {formError && <p style={{ color: "crimson" }}>{formError}</p>}

        <div style={{ display: "flex", gap: 12 }}>
          <button type="submit">{isEdit ? "Сохранить" : "Создать"}</button>
          <Link to="/tours">Отмена</Link>
        </div>
      </form>
    </section>
  )
}