import { pool } from "../../db/PostgresDB";
import { IUserRepository } from "../../types/repository";

export class PostgresUserDB implements IUserRepository {
  async findAllUsers(userId: string) {
    const result = await pool.query(
      `SELECT id, username, profileImg
       FROM users
       WHERE id != $1`,
      [userId]
    );
    return result.rows;
  }

  async findById(id: string) {
    const result = await pool.query(
      `SELECT id, username, email, profileImg
       FROM users
       WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async findByEmail(email: string) {
    const result = await pool.query(
      `SELECT id, username, email, password, profileImg
       FROM users
       WHERE email = $1`,
      [email]
    );
    return result.rows[0] || null;
  }

  async findByUsername(username: string) {
    const result = await pool.query(
      `SELECT id, username, email, password, profileImg
       FROM users
       WHERE username = $1`,
      [username]
    );
    return result.rows[0] || null;
  }

  async createUser(data: {
    username: string;
    email: string;
    password: string;
  }) {
    const result = await pool.query(
      `INSERT INTO users (username, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, username, email, profileImg`,
      [data.username, data.email, data.password]
    );
    return result.rows[0];
  }

  async updatePassword(email: string, hashedPassword: string) {
    await pool.query(
      `UPDATE users
       SET password = $1
       WHERE email = $2`,
      [hashedPassword, email]
    );
  }
}
