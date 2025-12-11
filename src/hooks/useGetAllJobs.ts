import { setJobs } from '@/redux/jobsSlice'
import { JOB_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllJobs = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get`, {
          withCredentials: true
        })
        if (res.data.success) {
          dispatch(setJobs(res.data.jobs))
        }
      } catch (error) {
        console.log('error in useGetAllJobs ', error)
      }
    }
    fetchAllJobs()
  }, [])
}

export default useGetAllJobs
