import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import apiRoutes from "./routes/index";

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Health check route
app.get("/", (_req, res) => {
  res.json({ message: "ok" });
});

// Routes
app.use("/api/v1", apiRoutes);

export default app;
