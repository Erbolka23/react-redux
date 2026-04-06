// src/pages/TodoDetail.jsx
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { updateTodo, deleteTodo } from '../features/todos/todosSlice'

export default function TodoDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // GET BY ID
  const todo = useSelector(state =>
    state.todos.items.find(t => t.id === Number(id))
  )

  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(todo?.title || '')
  const [description, setDescription] = useState(todo?.description || '')

  if (!todo) {
    return <div style={{ padding: 24 }}>Todo не найден</div>
  }

  const handleUpdate = () => {
    dispatch(updateTodo({ id: todo.id, title, description }))
    setEditing(false)
  }

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id))
    navigate('/todos')
  }

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <button onClick={() => navigate('/todos')}>← Назад</button>

      {editing ? (
        // UPDATE форма
        <div style={{ marginTop: 16 }}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ display: 'block', width: '100%', padding: 8, marginBottom: 8 }}
          />
          <input
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{ display: 'block', width: '100%', padding: 8, marginBottom: 8 }}
          />
          <button onClick={handleUpdate}>Сохранить</button>
          <button onClick={() => setEditing(false)} style={{ marginLeft: 8 }}>
            Отмена
          </button>
        </div>
      ) : (
        // READ детали
        <div style={{ marginTop: 16 }}>
          <h1>{todo.title}</h1>
          <p>{todo.description}</p>
          <p>Статус: {todo.done ? '✅ Выполнено' : '⏳ Не выполнено'}</p>

          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button onClick={() => setEditing(true)}>Редактировать</button>
            <button onClick={handleDelete} style={{ color: 'red' }}>Удалить</button>
          </div>
        </div>
      )}
    </div>
  )
}