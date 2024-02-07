import express from 'express';
import { isAuthenticatedUser } from '../middlewares/authenticate.js';
import { processPayment, sendStripeApi } from '../controllers/payment.controllers.js';

const router = express.Router();

router.post('/payment/process', isAuthenticatedUser, processPayment);
router.get('/stripeapi', isAuthenticatedUser,sendStripeApi);

export default router;