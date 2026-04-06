// src/pages/Login.jsx
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearError } from '../features/auth/authSlice'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, user } = useSelector(state => state.auth)

  const [loginValue, setLoginValue] = useState('')
  const [password, setPassword] = useState('')

  // Если уже залогинен — уходим
  if (user) {
    navigate('/')
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!loginValue || !password) return
    dispatch(login({ login: loginValue, password }))
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 20 }}>
      <h2>Вход</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Логин:</label>
          <input
            type="text"
            value={loginValue}
            onChange={e => {
              setLoginValue(e.target.value)
              dispatch(clearError())
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

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" style={{ width: '100%', padding: 10 }}>
          Войти
        </button>
      </form>

      <p>
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </p>
    </div>
  )
}

export default Login