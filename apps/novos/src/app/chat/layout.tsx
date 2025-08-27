"use client";

import { ReactNode } from "react";
import UserList from "@/components/chat/userList";
import { useChat } from "@/hooks/useChat";
import { useAuth } from "@/redux/AuthProvider";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function ChatLayout({ children }: { children: ReactNode }) {
  const { users, setReceiver } = useChat();
  const { userId: authUserId, loading, userName } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isChatWithUser = /^\/chat\/[^/]+$/.test(pathname);

  useEffect(() => {
    if (!loading && !authUserId) {
      router.push("/login");
    }
  }, [authUserId, loading, router]);

  return (
    <div className="flex h-screen">
      <div
        className={`
          border-r
          w-full md:w-1/3
          ${isChatWithUser ? "hidden md:block" : "block"}
        `}
      >
        <UserList userName={userName} users={users} onSelect={setReceiver} />
      </div>

      <div
        className={`
          flex-1
          ${isChatWithUser ? "block" : "hidden md:block"}
        `}
      >
        {children}
      </div>
    </div>
  );
}
