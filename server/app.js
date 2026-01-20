import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import checkRoute from "./routes/check.route.js";
import postRoute from "./routes/post.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Initialize Express app
const app = express();

dotenv.config();

const port = process.env.PORT || 8800;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    // origin: "https://darhub.vercel.app",
    credentials: true,
  }),
);

// Middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);
app.use("/api/check", checkRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to Darhub server");
  console.log("Home route accessed");
});

async function test() {
  await prisma.user.findMany();
  console.log("MongoDB connected ");
}

test();

app.listen(port, () => {
  console.log(`Darhub Server is running on port: ${port}`);
});
