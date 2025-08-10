import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserDB } from "../repository/mongoDB/userDB";
import { ApiError } from "../utils/apiError";
import { verifyAccessToken } from "../utils/jwt-utils";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const userDB = new UserDB();

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return next(new ApiError(401, "Not authorized, no token"));
    }

    const decoded = verifyAccessToken(token);
    if (!decoded?.userId) {
      return next(new ApiError(401, "Not authorized, invalid token"));
    }

    const user = await userDB.findById(decoded.userId);
    if (!user) {
      return next(new ApiError(401, "Not authorized, user not found"));
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new ApiError(401, "Token expired"));
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new ApiError(401, "Invalid token"));
    }
    console.error("Authentication error:", error);
    return next(new ApiError(500, "Server error during authentication"));
  }
};
