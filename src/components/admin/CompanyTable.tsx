import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { Button } from '../ui/button'
import type { ReactNode } from 'react'

// Utility: Days ago
function daysAgo(dateString: string) {
  const created = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - created.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24)) // days
}
interface Company {
  _id: string
  name: string

  // optional fields (because APIs differ)
  description?: string
  website?: string
  logo?: string
  location?: ReactNode | string
  createdAt?: string
}

export default function CompanyTable({
  companies,
  onEdit
}: {
  companies: Company[]
  onEdit: (id: string) => void
}) {
  return (
    <div className="rounded-xl border p-4 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">SL_NO</TableHead>
            <TableHead className="w-20">ID_NO</TableHead>
            <TableHead className="w-20">Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {companies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="py-6 text-center">
                No Companies Found
              </TableCell>
            </TableRow>
          ) : (
            companies.map((company, i) => (
              <TableRow key={company._id}>
                {/* SL NO */}
                <TableCell className="font-medium">{i + 1}</TableCell>
                {/* ID NO */}
                <TableCell className="font-medium">{company._id}</TableCell>

                {/* LOGO */}
                <TableCell>
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-12 w-12 rounded-full border object-cover"
                  />
                </TableCell>

                {/* NAME */}
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell className="font-medium">
                  {company.location}
                </TableCell>

                {/* CREATED DATE */}
                <TableCell>{company.createdAt ? `${daysAgo(company.createdAt)} days ago` : 'N/A'}</TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div>
                        <Button
                          onClick={() => onEdit(company._id)}
                          className="flex items-center gap-x-2 text-gray-600"
                          variant={'outline'}
                        >
                          <Edit2 className="h-4 w-4" />
                          <span>Edit</span>
                        </Button>
                      </div>
                      <hr />
                      {/* <div className="mt-2 flex items-center gap-x-2 rounded-md bg-red-600 text-white">
                        <DeleteIcon className="h-4 w-4" />
                        <span>Delete</span>
                      </div> */}
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
