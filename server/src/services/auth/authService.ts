import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUserRepository } from "../../repository/UserRepository";
import { UserDB } from "../../repository/mongoDB/userDB";
import dotenv from "dotenv";
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
  async register({ username, email, password }: Register): Promise<{ message: string }> {
    const existingEmail = await userRepo.findByEmail(email);
    const existingUsername = await userRepo.findByUsername(username);
    if (existingEmail || existingUsername) {
      throw new Error(existingEmail ? "Email already exists!" : "Username already exists!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userRepo.createUser({ username, email, password: hashedPassword });
    return { message: "User created successfully!" };
  }

  async login({ identifier, password }: Login): Promise<{ message: string; user: any }> {
    const user = identifier.includes("@")
      ? await userRepo.findByEmail(identifier)
      : await userRepo.findByUsername(identifier);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials!");
    }
    return {
      message: "Login successful!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }


  async session(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      let userId: string | undefined;
      if (typeof decoded === "object" && "userId" in decoded) {
        userId = (decoded as jwt.JwtPayload).userId as string;
      }
      if (!userId) {
        throw new Error("Invalid token payload!");
      }
      const user = await userRepo.findById(userId);
      if (!user) {
        throw new Error("User not found!");
      }
      return {
        message: "Token is valid!",
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
        },
      };
    } catch (error) {
      throw new Error("Invalid token!");
    }
  }
}
