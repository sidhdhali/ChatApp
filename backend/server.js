import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connection from "./db/connect.js";

const app = express();
const PORT = process.env.port || 5000;

dotenv.config();

app.use(express.json()); // to parse the incoming req with JSON payloads (frpm req.body)
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () =>
{
  connection();
  console.log(`server is running on ${PORT}`)
});