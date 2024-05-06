import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Logout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem('game_collection_user')
    navigate('/login')
  }, [navigate])

  return null
};