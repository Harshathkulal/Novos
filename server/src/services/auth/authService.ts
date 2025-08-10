import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUserRepository } from "../../repository/UserRepository";
import { UserDB } from "../../repository/mongoDB/userDB";
import { ApiError } from "../../utils/apiError";

dotenv.config();

interface Register {
  username: string;
  email: string;
  password: string;
}

interface Login {
  identifier: string;
  password: string;
}

const JWT_SECRET = process.env.JWT_SECRET_KEY!;
const userRepo: IUserRepository = new UserDB();

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

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }

  /**  Session Service. **/
  async session(token: string) {
    let decoded: jwt.JwtPayload;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
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
    };
  }
}
