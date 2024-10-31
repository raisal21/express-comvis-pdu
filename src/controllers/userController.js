import { UserModel } from "../models/user.model.js";
import { UserService } from "../services/user.services.js";

export const userController = {
  async getUsers(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;

      const result = await UserService.getAllUsers(limit, offset);
      res.json(result);
    } catch (error) {
      console.error("Error in getUsers:", error);
      res.status(500).json({
        message: "Error fetching users",
        error: error.message,
      });
    }
  },

  async getUserById(req, res) {
    try {
      const user = await UserModel.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error in getUserById:', error);
      res.status(500).json({ 
        message: 'Error fetching user', 
        error: error.message 
      });
    }
  },

  async softDeleteUser(req, res) {
    try {
      const result = await UserService.deleteUser(req.params.id, 'soft');
      if (!result) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User soft deleted successfully' });
    } catch (error) {
      console.error('Error in softDeleteUser:', error);
      res.status(500).json({ 
        message: 'Error soft deleting user', 
        error: error.message 
      });
    }
  },

  async hardDeleteUser(req, res) {
    try {
      const result = await UserService.deleteUser(req.params.id, 'hard');
      if (!result) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User hard deleted successfully' });
    } catch (error) {
      console.error('Error in hardDeleteUser:', error);
      res.status(500).json({ 
        message: 'Error deleting user', 
        error: error.message 
      });
    }
  },

  async restoreUser(req, res) {
    try {
      const result = await UserService.restoreUser(req.params.id);
      if (!result) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User restored successfully' });
    } catch (error) {
      console.error('Error in restoreUser:', error);
      res.status(500).json({ 
        message: 'Error restoring user', 
        error: error.message 
      });
    }
  }
};
