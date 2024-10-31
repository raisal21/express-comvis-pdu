import { Router } from "express";
import healthRoutes from "./health.routes.js";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";

const router = Router();

router.use("/api",healthRoutes);
router.use("/api",userRoutes);
router.use("/api",authRoutes);


router.get("/", (req, res) => {
    res.send("Welcome to my API Bro");
});

export default router;