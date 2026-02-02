import { useSelector } from 'react-redux'
import '../styles/footer.css'

export default function Footer() {
  const theme = useSelector((state) => state.ui.theme)

  return (
    <footer className={`footer ${theme === 'dark' ? 'dark' : ''}`}>
      Kyrgyz Horizont © 2026 • React + Redux Toolkit
    </footer>
  )
}
