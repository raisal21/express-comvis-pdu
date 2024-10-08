// src/routes/userRoutes.ts
import express from 'express';
import { getUsers } from '../controllers/userController';

const router = express.Router();

router.get('/api/users', getUsers); // Endpoint untuk mengambil data user

export default router;
