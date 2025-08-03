import { Request, Response } from "express";
import { generateJWT, clearJWT } from "../utils/jwt-utils";
import { AuthService } from "../services/auth/authService";

const authService = new AuthService();

/* * Method to handle errors in the application.
 *  @param res - 500.
 */
const handleError = (res: Response, error: any) => {
  console.error("Error:", error);
  res.status(500).json({ message: "Server Error!" });
};

/* * Method to Register User.
    params req - { username, email, password }.
 */
const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const result = await authService.register({ username, email, password });
    res.status(201).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

/* * Method to Login User.
 * params req - { username/email, password }.
 */
const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier, password } = req.body;
    const result = await authService.login({ identifier, password });
    generateJWT(res, result.user.id as unknown as string);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

/* * Method to Logout User.
 */
const logout = async (_req: Request, res: Response): Promise<void> => {
  try {
    clearJWT(res);
    res.status(200).json({ message: "Logout successful!" });
  } catch (error) {
    handleError(res, error);
  }
};

/* * Method to get session.
 * params req - cookies.
 */
const session = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.jwt;
    const result = await authService.session(token);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

export { register, login, logout, session };
