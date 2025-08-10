import { UserDB } from "../repository/mongoDB/userDB";
import { ApiError } from "../utils/apiError";

const userDB = new UserDB();

export class UserService {
  /** Get user by ID. Service*/
  async getUserById(userId: string) {
    const user = await userDB.findById(userId);
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

  /** Get all users except the given user ID. Service*/
  async getAllUsers(exceptUserId: string) {
    const users = await userDB.findAllUsers(exceptUserId);
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      profileImg: user.profileImg,
    }));
  }
}
