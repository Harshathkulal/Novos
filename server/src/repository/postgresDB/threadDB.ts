import { pool } from "../../db/PostgresDB";
import { IThreadRepository } from "../../types/repository";

export class PostgresThreadDB implements IThreadRepository {
  /** Create a new thread */
  async createThread(data: {
    content: string;
    image?: string;
    author: string;
  }) {
    const result = await pool.query(
      `
      INSERT INTO threads (content, image, author_id, created_at, updated_at)
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING id, content, image, created_at, updated_at, author_id
      `,
      [data.content, data.image || null, data.author]
    );
    return result.rows[0];
  }

  /** Get all threads (feed) */
  async getAllThreads(requestingUserId?: string) {
    const result = await pool.query(
      `
      SELECT t.id, t.content, t.image, t.created_at, t.updated_at,
             u.id AS author_id, u.fullname, u.username, u.profileimg,
             COUNT(DISTINCT l.user_id) AS likes,
             COUNT(DISTINCT c.id) AS comments,
             COUNT(DISTINCT s.id) AS shares,
             CASE 
               WHEN $1 IS NOT NULL 
               THEN BOOL_OR(l.user_id = $1) 
               ELSE false 
             END AS is_liked
      FROM threads t
      JOIN users u ON u.id = t.author_id
      LEFT JOIN thread_likes l ON l.thread_id = t.id
      LEFT JOIN comments c ON c.thread_id = t.id
      LEFT JOIN shares s ON s.thread_id = t.id
      GROUP BY t.id, u.id
      ORDER BY t.created_at DESC
      `,
      [requestingUserId || null]
    );
    return result.rows;
  }

  /** Update a thread */
  async updateThread(threadId: string, userId: string, content: string) {
    const result = await pool.query(
      `
      UPDATE threads
      SET content = $1, updated_at = NOW()
      WHERE id = $2 AND author_id = $3
      RETURNING id, content, image, created_at, updated_at, author_id
      `,
      [content, threadId, userId]
    );
    return result.rows[0] || null;
  }

  /** Delete a thread */
  async deleteThread(threadId: string, userId: string) {
    const result = await pool.query(
      `
      DELETE FROM threads
      WHERE id = $1 AND author_id = $2
      RETURNING id
      `,
      [threadId, userId]
    );
    return result.rows[0] || null;
  }

  /** Like / Unlike a thread (atomic, race-safe) */
  async toggleLike(threadId: string, userId: string) {
    // Atomic insert-or-delete in one query
    await pool.query(
      `
      INSERT INTO thread_likes (thread_id, user_id)
      VALUES ($1, $2)
      ON CONFLICT (thread_id, user_id)
      DO DELETE
      `,
      [threadId, userId]
    );

    // Return updated thread with counts + isLiked
    const result = await pool.query(
      `
      SELECT t.id, t.content, t.image, t.created_at, t.updated_at,
             u.id AS author_id, u.fullname, u.username, u.profileimg,
             COUNT(DISTINCT l.user_id) AS likes,
             COUNT(DISTINCT c.id) AS comments,
             COUNT(DISTINCT s.id) AS shares,
             BOOL_OR(l.user_id = $2) AS is_liked
      FROM threads t
      JOIN users u ON u.id = t.author_id
      LEFT JOIN thread_likes l ON l.thread_id = t.id
      LEFT JOIN comments c ON c.thread_id = t.id
      LEFT JOIN shares s ON s.thread_id = t.id
      WHERE t.id = $1
      GROUP BY t.id, u.id
      `,
      [threadId, userId]
    );

    return result.rows[0] || null;
  }
}
