import Navbar from '@/components/shared/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import type { RootState } from '@/store/store' // adjust path to your store
import { useEffect } from 'react'
import { setUser } from '@/redux/userSlice'

export default function PrivateLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    const localUser = localStorage.getItem('user')

    if (localUser && !user) {
      dispatch(setUser(JSON.parse(localUser)))
    }
  }, [])

  return (
    <>
      <Navbar />
      {user && user.role !== "recruiter" ? children : <Navigate to="/login" replace />}
    </>
  )
}
