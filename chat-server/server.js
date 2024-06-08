import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config(); //נותנת הגדרות ומפעילה את האפשרות לעבוד עם משתני סביבה

const PORT = process.env.PORT || 5000;

app.use(express.json()); // והגדרת סוג המידע המועבר (מידלוור) מתודות ביניים מתווכות
app.use(cookieParser());

app.use("/api/auth", authRoutes); //מידלוור שמקבל את הרוט
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// מפעילה את השרת
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
