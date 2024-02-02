import express from "express";
import { deleteProduct, getProducts, getSingleProduct, newProduct, updateProduct } from "../controllers/product.controllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/authenticate.js";
const router = express.Router();

router.get('/products', isAuthenticatedUser, getProducts)
router.get('/product/:id',  getSingleProduct)
router.post('/products/new',isAuthenticatedUser, authorizeRoles('admin'), newProduct)
router.put('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)


export default router;