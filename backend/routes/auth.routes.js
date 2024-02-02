import express from 'express'
import { forgotPassword, loginUser, logoutUser, registerUser } from '../controllers/auth.controllers.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.post('/password/forgot', forgotPassword)

export default router;