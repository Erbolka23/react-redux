// src/pages/Register.jsx
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearError } from '../features/auth/authSlice'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, user } = useSelector(state => state.auth)

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  // Если уже залогинен — редиректим
  if (user) {
    navigate('/')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!login || !password) return

    dispatch(register({ login, password }))

    // Если нет ошибки — идём на главную
    // (проверяем после следующего рендера через useEffect)
  }

  // Редирект после успешной регистрации
  // Следим за user: как только появился — уходим
  if (user) navigate('/')

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 20 }}>
      <h2>Регистрация</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Логин:</label>
          <input
            type="text"
            value={login}
            onChange={e => {
              setLogin(e.target.value)
              dispatch(clearError()) // очищаем ошибку при вводе
            }}
            placeholder="Введите логин"
            style={{ display: 'block', width: '100%', marginBottom: 10 }}
          />
        </div>

        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value)
              dispatch(clearError())
            }}
            placeholder="Введите пароль"
            style={{ display: 'block', width: '100%', marginBottom: 10 }}
          />
        </div>

        {/* Показываем ошибку если есть */}
        {error && (
          <p style={{ color: 'red' }}>{error}</p>
        )}

        <button type="submit" style={{ width: '100%', padding: 10 }}>
          Зарегистрироваться
        </button>
      </form>

      <p>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </div>
  )
}

export default Register