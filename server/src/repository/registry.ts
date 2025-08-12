import dotenv from "dotenv";
dotenv.config();

const DB_TYPE = process.env.DB_TYPE;

// Declare interfaces
import { IUserRepository } from "../types/repository";
import { IMessageRepository } from "../types/repository";

// Mongo DB
import { MongoUserDB } from "./mongoDB/userDB";
import { MongoMessageDB } from "./mongoDB/messageDB";

// Postgres DB
import { PostgresUserDB } from "./postgresDB/userDB";
import { PostgresMessageDB } from "./postgresDB/messageDB";

// Factory function to load DB
export const RepositoryRepo = () => {
  let userRepo: IUserRepository;
  let messageRepo: IMessageRepository;

  if (DB_TYPE === "postgres") {
    userRepo = new PostgresUserDB();
    messageRepo = new PostgresMessageDB();
  } else {
    userRepo = new MongoUserDB();
    messageRepo = new MongoMessageDB();
  }

  return {
    userRepo,
    messageRepo,
  };
};
