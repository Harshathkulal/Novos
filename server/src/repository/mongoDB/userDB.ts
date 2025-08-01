import User from "../../models/user-modal";

export class UserDB {
  async findByEmail(email: string) {
    return await User.findOne({ email });
  }

  async findByUsername(username: string) {
    return await User.findOne({ username });
  }

  async findById(id: string) {
    return await User.findById(id).select("-password");
  }

  async createUser(data: { username: string; email: string; password: string }) {
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
