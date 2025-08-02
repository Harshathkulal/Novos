"use client";

import { useEffect, useState, useRef } from "react";
import {
  initiateSocket,
  sendMessage as sendSocketMessage,
  subscribeToMessages,
  disconnectSocket,
} from "@/lib/socket";
import api from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAllUser } from "@/services/userService";
import { useAuth } from "@/redux/AuthProvider";

interface User {
  _id: string;
  fullName: string;
}

interface Message {
  senderId: string;
  receiverId: string;
  message: string;
}

export default function Chat() {
  const { userId } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [receiver, setReceiver] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. On mount, get current user + list of users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUser();
        setUsers(allUsers.users);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };

    fetchUsers();
  }, [userId]);

  // 2. Initialize socket once when userId is available
  useEffect(() => {
    if (!userId) return;

    initiateSocket(userId as string);
    subscribeToMessages((message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Cleanup: disconnect socket on unmount or userId change
    return () => {
      disconnectSocket();
    };
  }, [userId]);

  // 3. Fetch messages whenever the receiver changes
  useEffect(() => {
    if (!receiver) {
      setMessages([]); // Clear messages if no receiver selected
      return;
    }

    const fetchMessages = async () => {
      try {
        const res = await api.get(`/messages/${receiver._id}`);
        console.log(res.data)
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };

    fetchMessages();
  }, [receiver]);

  // 4. Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !receiver) return;

    // WebSocket message
    sendSocketMessage(input, receiver._id);

    // Persist via HTTP
    try {
      await api.post(`/messages/send/${receiver._id}`, { message: input });
    } catch (err) {
      console.error("Failed to save message", err);
    }

    // Optimistic UI update
    setMessages((prev) => [
      ...prev,
      { senderId: userId as string, receiverId: receiver._id, message: input },
    ]);

    setInput("");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar - User list */}
      <div className="w-64 border-r p-4">
        <h2 className="font-bold mb-4">Users</h2>
        {users.map((user) => (
          <div
            key={user._id}
            className="cursor-pointer p-2 hover:bg-gray-100 rounded"
            onClick={() => setReceiver(user)}
          >
            {user.fullName}
          </div>
        ))}
      </div>

      {/* Chat window */}
      <div className="flex-1 flex flex-col p-4">
        {receiver ? (
          <>
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">
              Chat with {receiver.fullName}
            </h2>
            <div className="flex flex-col flex-1 overflow-y-auto space-y-2 mb-4">
              {messages?.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-xs p-2 rounded ${
                    msg.senderId === userId
                      ? "bg-primary self-end"
                      : "bg-secondary self-start"
                  }`}
                >
                  {msg.message}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="mt-4 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend}>Send</Button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a user to start chatting.
          </div>
        )}
      </div>
    </div>
  );
}
