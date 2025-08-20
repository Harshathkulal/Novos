import { pool } from "../../db/PostgresDB";
import { IMessageRepository } from "../../types/repository";

export class PostgresMessageDB implements IMessageRepository {
  async createMessage(data: {
    senderId: string;
    receiverId: string;
    message: string;
  }) {
    // 1. Find conversation between users (or create one)
    let conversation = await this.findConversationBetweenUsers(
      data.senderId,
      data.receiverId
    );

    if (!conversation) {
      conversation = await this.createConversation([
        data.senderId,
        data.receiverId,
      ]);
    }

    const result = await pool.query(
      `INSERT INTO messages (conversation_id, sender_id, receiver_id, message)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [conversation.id, data.senderId, data.receiverId, data.message]
    );

    return result.rows[0];
  }

  async findMessageById(id: string) {
    const result = await pool.query(`SELECT * FROM messages WHERE id = $1`, [
      id,
    ]);
    return result.rows[0] || null;
  }

  async findConversationBetweenUsers(user1: string, user2: string) {
    const result = await pool.query(
      `
    SELECT c.*
    FROM conversations c
    JOIN conversation_participants cp ON cp.conversation_id = c.id
    WHERE cp.user_id IN ($1, $2)
    GROUP BY c.id
    HAVING COUNT(DISTINCT cp.user_id) = 2
    `,
      [user1, user2]
    );

    return result.rows[0] || null;
  }

  async createConversation(participants: string[]) {
    const convoRes = await pool.query(
      `INSERT INTO conversations DEFAULT VALUES RETURNING *`
    );
    const convo = convoRes.rows[0];

    for (const userId of participants) {
      await pool.query(
        `INSERT INTO conversation_participants (conversation_id, user_id)
         VALUES ($1, $2)`,
        [convo.id, userId]
      );
    }

    return convo;
  }

  async addMessageToConversation() {
    // Not needed in relational schema — handled via `conversation_id` in `messages`
  }

  async getMessagesForConversation(user1: string, user2: string) {
    const conversation = await this.findConversationBetweenUsers(user1, user2);
    if (!conversation) return { messages: [] };

    const messagesRes = await pool.query(
      `SELECT id, message, sender_id, created_at
       FROM messages
       WHERE conversation_id = $1
       ORDER BY created_at ASC`,
      [conversation.id]
    );

    const messages = messagesRes.rows.map((msg: any) => ({
      id: msg.id.toString(),
      message: msg.message,
      senderId: { id: msg.sender_id.toString() },
      createdAt: msg.created_at,
    }));

    return { messages };
  }
}
