import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import type { RootState } from "@/redux/store";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { userInfo } = useSelector((state: RootState) => state.user);

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
