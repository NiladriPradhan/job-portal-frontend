import CompanyTable from '@/components/admin/CompanyTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AdminHome() {
  const [companies, setCompanies] = useState([])
  const [search, setSearch] = useState('')  // 🟢 New search state

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, {
          withCredentials: true
        })
        if (res.data.success) {
          setCompanies(res.data.companies)
        }
      } catch (error) {
        console.log('error in fetch companies', error)
      }
    }
    fetchAllCompanies()
  }, [])

  function handleEdit(id: string) {
    const company = companies.find((c) => c._id === id)
    dispatch(setSingleCompany(company))
    navigate(`/admin/companies/${id}`)
  }

  // 🔍 FILTER COMPANIES BASED ON SEARCH INPUT
  const filteredCompanies = companies.filter((company: any) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold">Companies</h1>

      <div className="mx-auto my-10 max-w-7xl">
        <div className="my-5 flex items-center justify-between">
          {/* Search Input */}
          <Input
            className="w-sm"
            placeholder="Filter by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button
            className="cursor-pointer"
            onClick={() => navigate('/admin/new-company/create')}
          >
            New Company
          </Button>
        </div>
      </div>

      {/* Pass filtered list to table */}
      <CompanyTable
        companies={filteredCompanies}
        onEdit={handleEdit}
      />
    </div>
  )
}
