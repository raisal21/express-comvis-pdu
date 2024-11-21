import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { userController } from '../controllers/userController.js';

const router = Router();
// Define roles that can access user management
const ADMIN_ROLES = ['superadmin', 'admin'];

router.get('/users',
  authMiddleware.verifyToken,
  authMiddleware.isSuperAdmin,
  userController.getUsers
);

router.get('/users/:id',

  authMiddleware.checkUserManagementAccess(ADMIN_ROLES),
  userController.getUserById
);

router.delete('/users/:id/soft',
  authMiddleware.checkUserManagementAccess(ADMIN_ROLES),
  userController.softDeleteUser
);

router.delete('/users/:id',
  authMiddleware.isSuperAdmin,
  userController.hardDeleteUser
);

router.patch('/users/:id/restore',
  authMiddleware.verifyToken,
  authMiddleware.checkUserManagementAccess(ADMIN_ROLES),
  userController.restoreUser
);

export default router;
