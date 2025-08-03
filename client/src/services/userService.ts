import api from "@/lib/axios";

export const getAllUser = async () => {
  try {
    const allUsers = await api.get("/users");
    return allUsers.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Failed to fetch users");
  }
};
