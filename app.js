import express from "express";
import dotenv from "dotenv"
import connectDB from "./db/database.js";
import userRouter from "./routes/user.js"


const app = express();
dotenv.config();

connectDB();

app.use("/api/vi/user", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is listening on, ${PORT}`);
})

