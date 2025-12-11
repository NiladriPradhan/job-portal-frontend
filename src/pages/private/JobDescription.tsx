import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { setSingleJob } from '@/redux/jobsSlice'
import type { RootState } from '@/store/store'
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import { ArrowLeft, Briefcase, Building, MapPin } from 'lucide-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'


export default function JobDescription() {
  // const { singleJob } = useSelector((state: RootState) => state.jobs)
  const singleJob = useSelector((state: RootState) => state.jobs.singleJob)

  const { user } = useSelector((state: RootState) => state.auth)
  console.log(singleJob, 'singleJob')

  const params = useParams()
  const jobId = params.id
  const dispatch = useDispatch()
  const isApplied =
    singleJob && Array.isArray(singleJob.applications)
      ? singleJob.applications.some(
          (applicattion: { applicant: any }) => applicattion.applicant === user?._id
        )
      : false

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true
        })
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchSingleJob()
  }, [jobId, dispatch])

  console.log(singleJob?.company?.name)
  const applyJob = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        {
          withCredentials: true
        }
      )
      if (res.data.success) {
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // Show loader until job is fetched
  if (!singleJob) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-gray-500">Loading job details...</p>
      </div>
    )
  }

  const totalApplicants = singleJob?.applications.length
  console.log('totalApplicants', totalApplicants)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Back Button */}
        <button
          onClick={() => history.back()}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeft size={18} /> Back to Jobs
        </button>

        {/* Main Card */}
        <Card className="rounded-xl shadow-md">
          <CardContent className="p-6">
            {/* Job Title */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold">{singleJob?.title}</h1>
            </div>

            {/* Job Info */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-gray-700">
                <Building size={18} />{' '}
                <span className="font-semibold">{singleJob?.company?.name}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <MapPin size={18} /> <span>{singleJob?.location}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Briefcase size={18} /> <span>{singleJob?.jobType}</span>
              </div>
{/* 
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar size={18} /> <span>{singleJob?.postedDate}</span>
              </div> */}

              <div className="flex items-center gap-2 text-gray-700">
                💰 <span>{singleJob?.salary}LPA</span>
              </div>
            </div>
            <div className="my-4 font-medium text-gray-700">
              Total Applicants:{' '}
              {/* {Array.isArray(singleJob.applications)
                ? singleJob.applications.length
                : 0} */}
              {singleJob.applications.length}
            </div>

            {/* Description */}
            <section className="mb-8">
              <h2 className="mb-2 text-xl font-semibold">Job Description</h2>
              <p className="leading-relaxed text-gray-700">
                {singleJob?.description}
              </p>
            </section>

            {/* Responsibilities */}
            {singleJob?.responsibilities?.length > 0 && (
              <section className="mb-8">
                <h2 className="mb-2 text-xl font-semibold">Responsibilities</h2>
                <ul className="list-disc space-y-1 pl-6 text-gray-700">
                  {singleJob?.responsibilities.map(
                    (item: string, i: number) => (
                      <li key={i}>{item}</li>
                    )
                  )}
                </ul>
              </section>
            )}

            {/* Requirements */}
            {singleJob?.requirements?.length > 0 && (
              <section className="mb-8">
                <h2 className="mb-2 text-xl font-semibold">Requirements</h2>
                <ul className="list-disc space-y-1 pl-6 text-gray-700">
                  {singleJob?.requirements.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Apply Button */}
            <Button
            disabled={isApplied}
              onClick={applyJob}
              className={`w-full rounded-lg py-5 text-lg font-semibold ${
                isApplied ? '' : 'bg-blue-600 hover:bg-blue-800'
              }`}
            >
              {isApplied ? 'Applied' : 'Apply Now'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
