/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/axios";

export const getPosts = async () => {
  try {
    const response = await api.get("/threads");
    return response.data.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to fetch posts");
  }
};

export const createPost = async ({
  content,
}: {
  content: string;
}) => {
  try {
    const formData = { content };

    const response = await api.post("/threads", formData);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to create post");
  }
};

export const updatePostApi = async (
  postId: number,
  payload: { content: string }
) => {
  try {
    const response = await api.put(`threads/${postId}`, payload);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to update post");
  }
};

export const deletePostApi = async (postId: number) => {
  try {
    const response = await api.delete(`threads/${postId}`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to delete post");
  }
};

export const likePostApi = async (postId: number) => {
  try {
    const response = await api.post(`/threads/${postId}/like`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to like post");
  }
};
