import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use("/api/vi/posts", postRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));

export default app;