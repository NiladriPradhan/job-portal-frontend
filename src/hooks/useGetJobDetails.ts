// useGetJobDetails.ts
import { setSingleJob } from '@/redux/jobsSlice'
import { JOB_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetJobDetails = (jobid: string | undefined) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!jobid) return

    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobid}`, {
          withCredentials: true
        })

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job)) // 👈 backend returns job
        }
      } catch (error) {
        console.log('Error fetching job details:', error)
      }
    }

    fetchJobDetails()
  }, [jobid])
}

export default useGetJobDetails
