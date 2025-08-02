import api from "@/lib/axios";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", {
      identifier: email,
      password,
    });

    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await api.post("/auth/register", {
      username,
      email,
      password,
    });

    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};
