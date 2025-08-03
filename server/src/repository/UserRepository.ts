export interface IUserRepository {
  findAllUsers(loggedInUserId: string): Promise<any[]>;
  findById(id: string): Promise<any | null>;
  findByEmail(email: string): Promise<any | null>;
  findByUsername(username: string): Promise<any | null>;
  createUser(data: {
    username: string;
    email: string;
    password: string;
  }): Promise<any>;
  updatePassword(email: string, newPassword: string): Promise<void>;
}
