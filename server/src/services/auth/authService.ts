import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
} from "../../utils/jwt-utils";
import { RepositoryRepo } from "../../repository/registry";
import { ApiError } from "../../utils/apiError";
import { Register, Login } from "../../types/service.types";

const { userRepo } = RepositoryRepo();

export class AuthService {
  /**  Register Service. **/
  async register({ username, email, password }: Register) {
    const existingEmail = await userRepo.findByEmail(email);
    if (existingEmail) {
      throw new ApiError(400, "Email already exists!");
    }

    const existingUsername = await userRepo.findByUsername(username);
    if (existingUsername) {
      throw new ApiError(400, "Username already exists!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userRepo.createUser({ username, email, password: hashedPassword });

    return;
  }

  /**  Login Service. **/
  async login({ identifier, password }: Login) {
    const user = identifier.includes("@")
      ? await userRepo.findByEmail(identifier)
      : await userRepo.findByUsername(identifier);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ApiError(401, "Invalid credentials!");
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profileImg: user.profileImg,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  /**  Session Service. **/
  async session(token: string) {
    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch {
      throw new ApiError(401, "Invalid token!");
    }

    const userId = decoded.userId;
    if (!userId) {
      throw new ApiError(400, "Invalid token payload!");
    }

    const user = await userRepo.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found!");
    }

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profileImg: user.profileImg,
      },
       tokens: {
        accessToken:token,
      },
    };
  }
}
