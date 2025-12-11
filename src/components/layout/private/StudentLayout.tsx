// StudentLayout.tsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "@/store/store";
import Navbar from "@/components/shared/Navbar";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) return <Navigate to="/login" replace />;

  // 🔥 If recruiter tries to access student routes → redirect
  if (user.role === "recruiter") return <Navigate to="/admin/companies" replace />;

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
