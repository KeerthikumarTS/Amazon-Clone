import express from 'express'
import { changePassword, forgotPassword, getUserProfile, loginUser, logoutUser, registerUser, resetPassword, updateProfile } from '../controllers/auth.controllers.js';
import { isAuthenticatedUser } from '../middlewares/authenticate.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.post('/password/forgot', forgotPassword)
router.post('/password/reset/:token', resetPassword)
router.get('/myProfile', isAuthenticatedUser, getUserProfile)
router.put('/password/change', isAuthenticatedUser, changePassword)
router.put('/update', isAuthenticatedUser, updateProfile)

export default router;