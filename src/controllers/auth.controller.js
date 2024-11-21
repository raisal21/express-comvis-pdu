// src/controllers/auth.controller.js
import { AuthService } from '../services/auth.service.js';
import { UserModel } from '../models/user.model.js';
import { ACCESS_TOKEN_MAX_AGE } from '../../libs/constants.js';

export const authController = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      } 

      const result = await AuthService.login(email, password);

      res.cookie('accessToken', result.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: ACCESS_TOKEN_MAX_AGE
      })

      res.json({
        message: 'Login successful',
        user: {
          id: result.user.id,
          email: result.user.email,
          full_name: result.user.full_name,
          role: result.user.role
        },
      });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },


  async register(req, res) {
    try {
      const { full_name, email, password, employee_number, category_id } = req.body;
      
      // Validate required fields
      if (!full_name || !email || !password || !employee_number || !category_id) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Check if user already exists
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      // Hash password
      const hashedPassword = await AuthService.hashPassword(password);

      // Create user
      const user = await UserModel.createUser({
        full_name,
        email,
        password: hashedPassword,
        employee_number,
        category_id
      });

      res.status(201).json({
        message: 'Registration successful',
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async googleCallback(req, res) {
    try {
      // If authentication failed, user will not be set
      if (!req.user) {
        const errorMessage = req.authInfo?.message || 'Authentication failed';
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=${encodeURIComponent(errorMessage)}`);
      }

      const { user, accessToken } = req.user;
      
      // Successful authentication
      res.redirect(`${process.env.FRONTEND_URL}/oauth-callback?token=${accessToken}}`);
    } catch (error) {
      res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
    }
  },

  async logout(req, res) {
    try {
      res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
      });
  
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ message: 'Logout failed' });
    }
  },

  handleAuthError(err, req, res, next) {
    res.status(401).json({
      error: 'Authentication failed',
      message: err.message
    });
  }
};