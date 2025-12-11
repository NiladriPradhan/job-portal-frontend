import { Search } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useState } from 'react'
import {  setSearchJobByText } from '@/redux/jobsSlice'
import { useDispatch } from 'react-redux'

export default function HeroSection() {
  const dispatch = useDispatch()
  const [query, setQuery] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setQuery(value)
  }
  const hanldeSearch = () => {
    dispatch(setSearchJobByText(query))
  }
  return (
    <div>
      <div className="mx-auto flex min-h-[20vh] flex-col items-center justify-center">
        <div className="mt-10 space-y-2">
          <span className="text-md mx-auto block w-fit rounded-md bg-amber-100 px-4 py-1 text-center font-semibold text-gray-800 capitalize">
            No 1 Job hunt website
          </span>

          <h1 className="text-center text-5xl font-bold capitalize">
            Search, apply & <br />
            get your <span className="text-blue-700">dream jobs</span>
          </h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Consequuntur autem sed aliquid placeat eos itaque beatae.{' '}
          </p>
          <div className="mx-auto mt-4 flex w-8/12 justify-center">
            <Input
              placeholder="Search job"
              className="rounded-l-full rounded-r-none shadow-[0_4px_25px_rgba(0,0,0,0.2)] outline-none"
              value={query}
              onChange={handleChange}
            />

            <Button
              onClick={hanldeSearch}
              variant={'default'}
              className="rounded-l-none rounded-r-full bg-blue-600 hover:bg-blue-800"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
