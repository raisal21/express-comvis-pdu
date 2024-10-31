// // src/routes/userRoutes.ts
import express from 'express';
// import { getUsers } from '../controllers/userController';
import db from '../db/databases.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/users', 
    authMiddleware.verifyToken,
    async(req, res) => {
    try {
      const users = await db.any('SELECT * FROM users WHERE deleted_at IS NULL');
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;
