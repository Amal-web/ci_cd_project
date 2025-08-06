import express from "express";
import cors from "cors";
import databaseConnect from "./src/config/db.config.js";
import todoRoutes from './src/routes/todo.routes.js';

const app = express();

databaseConnect();

app.use(cors());

app.use(express.json());

app.use("/api/todos", todoRoutes);
// check
app.get("/api/check", (req, res) => {
  res.send("ToDo API is running 🚀");
});

app.get("/test", (req, res) => {
  res.status(200).json({ success: true, msg: "test successful" });
});

export default app;
