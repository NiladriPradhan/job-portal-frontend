import FilterCard from '@/components/FilterCard'
import JobCard from '@/components/JobCard'
import type { RootState } from '@/store/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const arr = [2, 8, 6, 4, 2, 1, 3, 6, 5, 4, 8, 3, 2, 1]
const ago = arr.map((elem) => {
  return `${elem} day${elem > 1 ? 's' : ''} ago`
})

export default function Jobs() {
  const { jobs, searchJobByQuery } = useSelector(
    (state: RootState) => state.jobs
  )
  const [filteredJobs, setFilteredJobs] = useState(jobs)
  console.log(jobs)
  useEffect(() => {
    if (searchJobByQuery) {
      const filteredJob = jobs.filter((job) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        // return (
        //   job.title.toLowerCase().includes(searchJobByQuery.toLowerCase()) ||
        //   job.description
        //     .toLowerCase()
        //     .includes(searchJobByQuery.toLowerCase()) ||
        //   job.location.toLowerCase().includes(searchJobByQuery.toLowerCase())
        // )

        // or,
        return [job.title, job.description, job.location].some((field) =>
          field.toLowerCase().includes(searchJobByQuery.toLowerCase())
        )
      })
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilteredJobs(filteredJob)
    } else {
      setFilteredJobs(jobs)
    }
  }, [jobs, searchJobByQuery])
  return (
    <div className="flex">
      <div className="flex-2 bg-gray-200 pt-8 pl-4">
        <FilterCard />
      </div>
      <div className="flex-10 bg-amber-100">
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {filteredJobs.length<=0 ? <span>no job found</span> : filteredJobs.map((job, idx) => (
            <JobCard idx={idx} job={job} ago={ago[idx]} />
          ))}
        </div>
      </div>
    </div>
  )
}
