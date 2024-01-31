import Product from '../models/product.model.js'
import { ErrorHandler } from '../utils/errorHandler.js'
import catchAsyncError from '../middlewares/catchAsyncError.js'

export const getProducts = async (req,res) => {
    const products = await Product.find()
    res.status(200).send({
        message : 'Products fetched successfully',
        count:products.length,
        products })
}

export const newProduct = catchAsyncError(async (req, res, next) => {
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

export const updateProduct = async (req,res,next) => {
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
}

export const deleteProduct = async (req,res,next) => {
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
}