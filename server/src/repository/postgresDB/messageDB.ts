import { pool } from "../../db/PostgresDB";
import { IMessageRepository } from "../../types/repository";

export class PostgresMessageDB implements IMessageRepository {
  async createMessage(data: {
    senderId: string;
    receiverId: string;
    message: string;
  }) {
    const result = await pool.query(
      `INSERT INTO messages (sender_id, receiver_id, message)
       VALUES ($1, $2, $3)
       RETURNING id, sender_id, receiver_id, message, created_at`,
      [data.senderId, data.receiverId, data.message]
    );
    return result.rows[0];
  }

  async findMessageById(id: string) {
    const result = await pool.query(
      `SELECT id, sender_id, receiver_id, message, created_at
       FROM messages
       WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async findConversationBetweenUsers(user1: string, user2: string) {
    const result = await pool.query(
      `SELECT *
       FROM conversations
       WHERE participants @> ARRAY[$1, $2]::uuid[] 
         AND participants <@ ARRAY[$1, $2]::uuid[]`,
      [user1, user2]
    );
    return result.rows[0] || null;
  }

  async createConversation(participants: string[]) {
    const result = await pool.query(
      `INSERT INTO conversations (participants)
       VALUES ($1)
       RETURNING *`,
      [participants]
    );
    return result.rows[0];
  }

  async addMessageToConversation(conversationId: string, messageId: string) {
    const result = await pool.query(
      `UPDATE conversations
       SET messages = array_append(messages, $2)
       WHERE id = $1
       RETURNING *`,
      [conversationId, messageId]
    );
    return result.rows[0];
  }

  async getMessagesForConversation(user1: string, user2: string) {
    // Get conversation
    const convoResult = await pool.query(
      `SELECT messages
       FROM conversations
       WHERE participants @> ARRAY[$1, $2]::uuid[] 
         AND participants <@ ARRAY[$1, $2]::uuid[]`,
      [user1, user2]
    );

    const convo = convoResult.rows[0];
    if (!convo || !convo.messages || convo.messages.length === 0) {
      return { messages: [] };
    }

    // Get message details
    const msgResult = await pool.query(
      `SELECT id, message, sender_id, created_at
       FROM messages
       WHERE id = ANY($1::int[])
       ORDER BY created_at ASC`,
      [convo.messages]
    );

    const messages = msgResult.rows.map((msg: any) => ({
      id: msg.id.toString(),
      message: msg.message,
      senderId: { id: msg.sender_id.toString() },
      createdAt: msg.created_at,
    }));

    return { messages };
  }
}
