import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../features/ui/uiSlice'

export default function Header() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.ui.theme)

  return (
    <header
      style={{
        padding: '20px',
        background: '#7b1414',
        color: '#fff',
        borderBottom: '2px solid #2523bd',
      }}
    >
      <h2>Тема: {theme === 'light' ? 'свет' : 'тьма'}</h2>
      <button onClick={() => dispatch(toggleTheme())}>
        Переключить тему
      </button>
    </header>
  )
}
