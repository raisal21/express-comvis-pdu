import db from '../db/databases.js';

export const UserModel = {
    async findByEmail(email) {
      return db.oneOrNone('SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL', [email]);
    },
    
    async findById(id) {
      return db.oneOrNone('SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL', [id]);
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
          userData.role || 'member',
          userData.password,
          true,
          'none'
        ]
      );
    }
  };