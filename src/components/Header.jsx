import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../features/ui/uiSlice'
import '../styles/header.css'

export default function Header() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.ui.theme)

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
        <NavLink to="/about">О нас</NavLink>
        <NavLink to="/services">Услуги</NavLink>
        <NavLink to="/pricing">Цены</NavLink>
        <NavLink to="/contact">Контакты</NavLink>
      </nav>

      <div className="actions">
        <button className="btn btnGhost" onClick={() => dispatch(toggleTheme())}>
          Тема: {theme === 'light' ? 'свет' : 'тьма'}
        </button>
        <button className="btn btnPrimary">Войти</button>
      </div>
    </header>
  )
}
