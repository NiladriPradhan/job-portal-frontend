import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/store/store'
import { logout } from '@/redux/userSlice'

const Navbar = () => {
  // const { user, setUser } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)

  const handleLogout = () => {
    localStorage.removeItem('user')
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="flex items-center justify-between border border-b px-10 py-4 shadow-sm shadow-black/5">
      <h1 className="text-2xl font-bold">
        Job<span className="text-[#F83002]">Portal</span>
      </h1>

      <div className="flex items-center gap-x-4 ">
        {user && user.role === 'recruiter' ? (
          <>
            <ul className="flex items-center gap-x-4 text-lg">
              <li>
                <Link to="/admin/companies">Companies</Link>
              </li>
              <li>
                <Link to="/admin/jobs">Jobs</Link>
              </li>
            </ul>
          </>
        ) : (
          <ul className="flex items-center gap-x-4 text-lg">
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* <li>
              <Link to="/browse">Browse</Link>
            </li> */}
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
          </ul>
        )}

        {user ? (
          <Popover>
            <PopoverTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user?.profile?.profilePhoto} />
                <AvatarFallback>{user?.fullname?.[0] ?? 'U'}</AvatarFallback>
              </Avatar>
            </PopoverTrigger>

            <PopoverContent className="flex w-80 items-center gap-x-4">
              <Avatar>
                <AvatarImage src={user?.profile?.profilePhoto} />
                <AvatarFallback>{user?.fullname?.[0] ?? 'U'}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-start">
                <h2 className="text-lg font-semibold">{user?.fullname}</h2>
                <p className="text-muted-foreground text-sm">{user?.email}</p>

                <div className="flex gap-x-2">
                  <Button variant="link">
                    <Link to="/profile">view profile</Link>
                  </Button>
                  <Button
                    className="text-red-600"
                    variant="link"
                    onClick={handleLogout}
                  >
                    logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex items-center gap-x-4">
            <Link to="/signup">
              <Button>Signup</Button>
            </Link>

            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
