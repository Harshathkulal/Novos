"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { getUser } from "@/services/userService";
import { AuthContextType } from "@/types/main.type";
import { Loader } from "lucide-react";

const AuthContext = createContext<AuthContextType>({
  userId: null,
  loading: true,
  error: null,
  setUserId: () => {},
  refetch: async () => {},
  userName: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getUser();
      setUserId(res.id);
      setUserName(res.username)
      setError(null);
    } catch {
      setUserId(null);
      setError("Failed to load user info");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

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
      value={{ userId, loading, error, refetch: fetchUser, setUserId, userName }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
