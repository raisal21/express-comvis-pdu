import { UserModel } from "../models/user.model.js";

export const UserService = {
  async getAllUsers(limit, offset) {
    const users = await UserModel.getAllUsers(limit, offset);
    const total = await UserModel.getTotalUsers();

    return {
      total,
      limit,
      offset,
      data: users,
    };
  },

  async deleteUser(userId, type = "soft") {
    if (type === "hard") {
      return await UserModel.hardDeleteUser(userId);
    }
    return await UserModel.softDeleteUser(userId);
  },

  async restoreUser(userId) {
    return await UserModel.restoreUser(userId);
  },
};
