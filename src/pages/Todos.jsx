// src/pages/Todos.jsx
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, deleteTodo, toggleTodo } from '../features/todos/todosSlice'
import { Link } from 'react-router-dom'

export default function Todos() {
  const dispatch = useDispatch()
  const todos = useSelector(state => state.todos.items)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleAdd = () => {
    if (!title.trim()) return
    dispatch(addTodo({ title, description }))
    setTitle('')
    setDescription('')
  }

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <h1>Todo список</h1>

      {/* CREATE */}
      <div style={{ marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input
          placeholder="Название"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ padding: 8, fontSize: 16 }}
        />
        <input
          placeholder="Описание"
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ padding: 8, fontSize: 16 }}
        />
        <button onClick={handleAdd} style={{ padding: 8 }}>
          Добавить
        </button>
      </div>

      {/* READ */}
      {todos.length === 0 && <p>Список пуст</p>}

      {todos.map(todo => (
        <div key={todo.id} style={{
          border: '1px solid #ccc',
          borderRadius: 8,
          padding: 16,
          marginBottom: 12,
          opacity: todo.done ? 0.5 : 1,
        }}>
          <h3 style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
            {todo.title}
          </h3>
          <p>{todo.description}</p>

          <div style={{ display: 'flex', gap: 8 }}>
            {/* GET BY ID - Detail */}
            <Link to={`/todos/${todo.id}`}>
              <button>Подробнее</button>
            </Link>

            {/* toggle done */}
            <button onClick={() => dispatch(toggleTodo(todo.id))}>
              {todo.done ? 'Не выполнено' : 'Выполнено'}
            </button>

            {/* DELETE */}
            <button
              onClick={() => dispatch(deleteTodo(todo.id))}
              style={{ color: 'red' }}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}