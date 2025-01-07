import express from "express";
import { register, login } from "../controllers/user.js";

const router = express.Router();

router.route("/").post(register).post(login);
// router.route("/").post(login);

export default router;
