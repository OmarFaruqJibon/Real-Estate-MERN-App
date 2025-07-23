import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Route imports
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import checkRoute from "./routes/check.route.js";
import postRoute from "./routes/post.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

// Initialize Express app
const app = express();

// Load environment variables from .env
dotenv.config();

// Use environment port or default to 8800
const port = process.env.PORT || 8800;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);
app.use("/api/check", checkRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to real estate server");
  console.log("Home route accessed");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
