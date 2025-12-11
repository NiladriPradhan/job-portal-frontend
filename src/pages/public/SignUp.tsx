import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useState } from 'react'
import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom'
import { USER_API_ENDPOINT } from '@/utils/constants'
import { toast } from 'react-toastify'
import { Loader2 } from 'lucide-react'
export default function SignUp() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: null as File | null
  })
  const navigate = useNavigate()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({
      ...prev,
      file
    }))
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = new FormData()
      data.append('fullname', formData.fullname)
      data.append('email', formData.email)
      data.append('phoneNumber', formData.phoneNumber)
      data.append('password', formData.password)
      data.append('role', formData.role)
      if (formData.file) data.append('profilePhoto', formData.file)

      const res = await axios.post(`${USER_API_ENDPOINT}/register`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      })

      console.log('Signup response:', res.data)

      toast.success(res.data.message || 'Signup success!')
      navigate('/login')
    } catch (error: any) {
      console.log('Signup error:', error)
      toast.error(error?.response?.data?.message || 'Signup failed')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>sign up with your new account</CardTitle>
          <CardDescription>
            Enter your fullname, email,password to create your new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="fullname"
                  type="fullname"
                  name="fullname"
                  placeholder="john doe"
                  required
                  value={formData.fullname}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">phoneNumber</Label>
                <Input
                  id="phoneNumber"
                  type="number"
                  name="phoneNumber"
                  placeholder="m@example.com"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <RadioGroup
              defaultValue="comfortable"
              className="mt-4 flex gap-x-2"
              onValueChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  role: value
                }))
              }}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="student" id="r1" />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="recruiter" id="r2" />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="file"
                  name="profilePhoto"
                  accept="image/*"
                  onChange={handleFile}
                />

                <Label htmlFor="r2">File</Label>
              </div>
            </RadioGroup>
            <div className="mt-4 w-full flex-col gap-2 space-y-2">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Please wait...' : 'Signup'}
              </Button>
              <Button variant="outline" className="w-full">
                <Link
                  to={'/login'}
                  className="decoration-0 hover:text-blue-600 hover:underline"
                >
                  already have an account
                </Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
