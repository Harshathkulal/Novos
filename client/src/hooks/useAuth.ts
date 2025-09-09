/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";

export default function useAuth() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const fetchSession = async () => {
      try {
        const res = await api.get("/auth/session", { withCredentials: true });
        if (isMounted)
          dispatch(
            setUser({
              ...res.data.data.user,
              token: res.data.data.tokens?.accessToken,
            })
          );
      } catch (err: any) {
        if (isMounted) {
          if (err.response?.status === 401) {
            dispatch(setUser(null));
          } else {
            console.error("Auth error:", err);
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSession();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return { loading };
}
