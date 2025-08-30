/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/axios";

export const getPosts = async () => {
  try {
    const response = await api.get("/posts");
    return response.data.data.posts; // assuming your API returns { data: { posts: [...] } }
  } catch (error: any) {
    throw new Error(error?.message || "Failed to fetch posts");
  }
};

export const createPost = async ({
  content,
  image,
}: {
  content: string;
  image?: File | null;
}) => {
  try {
    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);

    const response = await api.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data.post;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to create post");
  }
};

export const updatePostApi = async (
  postId: number,
  payload: { content: string }
) => {
  try {
    const response = await api.put(`/posts/${postId}`, payload);
    return response.data.data.post;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to update post");
  }
};

export const deletePostApi = async (postId: number) => {
  try {
    const response = await api.delete(`/posts/${postId}`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to delete post");
  }
};

export const likePostApi = async (postId: number) => {
  try {
    const response = await api.post(`/posts/${postId}/like`);
    return response.data.data.post; // return updated post with updated like count
  } catch (error: any) {
    throw new Error(error?.message || "Failed to like post");
  }
};
