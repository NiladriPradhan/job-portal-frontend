import { useEffect } from 'react'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT } from '@/utils/constants'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'
import type { RootState } from '@/store/store'

export default function Applicants() {
  const params = useParams()
  const dispatch = useDispatch()
  const { applications } = useSelector((state: RootState) => state.applicants)

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
          { withCredentials: true }
        )

        console.log("BACKEND RESPONSE:", res.data)

        // FIXED HERE
        dispatch(setAllApplicants(res.data.applicants))

      } catch (error) {
        console.log('error in applicants', error)
      }
    }

    fetchAllApplicants()
  }, [])

  return (
    <div>
      <ApplicantsTable applicants={applications} />
    </div>
  )
}
