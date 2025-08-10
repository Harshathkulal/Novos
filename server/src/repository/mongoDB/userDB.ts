import User from "../../models/user-modal";

export class UserDB {
  async findAllUsers(userId: string) {
    const users = await User.find({ _id: { $ne: userId } }).select("-password");
    return users.map((user: any) => ({
      id: user._id.toString(),
      username: user.username,
      profileImg: user.profileImg,
    }));
  }

  async findById(id: string) {
    const user = await User.findById(id).select("-password");
    if (!user) return null;
    return {
      id: (user._id as string).toString(),
      username: user.username,
      email: user.email,
      profileImg: user.profileImg,
    };
  }

  async findByEmail(email: string) {
    const user = await User.findOne({ email }).select("+password");
    return user;
  }

  async findByUsername(username: string) {
    const user = await User.findOne({ username }).select("+password");
    return user;
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
