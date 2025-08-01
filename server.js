// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import UserModel from "./models/Users.js";

import {
  generateToken,
  verifyGoogleToken,
  authenticateToken,
} from "./middleware/auth.js";

const app = express();

await mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "Oauth-app",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.post("/auth/google", async (req, res) => {
  try {
    const { token } = req.body;
    const user = await verifyGoogleToken(token);
    const jwtToken = generateToken(user);

    res.json({
      token: jwtToken,
      user,
    });
  } catch (error) {
    res.status(401).json({ error: "Authentication failed" });
  }
});

app.get("/auth/logout", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get JWT

  res.json({ message: "Logged out" });
});

app.get("/api/protected", authenticateToken, async (req, res) => {
  const user = await UserModel.findOne({ email: req.user.email });
  if (!user) res.status(403).json({ message: "user not found" });
  res.json({ message: "Protected data", user });
});

app.listen(3010, () => console.log("Server running on http://localhost:3010"));
