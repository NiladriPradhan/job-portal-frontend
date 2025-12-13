/* eslint-disable react-hooks/set-state-in-effect */
import JobTable from '@/components/admin/JobTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleJob, setSearchJobByText } from '@/redux/jobsSlice'
import { useNavigate } from 'react-router-dom'
import type { RootState } from '@/store/store'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'

export default function AdminJobs() {
  const { allAdminJobs, searchJobByText } = useSelector(
    (state: RootState) => state.jobs
  )

  console.log('allAdminJobs', allAdminJobs)

  const [search, setSearch] = useState<string>(searchJobByText)
  const [filteredJob, setFilteredJob] = useState<typeof allAdminJobs>([])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useGetAllAdminJobs()

  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(setSearchJobByText(search))
    }, 300)

    return () => clearTimeout(delay)
  }, [dispatch, search])

  useEffect(() => {
    const _filtered = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
    })

    setFilteredJob(_filtered)
  }, [searchJobByText, allAdminJobs])

  // EDIT JOB
  function handleEdit(id: string) {
    const job = allAdminJobs.find((j) => j._id === id)

    if (!job) {
      console.error('Job not found')
      return
    }
    dispatch(setSingleJob(job))
    navigate(`/admin/jobs/${id}`)
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold">Jobs</h1>

      <div className="mx-auto my-10 max-w-7xl">
        <div className="my-5 flex items-center justify-between">
          <Input
            placeholder="Search jobs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-sm"
          />

          <Button onClick={() => navigate('/admin/jobs/new')}>New Job</Button>
        </div>
      </div>

      <JobTable jobs={filteredJob || []} onEdit={handleEdit} />
    </div>
  )
}
