import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { useState } from "react";
import { setMessages, addMessage, setInput } from "@/redux/slices/chatSlice";
import { sendMessage as sendSocketMessage } from "@/lib/socket";
import { getMessage, sendMessage } from "@/services/messageService";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

export const useChat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { users, messages, input } = useSelector(
    (state: RootState) => state.chat
  );

  const { userId: selectedUserId } = useParams();
  const userId = userInfo?.id;
  const [messageLoading, setMessageLoading] = useState(false);

  // Fetch messages only when chat user changes
  useEffect(() => {
    if (!selectedUserId) {
      dispatch(setMessages([]));
      return;
    }

    const fetchMessages = async () => {
      setMessageLoading(true);
      try {
        const res = await getMessage(selectedUserId);
        dispatch(setMessages(res.data));
      } catch {
        toast.error("Failed to fetch messages.");
      } finally {
        setMessageLoading(false);
      }
    };

    fetchMessages();
  }, [selectedUserId, dispatch]);

  // Send message
  const handleSend = async () => {
    if (!input.trim() || !selectedUserId) return;

    sendSocketMessage(input, selectedUserId);
    try {
      await sendMessage(selectedUserId, input);
    } catch (err) {
      console.error("Failed to save message", err);
    }

    dispatch(
      addMessage({
        senderId: userId!,
        receiverId: selectedUserId,
        message: input,
        createdAt: new Date().toString(),
      })
    );

    dispatch(setInput(""));
  };

  // Get receiver directly from Redux users
  const receiver = users.find((u) => u.id === selectedUserId);

  return {
    receiver,
    messages,
    input,
    setInput: (val: string) => dispatch(setInput(val)),
    handleSend,
    userId,
    messageLoading,
  };
};
