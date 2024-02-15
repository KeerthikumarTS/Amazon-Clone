import express from 'express'
import multer from 'multer';
import path from 'path'
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({storage: multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, path.join( __dirname,'..' , 'uploads/user' ) )
  },
  filename: function(req, file, cb ) {
      cb(null, file.originalname)
  }
}) })


import {
  changePassword,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getUser,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateProfile,
  updateUser,
} from "../controllers/auth.controllers.js";
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/authenticate.js';
const router = express.Router();

router.post('/register', upload.single('avatar'), registerUser);
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.post('/password/forgot', forgotPassword)
router.post('/password/reset/:token', resetPassword)
router.get('/myprofile', isAuthenticatedUser, getUserProfile)
router.put('/password/change', isAuthenticatedUser, changePassword)
router.put('/update', isAuthenticatedUser,upload.single('avatar'), updateProfile)

//Admin Routes
router.get('/admin/users', isAuthenticatedUser,authorizeRoles('admin'), getAllUsers)
router.get('/admin/user/:id', isAuthenticatedUser,authorizeRoles('admin'), getUser)
router.put('/admin/user/:id', isAuthenticatedUser,authorizeRoles('admin'), updateUser)
router.delete('/admin/user/:id', isAuthenticatedUser,authorizeRoles('admin'), deleteUser)

export default router;