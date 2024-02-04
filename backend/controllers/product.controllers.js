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

export const createReview = catchAsyncError(async (req, res, next) =>{
    const  { productId, rating, comment } = req.body;

    const review = {
        user : req.user.id,
        rating,
        comment
    }

    const product = await Product.findById(productId);
   //finding user review exists
    const isReviewed = product.reviews.find(review => {
       return review.user.toString() == req.user.id.toString()
    })

    if(isReviewed){
        //updating the  review
        product.reviews.forEach(review => {
            if(review.user.toString() == req.user.id.toString()){
                review.comment = comment
                review.rating = rating
            }

        })

    }else{
        //creating the review
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    //find the average of the product reviews
    product.ratings = product.reviews.reduce((acc, review) => {
        return review.rating + acc;
    }, 0) / product.reviews.length;
    product.ratings = isNaN(product.ratings)?0:product.ratings;

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true
    })


})

export const getReview = catchAsyncError(async (req, res ,next) => {

    const product = await Product.findById(req.query.id);


    res.status(200).send({
        success: true,
        reviews: product.reviews
    })
})

export const deleteReview = catchAsyncError(async (req, res, next) =>{

    const product = await Product.findById(req.query.productId);
    
    //filtering the reviews which does match the deleting review id
    const reviews = product.reviews.filter(review => {
       return review._id.toString() !== req.query.id.toString()
    });
    //number of reviews 
    const numOfReviews = reviews.length;

    //finding the average with the filtered reviews
    let ratings = reviews.reduce((acc, review) => {
        return review.rating + acc;
    }, 0) / reviews.length;
    ratings = isNaN(ratings)?0:ratings;

    //save the product document
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        numOfReviews,
        ratings
    })
    res.status(200).json({
        success: true
    })


});
