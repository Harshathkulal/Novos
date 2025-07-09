import mongoose, { Document, Schema, Model, Types } from "mongoose";

// Interface describing a Conversation document
export interface IConversation extends Document {
  participants: Types.ObjectId[];
  messages: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema: Schema<IConversation> = new mongoose.Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Conversation: Model<IConversation> = mongoose.model<IConversation>(
  "Conversation",
  conversationSchema
);

export default Conversation;
