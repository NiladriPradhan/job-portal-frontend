import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Briefcase, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

interface JobProps {
  _id: string
  title: string
  description: string
  position: string
  jobType: string
  salary: number
}
type JobCardProps = {
  idx?: number
  ago: number | string
  job: JobProps
}

export default function JobCard({ idx, ago, job }: JobCardProps) {
  console.log(idx)

  return (
    <Card className="w-full max-w-xl rounded-xl bg-white p-2 shadow-md">
      <CardContent className="space-y-2">
        {/* Time */}
        <p className="flex items-center gap-1 text-xs text-gray-500">
          <Clock size={14} /> {ago}
        </p>

        {/* Company */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
            <Briefcase size={18} />
          </div>
          <h2 className="text-sm font-semibold">Company Name</h2>
        </div>

        {/* Title */}
        <h3 className="text-base leading-tight font-semibold">{job?.title}</h3>

        {/* Description (1 line only) */}
        <p className="line-clamp-1 text-xs text-gray-600">{job?.description}</p>

        {/* Details row */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-md bg-gray-100 p-1">
            <p className="leading-tight font-semibold">Position</p>
            <p className="leading-tight text-gray-600">{job?.position}</p>
          </div>
          <div className="rounded-md bg-gray-100 p-1">
            <p className="leading-tight font-semibold">Type</p>
            <p className="leading-tight text-gray-600">{job?.jobType}</p>
          </div>
          <div className="rounded-md bg-gray-100 p-1">
            <p className="leading-tight font-semibold">Package</p>
            <p className="leading-tight text-gray-600">{job?.salary} LPA</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" className="h-8 w-full rounded-md text-xs">
            <Link to={`/description/${job?._id}`}>Details</Link>
          </Button>
          <Button className="h-8 w-full rounded-md bg-blue-700 text-xs text-white">
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
    // <Card className="w-full max-w-xl rounded-2xl bg-white p-4 shadow-md">
    //   <CardContent className="space-y-4">
    //     <p className="flex items-center gap-2 text-sm text-gray-500">
    //       <Clock size={16} /> {ago}
    //     </p>

    //     <div className="flex items-center gap-3">
    //       <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
    //         <Briefcase size={24} />
    //       </div>
    //       <h2 className="text-lg font-semibold">Company Name</h2>
    //     </div>

    //     <h3 className="text-xl font-bold">Frontend Developer</h3>

    //     <p className="text-sm text-gray-600">
    //       We are looking for a talented frontend developer skilled in React,
    //       Tailwind, and modern UI development.
    //     </p>

    //     <div className="grid grid-cols-3 gap-3 text-center text-sm">
    //       <div className="rounded-xl bg-gray-100 p-2">
    //         <p className="font-semibold">Position</p>
    //         <p className="text-gray-600">Junior</p>
    //       </div>
    //       <div className="rounded-xl bg-gray-100 p-2">
    //         <p className="font-semibold">Type</p>
    //         <p className="text-gray-600">Full-time</p>
    //       </div>
    //       <div className="rounded-xl bg-gray-100 p-2">
    //         <p className="font-semibold">Package</p>
    //         <p className="text-gray-600">2 LPA</p>
    //       </div>
    //     </div>

    //     <div className="mt-4 flex gap-3">
    //       <Button variant={'outline'} className="w-full rounded-md">
    //         Details
    //       </Button>
    //       <Button
    //         variant="outline"
    //         className="w-full rounded-md bg-blue-700 text-white"
    //       >
    //         Save for Later
    //       </Button>
    //     </div>
    //   </CardContent>
    // </Card>
  )
}
