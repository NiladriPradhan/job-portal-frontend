import { Route, Routes } from 'react-router-dom'
import Login from './pages/public/Login'
import SignUp from './pages/public/SignUp'

import Home from './pages/private/Home'
import Jobs from './pages/private/Jobs'
import JobDescription from './pages/private/JobDescription'
import Profile from './pages/private/Profile'

import AdminHome from './pages/private/admin/AdminHome'
import AdminJobs from './pages/private/admin/AdminJobs'

import { PublicLayout } from './components/layout/public/PublicLayout'
import { ToastContainer } from 'react-toastify'
import RecruiterLayout from './components/layout/private/RecruiterLayout'
import StudentLayout from './components/layout/private/StudentLayout'
import NewCompany from './pages/private/admin/NewCompany'
import CompanySetup from './pages/private/admin/CompanySetup'
import NewJob from './pages/private/admin/NewJob'
import Applicants from './pages/private/admin/Applicants'

export default function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path="/login"
          element={
            <PublicLayout>
              <Login />
            </PublicLayout>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicLayout>
              <SignUp />
            </PublicLayout>
          }
        />

        {/* -------------------- STUDENT ROUTES -------------------- */}
        <Route
          path="/"
          element={
            <StudentLayout>
              <Home />
            </StudentLayout>
          }
        />
{/* 
        <Route
          path="/browse"
          element={
            <StudentLayout>
              <Browse />
            </StudentLayout>
          }
        /> */}

        <Route
          path="/jobs"
          element={
            <StudentLayout>
              <Jobs />
            </StudentLayout>
          }
        />

        <Route
          path="/description/:id"
          element={
            <StudentLayout>
              <JobDescription />
            </StudentLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <StudentLayout>
              <Profile />
            </StudentLayout>
          }
        />

        {/* -------------------- RECRUITER ROUTES -------------------- */}
        <Route
          path="/admin/companies"
          element={
            <RecruiterLayout>
              <AdminHome />
            </RecruiterLayout>
          }
        />

        <Route
          path="/admin/jobs"
          element={
            <RecruiterLayout>
              <AdminJobs />
            </RecruiterLayout>
          }
        />
        <Route
          path="/admin/jobs/new"
          element={
            <RecruiterLayout>
              <NewJob />
            </RecruiterLayout>
          }
        />
        <Route
          path="/admin/new-company/create"
          element={
            <RecruiterLayout>
              <NewCompany />
            </RecruiterLayout>
          }
        />
        <Route
          path="/admin/companies/:id"
          element={
            <RecruiterLayout>
              <CompanySetup />
            </RecruiterLayout>
          }
        />

        <Route
          path="/admin/jobs/:id/applicants"
          element={
            <RecruiterLayout>
              <Applicants />
            </RecruiterLayout>
          }
        />

        {/* 404 */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  )
}
