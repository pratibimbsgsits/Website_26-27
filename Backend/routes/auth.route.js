import express from "express";
import { google, signOut } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/google',google);
router.get("/signout",signOut);

export default router;