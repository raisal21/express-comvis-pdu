import db from "../db/databases.js";

export const UserModel = {
  async getAllUsers(limit, offset) {
    return db.manyOrNone(
      `
      SELECT 
        u.full_name, 
        u.email, 
        u.employee_number,
        c.name as company_name,
        u.role,
        CASE 
          WHEN u.deleted_at IS NULL THEN 'active'
          ELSE 'inactive'
        END as status
      FROM users u
      LEFT JOIN categories c ON u.category_id = c.id
      WHERE u.deleted_at IS NULL
      ORDER BY u.created_at DESC
      LIMIT $1 OFFSET $2
    `,
      [limit, offset]
    );
  },

  async getTotalUsers() {
    const result = await db.one(`
      SELECT COUNT(*) as total
      FROM users
      WHERE deleted_at IS NULL
    `);
    return parseInt(result.total);
  },

  async getUserById(userId) {
    return db.oneOrNone(
      `
      SELECT 
        u.full_name, 
        u.email, 
        u.employee_number,
        c.name as company_name,
        u.role,
        CASE 
          WHEN u.deleted_at IS NULL THEN 'active'
          ELSE 'inactive'
        END as status
      FROM users u
      LEFT JOIN categories c ON u.category_id = c.id
      WHERE u.id = $1
    `,
      [userId]
    );
  },

  async softDeleteUser(userId) {
    return db.oneOrNone(
      `
      UPDATE users 
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE id = $1 AND deleted_at IS NULL
      RETURNING id
    `,
      [userId]
    );
  },

  async restoreUser(userId) {
    return db.oneOrNone(
      `
      UPDATE users 
      SET deleted_at = NULL
      WHERE id = $1
      RETURNING id
    `,
      [userId]
    );
  },

  async hardDeleteUser(userId) {
    return db.oneOrNone(
      `
      DELETE FROM users 
      WHERE id = $1
      RETURNING id
    `,
      [userId]
    );
  },

  async findByEmail(email) {
    return db.oneOrNone(
      "SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL",
      [email]
    );
  },

  async findById(id) {
    return db.oneOrNone(
      "SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL",
      [id]
    );
  },

  async createUser(userData) {
    return db.one(
      `INSERT INTO users (
          full_name, email, employee_number, category_id, 
          role, password, is_active, oauth_provider
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
        RETURNING *`,
      [
        userData.full_name,
        userData.email,
        userData.employee_number,
        userData.category_id,
        userData.role || "member",
        userData.password,
        true,
        "none",
      ]
    );
  },

  async updateOrLoginGoogleUser(profile) {
    return db.tx(async (t) => {
      // Check if user exists by email
      const user = await t.oneOrNone(
        "SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL",
        [profile.email]
      );

      if (!user) {
        // If email doesn't exist in database, reject login
        throw new Error("Email not registered in system");
      }

      // If user exists but doesn't have Google OAuth info, update it
      if (!user.oauth_id || user.oauth_provider === "none") {
        return t.one(
          `UPDATE users 
             SET oauth_provider = 'google', 
                 oauth_id = $1,
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $2 
             RETURNING *`,
          [profile.id, user.id]
        );
      }

      // If user exists and has OAuth info, verify it matches
      if (user.oauth_id !== profile.id) {
        throw new Error("Google account mismatch");
      }

      return user;
    });
  },
};
