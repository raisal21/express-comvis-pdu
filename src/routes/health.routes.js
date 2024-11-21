import { Router } from "express";
import db from "../db/databases.js";
const router = Router();

router.get("/health", async (req, res) => {
  try {
    await db.one("SELECT current_timestamp");
    res.status(200).json({ status: "ok", message: "Server is healthy" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;