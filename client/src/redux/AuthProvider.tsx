"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "@/services/userService";
import { AuthContextType } from "@/types/main.type";

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

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await getUser();
      setUserId(res.id);
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
    <AuthContext.Provider
      value={{ userId, loading, error, refetch: fetchUser, setUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
