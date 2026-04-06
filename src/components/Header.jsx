import { NavLink, useNavigate } from 'react-router-dom'  // 👈 добавили useNavigate
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../features/ui/uiSlice'
import { logout } from '../features/auth/authSlice'       // 👈 добавили logout
import '../styles/header.css'

export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useSelector((state) => state.ui.theme)
  const user = useSelector((state) => state.auth.user)   // 👈 смотрим залогинен ли

  return (
    <header className={`header ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="brand">
        <div className="logo">KH</div>
        <div>
          <div className="title">Kyrgyz Horizont</div>
          <div className="subtitle">Travel startup</div>
        </div>
      </div>

      <nav className="nav">
        <NavLink to="/" end>Главная</NavLink>
        <NavLink to="/tours">Туры</NavLink>
        <NavLink to="/about">О нас</NavLink>
        <NavLink to="/services">Услуги</NavLink>
        <NavLink to="/pricing">Цены</NavLink>
        <NavLink to="/contact">Контакты</NavLink>
      </nav>

      <div className="actions">
        <button className="btn btnGhost" onClick={() => dispatch(toggleTheme())}>
          Тема: {theme === 'light' ? 'свет' : 'тьма'}
        </button>

        {/* 👇 если залогинен — показываем имя и кнопку выйти */}
        {user ? (
          <>
            <span style={{ marginRight: 8 }}>👤 {user.login}</span>
            <button
              className="btn btnPrimary"
              onClick={() => dispatch(logout())}
            >
              Выйти
            </button>
          </>
        ) : (
          <button
            className="btn btnPrimary"
            onClick={() => navigate('/login')}  // 👈 теперь ведёт на /login
          >
            Войти
          </button>
        )}
      </div>
    </header>
  )
}