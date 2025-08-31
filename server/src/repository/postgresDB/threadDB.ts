import { pool } from "../../db/PostgresDB";
import { IThreadRepository } from "../../types/repository";

export class PostgresThreadDB implements IThreadRepository {
  async createThread(data: {
    content: string;
    image?: string;
    author: string;
  }) {
    const result = await pool.query(
      `INSERT INTO threads (content, image, author_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [data.content, data.image || null, data.author]
    );
    return result.rows[0];
  }

  async getAllThreads() {
    const result = await pool.query(
      `
      SELECT t.id, t.content, t.image, t.created_at,
             u.id AS author_id, u.name, u.username, u.avatar,
             COUNT(DISTINCT l.user_id) AS likes,
             COUNT(DISTINCT c.id) AS comments,
             COUNT(DISTINCT s.id) AS shares
      FROM threads t
      JOIN users u ON u.id = t.author_id
      LEFT JOIN thread_likes l ON l.thread_id = t.id
      LEFT JOIN comments c ON c.thread_id = t.id
      LEFT JOIN shares s ON s.thread_id = t.id
      GROUP BY t.id, u.id
      ORDER BY t.created_at DESC
      `
    );
    return result.rows;
  }

  async updateThread(threadId: string, userId: string, content: string) {
    const result = await pool.query(
      `UPDATE threads
       SET content = $1, updated_at = NOW()
       WHERE id = $2 AND author_id = $3
       RETURNING *`,
      [content, threadId, userId]
    );
    return result.rows[0] || null;
  }

  async deleteThread(threadId: string, userId: string) {
    const result = await pool.query(
      `DELETE FROM threads
       WHERE id = $1 AND author_id = $2
       RETURNING *`,
      [threadId, userId]
    );
    return result.rows[0] || null;
  }

  async toggleLike(threadId: string, userId: string) {
    // Check if like already exists
    const check = await pool.query(
      `SELECT * FROM thread_likes WHERE thread_id = $1 AND user_id = $2`,
      [threadId, userId]
    );

    if (check.rows.length > 0) {
      // Unlike
      await pool.query(
        `DELETE FROM thread_likes WHERE thread_id = $1 AND user_id = $2`,
        [threadId, userId]
      );
    } else {
      // Like
      await pool.query(
        `INSERT INTO thread_likes (thread_id, user_id) VALUES ($1, $2)`,
        [threadId, userId]
      );
    }

    // Return updated thread
    const result = await pool.query(
      `
      SELECT t.id, t.content, t.image, t.created_at,
             u.id AS author_id, u.name, u.username, u.avatar,
             COUNT(DISTINCT l.user_id) AS likes
      FROM threads t
      JOIN users u ON u.id = t.author_id
      LEFT JOIN thread_likes l ON l.thread_id = t.id
      WHERE t.id = $1
      GROUP BY t.id, u.id
      `,
      [threadId]
    );

    return result.rows[0] || null;
  }
}
