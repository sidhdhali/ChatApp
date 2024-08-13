import express from "express";
import { login, logout, signUp } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);

router.post("/signup", signUp);

router.post("/logout", logout);

export default router;