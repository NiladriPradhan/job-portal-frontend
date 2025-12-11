import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { Badge } from './ui/badge'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ui/table'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'

export default function AppliedJobs() {
  useGetAppliedJobs()
  const { allAppliedJobs } = useSelector((state: RootState) => state.jobs)
  console.log('allAppliedJobs', allAppliedJobs)

  return (
    <div className="w-full">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <span>you have not applied for any job</span>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                {/* Applied Date */}
                <TableCell className="font-medium">
                  {appliedJob.createdAt.split('T')[0]}
                </TableCell>

                {/* Job Role */}
                <TableCell>{appliedJob.job?.title}</TableCell>

                {/* Company Name */}
                <TableCell>{appliedJob.job?.company?.name}</TableCell>

                {/* Status */}
                <TableCell className="text-right">
                  {appliedJob.status === 'accepted' ? (
                    <Badge className="rounded-full bg-green-600 text-white">
                      {appliedJob.status}
                    </Badge>
                  ) : appliedJob.status === 'pending' ? (
                    <Badge className="rounded-full bg-gray-900 text-white">
                      {appliedJob.status}
                    </Badge>
                  ) : null}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
