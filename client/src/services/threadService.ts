/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/axios";

export const getThreads = async () => {
  try {
    const response = await api.get("/threads");
    return response.data.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to fetch threads");
  }
};

export const createThread = async ({
  content,
}: {
  content: string;
}) => {
  try {
    const formData = { content };

    const response = await api.post("/threads", formData);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to create thread");
  }
};

export const updateThread = async (
  ThreadId: string,
  payload: { content: string }
) => {
  try {
    const response = await api.put(`threads/${ThreadId}`, payload);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to update thread");
  }
};

export const deleteThread = async (postId: string) => {
  try {
    const response = await api.delete(`threads/${postId}`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to delete thread");
  }
};

export const likeThread = async (ThreadId: string) => {
  try {
    const response = await api.post(`/threads/${ThreadId}/like`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to like thread");
  }
};
