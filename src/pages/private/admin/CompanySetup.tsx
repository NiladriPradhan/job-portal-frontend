import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { setSingleCompany } from '@/redux/companySlice'
import type { RootState } from '@/store/store'
import { COMPANY_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

export default function CompanySetup() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const singleCompany = useSelector(
    (state: RootState) => state.company.singleCompany
  ) as any

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    logo: ''
  })

  // 🟢 Fetch company by ID
  useEffect(() => {
    async function fetchCompany() {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/${id}`, {
          withCredentials: true
        })
        dispatch(setSingleCompany(res.data.company))
      } catch (err) {
        console.log('Fetch error', err)
      }
    }
    fetchCompany()
  }, [dispatch, id])

  // 🔥 Update form when singleCompany loads
  useEffect(() => {
    if (singleCompany) {
      setFormData({
        name: singleCompany.name || '',
        description: singleCompany.description || '',
        website: singleCompany.website || '',
        location: singleCompany.location || '',
        logo: singleCompany.logo || ''
      })
    }
  }, [singleCompany])

  // 🟢 Input Handler
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // 🟢 File Handler
  const handleFile = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      logo: e.target.files[0] // store actual file
    }))
  }

  // 🟢 Save / Update Company
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    const form = new FormData()
    form.append('name', formData.name)
    form.append('description', formData.description)
    form.append('website', formData.website)
    form.append('location', formData.location)
    if (formData.logo) form.append('logo', formData.logo)

    await axios.put(`${COMPANY_API_ENDPOINT}/update/${id}`, form, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    navigate('/admin/companies')
  }

  if (!singleCompany) return <div>Loading...</div>

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Edit Company
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={handleSave}>
            <div>
              <label>Company Name</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Description</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Website</label>
              <Input
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>location</label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Company Logo</label>
              <Input type="file" accept="image/*" onChange={handleFile} />
            </div>

            <Button className="w-full" type="submit">
              Save Changes
            </Button>

            <Button
              className="w-full bg-red-500"
              onClick={() => navigate('/admin/companies')}
            >
              Cancel
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
