/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/axios";

export const getUser = async () => {
  try {
    const response = await api.get("/users/getUser");
    return response.data.user;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to fetch user");
  }
};

export const getAllUser = async () => {
  try {
    const allUsers = await api.get("/users/users");
    return allUsers.data;
  } catch (err: any) {
    throw new Error(err?.message || "Failed to fetch users");
  }
};
