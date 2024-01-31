import express from "express";
import { deleteProduct, getProducts, getSingleProduct, newProduct, updateProduct } from "../controllers/product.controllers.js";

const router = express.Router();

router.get('/products', getProducts)
router.get('/product/:id', getSingleProduct)
router.post('/products/new', newProduct)
router.put('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)


export default router;