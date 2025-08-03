import { UserDB } from "../repository/mongoDB/userDB";

const userDB = new UserDB();

export class UserService {
  /**
   * Method to get user by ID.
   * @param userId - The ID of the user to fetch.
   */
  async getUserById(userId: string): Promise<any> {
    const user = await userDB.findById(userId);
    if (!user) {
      throw new Error("User not found!");
    }
    return {
      message: "User fetched successfully!",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    };
  }

  /**
   * Method to get all users except the logged-in user.
   * @param exceptUserId - The ID of the user to exclude from the list.
   */
  async getAllUsers(exceptUserId: string): Promise<any[]> {
    const users = await userDB.findAllUsers(exceptUserId);
    return users.map((user) => ({
      _id: user._id,
      username: user.username,
      profileImg: user.profileImg,
    }));
  }
}
