import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import connect2mongo from "./db/connect2mongo.js";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

// app.get("/", (req, res) => {
//   //root route - http://localhost:5000/
//   res.send("Hello World");
// });

//middlewares
app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connect2mongo();
  console.log(`Server running on PORT ${PORT}`);
});