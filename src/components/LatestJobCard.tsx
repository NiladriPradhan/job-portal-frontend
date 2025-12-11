import { Link } from 'react-router-dom'
import { Badge } from './ui/badge'
import { Card, CardContent, CardDescription, CardTitle } from './ui/card'
import { daysAgo } from '@/utils/daysAgo'

interface Company {
  name: string
  description?: string
  website?: string
}

interface LatestJobCardProps {
  job: {
    _id: string | number
    title: string
    description: string
    experiencelevel?: number
    jobType: string
    location: string
    position?: string
    salary: number
    createdAt: string
    company?: Company      // 👈 now optional
    requirements?: string[]
  }
}


export default function LatestJobCard({ job }: LatestJobCardProps) {
  const {
    _id,
    title,
    description,
    experiencelevel,
    jobType,
    location,
    createdAt,
    salary,
    company
  } = job

  // Convert company to display string
  // const companyDisplay = Array.isArray(company) ? company.join(', ') : company

  // const companyDisplay = Array.isArray(company)
  //   ? company.map((c) => c.name).join(', ')
  //   : company?.name || 'Unknown Company'

  const companyDisplay = company?.name || 'Unknown Company'

  const truncateDesc = (str: string) =>
    str.length > 40 ? str.slice(0, 40) + '...' : str

  return (
    <div className="w-full">
      <Card>
        <div className="mt-4 mb-2 ml-6">
          <p>{daysAgo(createdAt)}</p>
          <CardTitle>{companyDisplay}</CardTitle>
          <CardDescription>{location}</CardDescription>
        </div>
        <CardContent>
          <h1 className="font-semibold">
            <Link to={`/description/${_id}`} className="hover:underline">
              {title}
            </Link>
          </h1>
          <p> {truncateDesc(description)}</p>
          <div className="mt-2 flex gap-x-2">
            <Badge
              className="font-bold whitespace-nowrap text-blue-700"
              variant="outline"
            >
              {experiencelevel} position
            </Badge>
            <Badge
              className="font-bold whitespace-nowrap text-[#F83002]"
              variant="outline"
            >
              {jobType}
            </Badge>
            <Badge
              className="font-bold whitespace-nowrap text-blue-700"
              variant="outline"
            >
              {salary} LPA
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
