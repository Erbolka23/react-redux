// src/components/ProtectedRoute.jsx
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const user = useSelector(state => state.auth.user)

  // Если пользователь НЕ залогинен → отправляем на /login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Если залогинен → показываем страницу
  return children
}

export default ProtectedRoute