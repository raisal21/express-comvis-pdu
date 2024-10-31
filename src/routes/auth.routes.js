// src/routes/auth.routes.js
import passport from 'passport';
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const router = Router();

router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    // Add failure handling
    failureRedirect: "/login",
    failureMessage: true,
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
    failureMessage: true,
  }),
  AuthController.googleCallback
);

router.use(AuthController.handleAuthError);

export default router;