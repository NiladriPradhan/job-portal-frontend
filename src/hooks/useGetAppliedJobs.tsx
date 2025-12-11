import { setAllAppliedJobs } from '@/redux/jobsSlice'
import { APPLICATION_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAppliedJobs = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {
          withCredentials: true
        })
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.applications))
          console.log(res.data.applications)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAppliedJobs()
  }, [])
}
export default useGetAppliedJobs
