import express from "express";
import authRoute from "./routes/auth-route";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user-route";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
);

// Health check route
app.get("/", (_req, res) => {
  res.json({ message: "Hello" });
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api", userRoutes);

export default app;
