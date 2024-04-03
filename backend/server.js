import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import connect2mongo from "./db/connect2mongo.js";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

// app.get("/", (req, res) => {
//   //root route - http://localhost:5000/
//   res.send("Hello World");
// });

//middlewares
app.use(express.json());
app.use(cookieParser())

//routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users",userRoutes)

app.listen(PORT, () => {
  connect2mongo();
  console.log(`Server running on PORT ${PORT}`);
});
