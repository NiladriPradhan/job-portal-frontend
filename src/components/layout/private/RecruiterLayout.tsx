// RecruiterLayout.tsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "@/store/store";
import Navbar from "@/components/shared/Navbar";

export default function RecruiterLayout({ children }: { children: React.ReactNode }) {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) return <Navigate to="/login" replace />;

  // 🔥 If student tries to access recruiter routes → redirect
  if (user.role === "student") return <Navigate to="/" replace />;

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
