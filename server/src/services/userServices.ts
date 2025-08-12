import { RepositoryRepo } from "../repository/registry";
import { ApiError } from "../utils/apiError";

const { userRepo } = RepositoryRepo();

export class UserService {
  /** Get user by ID. Service*/
  async getUserById(userId: string) {
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

  /** Get all users except the given user ID. Service*/
  async getAllUsers(exceptUserId: string) {
    const users = await userRepo.findAllUsers(exceptUserId);
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      profileImg: user.profileImg,
    }));
  }
}
