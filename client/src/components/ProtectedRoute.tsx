import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuth from "@/hooks/useAuth";
import type { RootState } from "@/redux/store";
import type { ReactNode } from "react";
import Loading from "./loading";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { loading } = useAuth();
  const user = useSelector((state: RootState) => state.user.userInfo);

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
