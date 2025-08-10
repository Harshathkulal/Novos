import { Request, Response } from "express";
import { generateJWT, clearJWT } from "../utils/jwt-utils";
import { AuthService } from "../services/auth/authService";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";

const authService = new AuthService();

/**  Register Controller. **/
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const result = await authService.register({ username, email, password });

  res
    .status(201)
    .json(new ApiResponse(201, result, "User registered successfully"));
});

/**  Login Controller. **/
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { identifier, password } = req.body;
  const result = await authService.login({ identifier, password });

  generateJWT(res, result.user.id as unknown as string);

  res.status(200).json(new ApiResponse(200, result, "Login successful"));
});

/**  Logout Controller. **/
export const logout = asyncHandler(async (_req: Request, res: Response) => {
  clearJWT(res);
  res.status(200).json(new ApiResponse(200, null, "Logout successful"));
});

/**  Session Controller. **/
export const session = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.jwt;
  const result = await authService.session(token);

  res
    .status(200)
    .json(new ApiResponse(200, result, "Session fetched successfully"));
});
