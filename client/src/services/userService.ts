import api from "@/lib/axios";

export const getAllUser = async () => {
  try {
    const allUsers = await api.get("/user");
    return allUsers.data;
  } catch (err) {
    console.error("Error fetching users", err);
  }
};
