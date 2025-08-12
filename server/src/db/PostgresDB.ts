import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});

export const connectPostgres = async () => {
  try {
    await pool.connect();
    console.log("PostgreSQL Connected!");
  } catch (error) {
    console.error("PostgreSQL Connection Error:", error);
    process.exit(1);
  }
};
