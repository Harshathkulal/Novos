/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/axios";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", {
      identifier: email,
      password,
    });
    return response.data.data;
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
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const refreshSession = async () => {
  try {
    const response = await api.post("/auth/refresh", {});
    sessionStorage.setItem(
      "accessToken",
      response.data.data.tokens.accessToken
    );
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Session refresh failed");
  }
};
