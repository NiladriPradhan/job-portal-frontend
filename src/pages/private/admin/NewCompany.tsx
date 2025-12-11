import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { COMPANY_API_ENDPOINT } from '@/utils/constants'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

export default function NewCompany() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [website, setWebsite] = useState('')
  const [location, setLocation] = useState('')
  const [logo, setLogo] = useState<File | null>(null)
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !description || !location || !logo) {
      toast.error('All fields are required!')
      return
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('website', website)
    formData.append('location', location)
    formData.append('logo', logo)
    setLoading(true)
    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        formData,
        {
          withCredentials: true
        }
      )

      if (res.data.success) {
        console.log(res.data.company)

        dispatch(setSingleCompany(res.data.company))
        // const companyId = res.data.company._id
        navigate(`/admin/companies`)
        toast.success('Company Registered Successfully!')
        setName('')
        setDescription('')
        setWebsite('')
        setLogo(null)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Register New Company
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Company Name */}
            <div className="space-y-2">
              <label className="font-medium text-gray-700">Company Name</label>
              <Input
                placeholder="Enter company name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="font-medium text-gray-700">Description</label>
              <Textarea
                placeholder="Enter company description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Website */}
            <div className="space-y-2">
              <label className="font-medium text-gray-700">Website URL</label>
              <Input
                type="url"
                placeholder="https://company.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            {/* location */}
            <div className="space-y-2">
              <label className="font-medium text-gray-700">Location</label>
              <Input
                type="text"
                placeholder="e.g. kolkata"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            {/* Logo Upload */}
            <div className="space-y-2">
              <label className="font-medium text-gray-700">Company Logo</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setLogo(e.target.files?.[0] || null)}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full py-5 text-lg">
              {loading ? "Creating...": "Register Company"}
            </Button>
          </form>
          {/* Cancel Button */}
          <Button
            type="button"
            className="mt-2 w-full bg-red-500 py-5 text-lg hover:bg-red-600"
            onClick={() => navigate('/admin/companies')}
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
