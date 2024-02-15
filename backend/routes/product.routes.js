import express from "express";
import { createReview, deleteProduct, deleteReview, getAdminProducts, getProducts, getReviews, getSingleProduct, newProduct, updateProduct } from "../controllers/product.controllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/authenticate.js";
const router = express.Router();
import multer from "multer";
import path from 'path'
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join( __dirname,'..' , 'uploads/product' ) )
    },
    filename: function(req, file, cb ) {
        cb(null, file.originalname)
    }
}) })


router.get('/products', getProducts)
router.get('/product/:id',  getSingleProduct)
router.post('/review', isAuthenticatedUser, createReview)

router.post('/admin/product/new',isAuthenticatedUser, authorizeRoles('admin'),upload.array('images'), newProduct)
router.get('/admin/products', isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts)
router.put('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin'), upload.array('images'), updateProduct)
router.delete('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)
router.get('/admin/reviews', isAuthenticatedUser, authorizeRoles('admin'), getReviews)
router.delete('/admin/review', isAuthenticatedUser, authorizeRoles('admin'), deleteReview)




export default router;