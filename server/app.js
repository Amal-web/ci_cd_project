import express from "express";
import cors from "cors";
import databaseConnect from "./src/config/db.config.js";
import todoRoutes from './src/routes/todo.routes.js';

const app = express();

databaseConnect();

app.use(cors({
  origin: ['http://app.amal-dev.shop','http://35.174.136.183'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

app.use("/api/todos", todoRoutes);
// check test
app.get("/api/check", (req, res) => {
  res.send("ToDo API is running 🚀");
});

app.get("/test", (req, res) => {
  res.status(200).json({ success: true, msg: "test successful" });
});

export default app;
