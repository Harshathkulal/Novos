import express from "express";
import authRoute from "./routes/auth-route";

const app = express();

// Middleware
app.use(express.json());

// Health check route
app.get("/", (_req, res) => {
  res.json({ message: "Hello" });
});

// Routes
app.use("/api/auth", authRoute);

export default app;
