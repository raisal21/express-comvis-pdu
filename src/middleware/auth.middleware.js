// src/middleware/auth.middleware.js
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authMiddleware = {
  async verifyToken(req, res, next) {
    try {
      const token = req.cookies.get('accessToken', { signed: true });
      console.log("Signed Token:", token);

      if (!token) {
        return res.status(401).json({ 
          message: 'No token provided',
          details: {
            hasCookies: !!req.cookies,
            cookieKeys: Object.keys(req.cookies || {})
          }
        });
      }
      
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await UserModel.findById(decoded.id);
      
      if (!user || !user.is_active) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  },

  checkRole(roles) {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      next();
    };
  },

  checkUserManagementAccess(allowedRoles) {
    return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ 
          message: 'You do not have permission to access user management' 
        });
      }
      next();
    };
  },

  isSuperAdmin(req, res, next) {
    if (!req.user || req.user.role !== 'superadmin') {
      return res.status(403).json({ 
        message: 'Only superadmin can perform this action' 
      });
    }
    next();
  }
};