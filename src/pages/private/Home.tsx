import CategoryCarousal from '@/components/CategoryCarousal'
import HeroSection from '@/components/HeroSection'
import LatestJobs from '@/components/LatestJobs'
import useGetAllJobs from '@/hooks/useGetAllJobs'

export default function Home() {
  useGetAllJobs()
  
  return (
    <>
      <HeroSection />
      <CategoryCarousal />
      <LatestJobs />
    </>
  )
}
