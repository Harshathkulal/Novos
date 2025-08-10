import { Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET: Secret = process.env.JWT_SECRET_KEY as string;
const JWT_REFRESH_SECRET: Secret = process.env.JWT_REFRESH_SECRET_KEY as string;
const ACCESS_TOKEN_EXPIRES_IN = process.env.JWT_EXPIRY || "1h";
const REFRESH_TOKEN_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRY || "7d";

/**  Calculate Expiry in ms. **/
const calculateExpiryMs = (expiry: string): number => {
  if (expiry.endsWith("d"))
    return parseInt(expiry.slice(0, -1)) * 24 * 60 * 60 * 1000;
  if (expiry.endsWith("h"))
    return parseInt(expiry.slice(0, -1)) * 60 * 60 * 1000;
  if (expiry.endsWith("m")) return parseInt(expiry.slice(0, -1)) * 60 * 1000;
  return parseInt(expiry) * 1000;
};

/**  Generate Access Token. **/
export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
};

/**  Generate Refresh Token. **/
export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
};

/**  Verify Access Token. **/
export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
};

/**  Verify Refresh Token. **/
export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, JWT_REFRESH_SECRET) as jwt.JwtPayload;
};

/**  Set Tokens Cookies. **/
export const setTokensCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  const accessExpiryMs = calculateExpiryMs(ACCESS_TOKEN_EXPIRES_IN);
  const refreshExpiryMs = calculateExpiryMs(REFRESH_TOKEN_EXPIRES_IN);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: accessExpiryMs,
    path: "/",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: refreshExpiryMs,
    path: "/",
  });
};

/**  Clear Tokens Cookies. **/
export const clearTokensCookies = (res: Response) => {
  res.clearCookie("accessToken", { path: "/" });
  res.clearCookie("refreshToken", { path: "/" });
};
