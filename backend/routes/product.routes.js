import express from "express";
import { createReview, deleteProduct, getProducts, getSingleProduct, newProduct, updateProduct } from "../controllers/product.controllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/authenticate.js";
const router = express.Router();

router.get('/products', getProducts)
router.get('/product/:id',  getSingleProduct)
router.post('/review', isAuthenticatedUser, createReview)

router.post('/products/new',isAuthenticatedUser, authorizeRoles('admin'), newProduct)
router.put('/product/:id', isAuthenticatedUser, updateProduct)
router.delete('/product/:id', isAuthenticatedUser, deleteProduct)



export default router;