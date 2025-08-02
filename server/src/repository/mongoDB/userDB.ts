import User from "../../models/user-modal";

export class UserDB {
  async findAllUsers(userId: string) {
    return await User.find({ _id: { $ne: userId } }).select("-password");
  }

  async findById(id: string) {
    return await User.findById(id).select("-password");
  }

  async findByEmail(email: string) {
    return await User.findOne({ email });
  }

  async findByUsername(username: string) {
    return await User.findOne({ username });
  }

  async createUser(data: {
    username: string;
    email: string;
    password: string;
  }) {
    const newUser = new User(data);
    return await newUser.save();
  }

  async updatePassword(email: string, hashedPassword: string) {
    const user = await User.findOne({ email });
    if (user) {
      user.password = hashedPassword;
      await user.save();
    }
  }
}
