"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    async function verifyAuth() {
      const res = await fetch("http://localhost:5000/api/auth/verify", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        router.push("/login");
      }
    }
    verifyAuth();
  }, [router]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      Hello
    </div>
  );
}
