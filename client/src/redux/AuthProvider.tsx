"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getUser } from "@/services/userService";
import { AuthContextType } from "@/types/main.type";
import { Loader } from "lucide-react";
const publicPaths = ["/login", "/signup"];

const AuthContext = createContext<AuthContextType>({
  userId: null,
  loading: true,
  error: null,
  setUserId: () => {},
  refetch: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await getUser();
      setUserId(res.id);
      setError(null);
    } catch {
      setUserId(null);
      setError("Failed to load user info");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!loading) {
      const isPublic = publicPaths.includes(pathname);
      if (!userId && !isPublic) {
        router.replace("/login");
      }

      if (userId && isPublic) {
        router.replace("/");
      }
    }
  }, [loading, userId, pathname, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin" />
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ userId, loading, error, refetch: fetchUser, setUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
