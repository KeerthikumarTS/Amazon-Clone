import express from "express";
import { createReview, deleteProduct, deleteReview, getProducts, getReview, getSingleProduct, newProduct, updateProduct } from "../controllers/product.controllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/authenticate.js";
const router = express.Router();

router.get('/products', getProducts)
router.get('/product/:id',  getSingleProduct)
router.post('/review', isAuthenticatedUser, createReview)

router.post('/products/new',isAuthenticatedUser, authorizeRoles('admin'), newProduct)
router.put('/product/:id', isAuthenticatedUser, updateProduct)
router.delete('/product/:id', isAuthenticatedUser, deleteProduct)
router.get('/admin/reviews', isAuthenticatedUser, authorizeRoles('admin'), getReview)
router.delete('/admin/review', isAuthenticatedUser, authorizeRoles('admin'), deleteReview)


export default router;