import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth(redirectTo = '/login') {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push(redirectTo)
    } else {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [router, redirectTo])

  return { isLoading, isAuthenticated }
} 