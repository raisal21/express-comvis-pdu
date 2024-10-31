// src/services/auth.service.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const SALT_ROUNDS = 10;

export const AuthService = {
  async validatePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
    console.log(validatePassword(plainPassword, hashedPassword));
  },

  async hashPassword(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
    console.log('Hashed password', hashedPassword);
  },

  generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
  },

  async login(email, password) {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.is_active) {
      throw new Error('Account is inactive');
    }
    const isValid = await this.validatePassword(password, user.password);
    if (!isValid) {
      throw new Error('Invalid password');
    }
    const token = this.generateToken(user);
    return { user, token };
  }
};
