/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/axios";

export const getMessage = async (receiverId: string) => {
  try {
    const allMessages = await api.get(`/messages/${receiverId}`);
    return allMessages.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Failed to fetch messages");
  }
};

export const sendMessage = async (receiverId: string, message: string) => {
  try {
    const response = await api.post(`/messages/send/${receiverId}`, { message });
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Failed to fetch messages");
  }
};
