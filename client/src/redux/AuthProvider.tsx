"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";

type User = { _id: string; fullName: string; email: string };
interface AuthContextType {
  userId: User | string | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  refetch: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  userId: "",
  loading: true,
  error: null,
  setUser: () => {},
  refetch: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await api.get("/auth/getUser");
      setUser(res.data.user._id);
      setError(null);
    } catch (err) {
      console.error("Failed to load user:", err);
      setError("Failed to load user info");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, loading, error, refetch: fetchUser ,setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
