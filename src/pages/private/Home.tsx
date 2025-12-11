import CategoryCarousal from '@/components/CategoryCarousal'
import HeroSection from '@/components/HeroSection'
import LatestJobs from '@/components/LatestJobs'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import type { RootState } from '@/store/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  useGetAllJobs()
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.auth)
  // useEffect(() => {
  //   if (user?.role === 'recruiter') {
  //     navigate('/admin/companies')
  //   }
  // }, [])
  return (
    <>
      <HeroSection />
      <CategoryCarousal />
      <LatestJobs />
    </>
  )
}
