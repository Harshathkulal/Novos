"use client";

import { useEffect, useState, useRef } from "react";
import {
  initiateSocket,
  sendMessage as sendSocketMessage,
  subscribeToMessages,
  disconnectSocket,
} from "@/lib/socket";
import { getAllUser } from "@/services/userService";
import { getMessage, sendMessage } from "@/services/messageService";
import { toast } from "sonner";
import { useAuth } from "@/redux/AuthProvider";
import { User, Message } from "@/types/hook.types";

export const useChat = () => {
  const { userId } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [receiver, setReceiver] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUser();
        setUsers(res.users);
      } catch {
        toast.error("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    initiateSocket(userId);
    subscribeToMessages((message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      disconnectSocket();
    };
  }, [userId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!receiver) {
        setMessages([]);
        return;
      }

      try {
        const res = await getMessage(receiver.id);
        setMessages(res);
      } catch {
        toast.error("Failed to fetch messages.");
      }
    };

    fetchMessages();
  }, [receiver]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !receiver) return;

    sendSocketMessage(input, receiver.id);

    try {
      await sendMessage(receiver.id, input);
    } catch (err) {
      console.error("Failed to save message", err);
    }

    setMessages((prev) => [
      ...prev,
      { senderId: userId as string, receiverId: receiver.id, message: input },
    ]);

    setInput("");
  };

  return {
    users,
    receiver,
    setReceiver,
    messages,
    input,
    setInput,
    handleSend,
    messagesEndRef,
    userId,
  };
};
