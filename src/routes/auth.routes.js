// src/routes/auth.routes.js
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const router = Router();

router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);

export default router;