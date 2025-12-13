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
import { setLoading, setUser } from '@/redux/userSlice'
import { USER_API_ENDPOINT } from '@/utils/constants'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface FormData {
  username: string
  email: string
  password: string
  role: string
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    role: ''
  })
  const navigate = useNavigate()
  const { loading } = useSelector((state: any) => state.auth)
  const dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      dispatch(setLoading(true))

      const res = await axios.post(
        `${USER_API_ENDPOINT}/login`,
        {
          email: formData.email,
          password: formData.password,
          role: formData.role
        },
        { withCredentials: true }
      )

      if (res.data.success) {
        const serverRole = res.data.user.role
        const selectedRole = formData.role

        // Role mismatch error
        if (serverRole !== selectedRole) {
          toast.error(
            `You are registered as "${serverRole}". Please login using the ${serverRole} role.`
          )
          return
        }

        // FIXED HERE
        toast.success(res.data.message)

        localStorage.setItem('user', JSON.stringify(res.data.user))
        dispatch(setUser(res.data.user))
        navigate('/')
      }
    } catch (error) {
      console.log('Login Error:', error)
      const axiosError = error as AxiosError<{ message: string }>
      toast.error(axiosError?.response?.data?.message || 'Login failed')
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="mx-auto flex min-h-[80vh] items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>login your account</CardTitle>
            <CardDescription>
              Enter your email,password to login your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
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
                </RadioGroup>
              </div>
              <div className="mt-4 w-full flex-col gap-2 space-y-2">
                <Button type="submit" className="w-full">
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 text-gray-100" />
                  ) : (
                    'Login'
                  )}
                </Button>
                <Button variant="outline" className="w-full">
                  <Link
                    to={'/signup'}
                    className="decoration-0 hover:text-blue-600 hover:underline"
                  >
                    i dont have an account?
                  </Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
