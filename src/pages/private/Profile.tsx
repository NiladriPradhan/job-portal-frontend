import { useState, Suspense } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Mail } from 'lucide-react'
import Navbar from '@/components/shared/Navbar'
import { Switch } from '@/components/ui/switch'
import FormContent from '@/components/FormContent'
import AppliedJobs from '@/components/AppliedJobs'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setUser } from '@/redux/userSlice'
import { useNavigate } from 'react-router-dom'
import type { RootState } from '@/store/store'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/constants'
import { toast } from 'react-toastify'

export default function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsloading] = useState(false)

  const { user } = useSelector((state: RootState) => state.auth)
  const safeSkills = user?.profile?.skills ?? []
  const safeResume = user?.profile?.resume ?? ''
  const safeBio = user?.profile?.bio ?? ''

  const [editMode, setEditMode] = useState(false)
  const safeResumeOriginalName = user?.profile?.resumeOriginalName ?? ''

  const [formData, setFormData] = useState({
    fullname: user?.fullname || 'No name found',
    email: user?.email || 'No email found',
    phonenumber: user?.phoneNumber || 'No mobile number found',
    role: user?.role || 'No role found',
    skills: [...safeSkills],
    bio: safeBio, // added bio
    file: safeResume,
    resumeOriginalName: safeResumeOriginalName
  })

  const [savePromise, setSavePromise] = useState<Promise<void> | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData((prev) => ({
      ...prev,
      skills: value.split(',').map((s) => s.trim())
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append('fullname', formData.fullname)
    data.append('email', formData.email)
    data.append('phoneNumber', formData.phonenumber)
    data.append('bio', formData.bio)
    data.append('skills', formData.skills.join(','))

    // resume file
    if (formData.file && formData.file instanceof File) {
      data.append('resume', formData.file) // ✔ MUST MATCH multer name
    }

    try {
      setIsloading(true)
      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        }
      )

      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message)
      }
      setIsloading(false)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setIsloading(false)
    }
  }

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true
      })
      if (res.data.success) {
        dispatch(setUser(null))
        navigate('/login')
        toast.success('logout successfully')
      }
    } catch (error) {
      console.log('error in logout', error)
    }
    // dispatch(logout())
    console.log('Logout success')
  }

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Your Profile</h1>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Edit Mode</span>
            <Switch
              checked={editMode}
              onCheckedChange={setEditMode}
              disabled={!!savePromise}
            />
          </div>
        </div>

        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6">
            {/* PROFILE HEADER */}
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-3xl font-bold text-gray-600">
                {formData.fullname[0]}
              </div>

              <div>
                <h2 className="text-xl font-semibold">{formData.fullname}</h2>
                <p className="text-gray-600">{formData.role}</p>

                <div className="mt-2 flex flex-col gap-1 text-sm text-gray-500">
                  <p className="flex items-center gap-2">
                    <Mail size={16} /> {formData.email}
                  </p>
                  {formData.bio ? (
                    <p className="mt-1 text-gray-700">{formData.bio}</p>
                  ) : (
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Iste cumque saepe ut corrupti quo magnam atque accusamus
                      fugit quae debitis nihil perferendis, asperiores, eligendi
                      nam id! Consectetur ut eum praesentium?
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="my-6 h-[1px] w-full bg-gray-200"></div>

            {/* FORM WITH SUSPENSE */}

            <Suspense
              fallback={
                <div className="py-6 text-center text-gray-500">Saving...</div>
              }
            >
              <FormContent
                formData={formData}
                editMode={editMode}
                handleSkillsChange={handleSkillsChange}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                savePromise={savePromise}
                handleLogout={handleLogout}
                isLoading={isLoading} // <-- Pass loading state
              />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      {/* APPLIED JOBS */}
      <div className="mx-auto flex max-w-4xl justify-center">
        <AppliedJobs />
      </div>
    </>
  )
}
