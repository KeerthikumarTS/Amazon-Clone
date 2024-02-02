import Product from '../models/product.model.js'
import { ErrorHandler } from '../utils/errorHandler.js'
import catchAsyncError from '../middlewares/catchAsyncError.js'
import { APIFeatures } from '../utils/apiFeatures.js'

export const getProducts = catchAsyncError(async (req,res) => {
    const resPerPage = 2;
    const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    const products = await apiFeatures.query;
    res.status(200).send({
        message : 'Products fetched successfully',
        count:products.length,
        products })
});

export const newProduct = catchAsyncError(async (req, res, next) => {

    req.body.user = req.user.id;
    const newProduct = await Product.create(req.body)
    res.status(201).send({
        message:'Product created successfully', 
        product : newProduct})
});

export const getSingleProduct = catchAsyncError(async (req,res,next) => {
    const product = await Product.findById(req.params.id)
    
    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }
    res.status(201).send({
        message: 'Product found',
        product
    })
});

export const updateProduct = catchAsyncError(async (req,res,next) => {
    let product = await Product.findById(req.params.id)
    
    if(!product){
       return res.status(404).send({
            message:'Product not found'
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true
    })
    res.status(200).send({
        message:'Product Updated Successfully',
        product
    })
});

export const deleteProduct = catchAsyncError(async (req,res,next) => {
    const product = await Product.findById(req.params.id)
    
    if(!product){
       return res.status(404).send({
            message:'Product not found'
        })
    }

    await product.deleteOne();

    res.status(200).send({
        message:'Product deleted successfully'
    })
});