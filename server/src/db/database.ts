import { connectMongoDB } from "./mongoDB";
import { connectPostgres } from "./PostgresDB";

const connectDB = async () => {
  const DB_TYPE = process.env.DB_TYPE || "mongo";

  if (DB_TYPE === "mongo" || DB_TYPE === "both") {
    await connectMongoDB();
  }

  if (DB_TYPE === "postgres" || DB_TYPE === "both") {
    await connectPostgres();
  }
};

export default connectDB;
