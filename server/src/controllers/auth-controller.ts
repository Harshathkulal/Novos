import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { UserDB } from "../repository/mongoDB/userDB";
import { generateJWT, clearJWT } from "../utils/jwt-utils";
import { IUserRepository } from "repository/UserRepository";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY!;
const userDB: IUserRepository = new UserDB();

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

    if (!username || !email || !password) {
      res.status(400).json({ message: "Please enter all fields!" });
      return;
    }

    const existingEmail = await userDB.findByEmail(email);
    const existingUsername = await userDB.findByUsername(username);

    if (existingEmail || existingUsername) {
      res.status(400).json({
        message: existingEmail
          ? "Email already exists!"
          : "Username already exists!",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userDB.createUser({ username, email, password: hashedPassword });

    res.status(201).json({ message: "User created successfully!" });
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

    if (!identifier || !password) {
      res.status(400).json({ message: "Please enter all fields!" });
      return;
    }

    const user = identifier.includes("@")
      ? await userDB.findByEmail(identifier)
      : await userDB.findByUsername(identifier);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ message: "Invalid credentials!" });
      return;
    }

    generateJWT(res, user._id as unknown as string);
    res.status(200).json({
      message: "Login successful!",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
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

/* * Method to Reset User.
 * params req - { password, token }.
 */
const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { password, token } = req.body;

    if (!password || !token) {
      res.status(400).json({ message: "Please enter all fields!" });
      return;
    }

    if (!JWT_SECRET) {
      res.status(500).json({ message: "JWT secret not configured" });
      return;
    }
    const decoded = jwt.verify(token, JWT_SECRET) as unknown as {
      email: string;
    };
    const user = await userDB.findByEmail(decoded.email);

    if (!user) {
      res.status(400).json({ message: "User not found!" });
      return;
    }

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    handleError(res, error);
  }
};

/* * Method to get User.
 * params req - { password, token }.
 */
const getUser = async (
  req: Request & { user?: { _id: string } },
  res: Response
): Promise<void> => {
  try {
    const user = await userDB.findById(req.user?._id);

    if (!user) {
      res.status(400).json({ message: "User not found!" });
      return;
    }

    res.status(200).json({ message: "User fetched successfully!", user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      }, });
  } catch (error) {
    handleError(res, error);
  }
};

const verifyToken = (req: Request, res: Response) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ valid: false, message: "No token provided" });
      return;
    }
    if (!JWT_SECRET) {
      res
        .status(500)
        .json({ valid: false, message: "JWT secret not configured" });
      return;
    }
    jwt.verify(token, JWT_SECRET);
    res.status(200).json({ valid: true, message: "Token is valid" });
    return;
  } catch (error) {
    res.status(401).json({ valid: false, message: "Token invalid or expired" });
    return;
  }
};

export { register, login, logout, resetPassword, getUser, verifyToken };
