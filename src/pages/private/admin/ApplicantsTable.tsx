import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { APPLICATION_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import { toast } from 'react-toastify'

interface Applicant {
  _id: string
  fullname: string
  email: string
  phoneNumber: string
  resume: string
  resumeOriginalName?: string
  appliedAt: string
  status?: 'pending' | 'accepted' | 'rejected'
}

export default function ApplicantsTable({
  applicants = []
}: {
  applicants?: Applicant[]
}) {
  const handleStatusChange = async (
    applicationId: string,
    status: 'accepted' | 'rejected'
  ) => {
    try {
      const res = await axios.put(
        `${APPLICATION_API_ENDPOINT}/status/${applicationId}/update`,
        { status },
        { withCredentials: true }
      )

      if (res.data.success) {
        toast.success(`Application ${status}`)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  return (
    <Card className="mt-6">
      <CardContent className="p-4">
        <h2 className="mb-4 text-xl font-semibold">Applicants</h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {applicants.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-6 text-center text-gray-500"
                >
                  No applicants yet.
                </TableCell>
              </TableRow>
            )}

            {applicants.map((applicant) => (
              <TableRow key={applicant._id}>
                <TableCell>{applicant.fullname}</TableCell>
                <TableCell>{applicant.email}</TableCell>
                <TableCell>{applicant.phoneNumber}</TableCell>

                <TableCell>
                  <a
                    href={applicant.resume}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    {applicant.resumeOriginalName
                      ? applicant.resumeOriginalName
                      : 'N/A'}
                  </a>
                </TableCell>

                <TableCell>
                  {new Date(applicant.appliedAt).toLocaleDateString('en-IN')}
                </TableCell>

                <TableCell className="flex items-center justify-center gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() =>
                      handleStatusChange(applicant._id, 'accepted')
                    }
                  >
                    Accept
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      handleStatusChange(applicant._id, 'rejected')
                    }
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
