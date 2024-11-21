// src/routes/auth.routes.js
import passport from 'passport';
import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';


const router = Router();

router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    failureRedirect: "/login",
    failureMessage: true,
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/",
    failureMessage: true,
  }),
  authController.googleCallback
);
router.post("/auth/logout", authController.logout);
router.get('/auth/verify', authMiddleware.verifyToken, (req, res) => {
  res.json({
    message: 'Token is valid',
    user: req.user,
  });
});

router.use(authController.handleAuthError);

export default router;