import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption
} from '@/components/ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

function daysAgo(dateString: string) {
  const created = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - created.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

interface Job {
  _id: string
  title: string
  company: {
    _id: string
    name: string
    location?: string
  } | null
  createdAt: string
}

export default function JobTable({
  jobs}: {
  jobs: Job[]
  onEdit: (id: string) => void
}) {
  const navigate = useNavigate()
  return (
    <div className="rounded-xl border p-4 shadow-sm">
      <Table>
        <TableCaption>List of all job posts.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Posted</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {jobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-6 text-center">
                No Jobs Found
              </TableCell>
            </TableRow>
          ) : (
            jobs.map((job, i) => (
              <TableRow key={job._id}>
                <TableCell>{i + 1}</TableCell>

                <TableCell>{job.title}</TableCell>

                <TableCell>{job.company?.name || 'N/A'}</TableCell>

                <TableCell>{daysAgo(job.createdAt)} days ago</TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {/* <Button
                        onClick={() => onEdit(job._id)}
                        className="flex items-center gap-x-2"
                        variant="outline"
                      >
                        <Edit2 className="h-4 w-4" />
                        Edit
                      </Button> */}
                      <hr />
                      <Button
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-x-2"
                        variant="outline"
                      >
                        <Eye className="h-4 w-4" />
                        Applicants
                      </Button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
