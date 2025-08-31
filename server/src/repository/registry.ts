import dotenv from "dotenv";
dotenv.config();

const DB_TYPE = process.env.DB_TYPE;

// Interfaces
import {
  IUserRepository,
  IMessageRepository,
  IThreadRepository,
} from "../types/repository";

// Mongo DB
import { MongoUserDB } from "./mongoDB/userDB";
import { MongoMessageDB } from "./mongoDB/messageDB";
import { MongoThreadDB } from "./mongoDB/threadDB";

// Postgres DB
import { PostgresUserDB } from "./postgresDB/userDB";
import { PostgresMessageDB } from "./postgresDB/messageDB";
import { PostgresThreadDB } from "./postgresDB/threadDB";

// Factory function to load DB
export const RepositoryRepo = () => {
  let userRepo: IUserRepository;
  let messageRepo: IMessageRepository;
  let threadRepo: IThreadRepository;

  switch (DB_TYPE) {
    case "postgres":
      userRepo = new PostgresUserDB();
      messageRepo = new PostgresMessageDB();
      threadRepo = new PostgresThreadDB();
      break;

    case "mongo":
    default:
      userRepo = new MongoUserDB();
      messageRepo = new MongoMessageDB();
      threadRepo = new MongoThreadDB();
      break;
  }

  return { userRepo, messageRepo, threadRepo };
};
