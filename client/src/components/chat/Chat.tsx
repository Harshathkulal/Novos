import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { Outlet, useLocation } from "react-router-dom";
import UserList from "@/components/chat/UserList";
import { setUsers } from "@/redux/slices/chatSlice";
import { getAllUser } from "@/services/userService";
import { toast } from "sonner";
import {
  initiateSocket,
  subscribeToMessages,
  disconnectSocket,
} from "@/lib/socket";
import { addMessage } from "@/redux/slices/chatSlice";

export default function Chat() {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.chat);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  const isChatWithUser = /^\/chat\/[^/]+$/.test(location.pathname);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUser();
        dispatch(setUsers(res.data));
      } catch {
        toast.error("Failed to fetch users.");
      }
    };

    if (!users.length) {
      fetchUsers();
    }
  }, [dispatch, users.length]);

  useEffect(() => {
    if (!userInfo?.id) return;

    initiateSocket(userInfo.id);
    subscribeToMessages((message) => {
      dispatch(addMessage(message));
    });

    return () => disconnectSocket();
  }, [userInfo?.id, dispatch]);

  return (
    <div className="flex h-screen">
      <div
        className={`border-r w-full md:w-1/3 ${
          isChatWithUser ? "hidden md:block" : "block"
        }`}
      >
        <UserList
          userName={userInfo?.username || userInfo?.email || "Me"}
          users={users}
        />
      </div>

      <div className={`flex-1 ${isChatWithUser ? "block" : "hidden md:block"}`}>
        <Outlet />
      </div>
    </div>
  );
}
