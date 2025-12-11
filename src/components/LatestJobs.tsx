import { useSelector } from 'react-redux'
import LatestJobCard from './LatestJobCard'
import type { RootState } from '@/store/store'
import { useState } from 'react'

export default function LatestJobs() {
  const { filteredJobs } = useSelector((state: RootState) => state.jobs)
  // const [_filteredJobs, setFilteredJobs] = useState(filteredJobs)
  // console.log('jobs', filteredJobs)
  console.log('filteredJobs', filteredJobs)

  return (
    <div className="mx-6 grid grid-cols-1 place-items-center gap-x-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredJobs.map((job, idx) => (
        <LatestJobCard key={idx} job={job} />
      ))}
    </div>
  )
}

