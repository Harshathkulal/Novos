export interface IUserRepository {
  findByEmail(email: string): Promise<any | null>;
  findByUsername(username: string): Promise<any | null>;
  createUser(data: { username: string; email: string; password: string }): Promise<any>;
  findById(id: string): Promise<any | null>;
  updatePassword(email: string, newPassword: string): Promise<void>;
}