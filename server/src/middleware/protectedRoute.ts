import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { UserDB } from "../repository/mongoDB/userDB"

declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}

const userDB = new UserDB()

const JWT_SECRET = process.env.JWT_SECRET_KEY!

/* * Method to protect User.
 * params req - cookies.
 */
export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.jwt
    if (!token) {
      res.status(401).json({ message: "Not authorized, no token" })
      return
    }
    const decode = jwt.verify(token, JWT_SECRET) as { userId: string }
    if (!decode) {
      res.status(401).json({ message: "Not authorized, invalid token" })
      return
    }
    const user = await userDB.findById(decode.userId)
    if (!user) {
      res.status(401).json({ message: "Not authorized, user not found" })
      return
    }
    req.user = user
    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Token expired" })
      return
    }
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid token" })
      return
    }

    console.error("Authentication error:", error)
    res.status(500).json({ message: "Server error during authentication" })
    return
  }
}