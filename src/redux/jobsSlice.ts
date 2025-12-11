import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ReactNode } from 'react'

export interface JobType {
  job: unknown
  createdAt: unknown
  status: ReactNode
  _id: string
  title: string
  description: string
  location: string
  salary: number
  jobType: string
  responsibilities: string[]
  requirements: string[]
  applications: { applicant: string }[]
  company: {
    name: string
    logo?: string
    website?: string
  }
}

interface JobsState {
  jobs: JobType[]
  singleJob: JobType | null
  allAdminJobs: JobType[]
  filteredJobs: JobType[]
  searchJobByText: string
  searchJobByQuery: string
  allAppliedJobs: JobType[]
  loading: boolean
}

const initialState: JobsState = {
  jobs: [],
  singleJob: null,
  allAdminJobs: [],
  filteredJobs: [],
  searchJobByText: '',
  searchJobByQuery: '',
  allAppliedJobs: [],

  loading: false
}

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<JobType[]>) => {
      state.jobs = action.payload
      state.filteredJobs = action.payload
    },
    setSingleJob: (state, action: PayloadAction<JobType>) => {
      state.singleJob = action.payload
    },
    setSearchJobByQuery: (state, action: PayloadAction<string>) => {
      state.searchJobByQuery = action.payload
    },

    setAllAdminJobs: (state, action: PayloadAction<JobType[]>) => {
      state.allAdminJobs = action.payload
    },
    setSearchJobByText: (state, action: PayloadAction<string>) => {
      const query = action.payload.toLowerCase()
      state.searchJobByText = query
      state.filteredJobs = state.jobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.company?.name?.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query)
        )
      })
    },
    setAllAppliedJobs: (state, action: PayloadAction<JobType[]>) => {
      state.allAppliedJobs = action.payload
    }
  }
})

export const {
  setJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setSearchJobByQuery,
  setAllAppliedJobs
} = jobSlice.actions
export default jobSlice.reducer
