import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/database.js";
import userRouter from "./routes/user.js";
import bodyParser from "body-parser";
import todoRouter from "./routes/todo.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.raw());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

// http://localhost:8000/api/v1/user/
// http://localhost:8000/api/v1/todo/

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is listening on, ${PORT}`);
  await connectDB();
  console.log("Database Connected");
});
