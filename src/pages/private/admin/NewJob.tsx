import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import axios from 'axios'
import { COMPANY_API_ENDPOINT, JOB_API_ENDPOINT } from '@/utils/constants'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function NewJob() {
  const navigate = useNavigate()
  const [companies, setCompanies] = useState<{ _id: string; name: string }[]>(
    []
  )
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    experience: '',
    location: '',
    jobType: '',
    position: '',
    companyId: ''
  })

  // Fetch companies for dropdown
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, {
          withCredentials: true
        })
        setCompanies(res.data.companies || [])
      } catch (err) {
        console.log('Error loading companies', err)
      }
    }

    fetchCompanies()
  }, [])

  // handle input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // handle select
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  // handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, formData, {
        withCredentials: true
      })
      navigate('/admin/jobs');
      toast.success('Job Created Successfully!')
      console.log(res.data)

      // reset form
      setFormData({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        experience: '',
        location: '',
        jobType: '',
        position: '',
        companyId: ''
      })
    } catch (err) {
      console.log('Error posting job', err)
      alert('Error creating job')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-4 p-4">
      {/* Title */}
      <div>
        <Label>Job Title</Label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter job title"
        />
      </div>

      {/* Description */}
      <div>
        <Label>Description</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter job description"
        />
      </div>

      {/* Requirements */}
      <div>
        <Label>Requirements (comma separated)</Label>
        <Input
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          placeholder="React, Node.js, MongoDB"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Salary */}
        <div>
          <Label>Salary (LPA)</Label>
          <Input
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Enter salary"
          />
        </div>

        {/* Experience */}
        <div>
          <Label>Experience (years)</Label>
          <Input
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="2"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <Label>Location</Label>
        <Input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Mumbai, Pune, Remote"
        />
      </div>

      {/* Job Type */}
      <div>
        <Label>Job Type</Label>
        <Select onValueChange={(value) => handleSelectChange('jobType', value)}>
          <SelectTrigger>
            <SelectValue placeholder={formData.jobType || 'Select job type'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Full-Time">Full-Time</SelectItem>
            <SelectItem value="Part-Time">Part-Time</SelectItem>
            <SelectItem value="Internship">Internship</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Position */}
      <div>
        <Label>Position</Label>
        <Input
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="Senior Developer, Junior React Dev"
        />
      </div>

      {/* Company Dropdown */}
      <div>
        <Label>Company</Label>
        <Select
          onValueChange={(value) => handleSelectChange('companyId', value)}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={
                formData.companyId
                  ? companies.find((c) => c._id === formData.companyId)?.name
                  : 'Select company'
              }
            />
          </SelectTrigger>

          <SelectContent>
            {companies.map((company) => (
              <SelectItem key={company._id} value={company._id}>
                {company.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Creating...' : 'Create Job'}
      </Button>
    </form>
  )
}
