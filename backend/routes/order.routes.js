import express from 'express'
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/authenticate.js';
import { deleteOrder, getSingleOrder, myOrders, newOrder, totalOrders, updateOrder } from '../controllers/order.controllers.js';
const router = express.Router();

router.post('/order/new', isAuthenticatedUser, newOrder);
router.get('/order/:id', isAuthenticatedUser, getSingleOrder);
router.get('/myorders', isAuthenticatedUser, myOrders);

//Admin-routes:
router.get('/admin/orders', isAuthenticatedUser, authorizeRoles('admin'), totalOrders);
router.put('/admin/order/:id', isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
router.delete('/admin/order/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteOrder)

export default router;