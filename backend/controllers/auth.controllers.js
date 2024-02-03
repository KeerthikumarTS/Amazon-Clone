import catchAsyncError from "../middlewares/catchAsyncError.js";
import {User} from '../models/user.model.js'
import { ErrorHandler } from "../utils/errorHandler.js";
import { sendToken } from "../utils/jwt.js";
import { sendEmail } from "../utils/sendmail.js";
import crypto from 'crypto'

export const registerUser = catchAsyncError(async(req,res,next) => {
    const {name, email, password, avatar} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar
    });

    sendToken(user, 201 ,res)
})

export const loginUser = catchAsyncError(async(req, res, next) => {
    const {email,password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler('Please enter email or password!', 401))
    }

    const user = await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorHandler('Invalid email or password!', 401))
    }
    if(!await user.isValidPassword(password)){
        return next(new ErrorHandler('Invalid email or password!', 401))
    }

    sendToken(user, 201 ,res)
})

export const logoutUser = catchAsyncError(async(req, res, next) => {
    await res.clearCookie('token');
    res.status(200).send({
        success: true,
        message:'logged out!'
    })
})

export const forgotPassword = catchAsyncError(async(req, res, next) => {
     
    const user = await User.findOne({email: req.body.email})

    if(!user){
        return next(new ErrorHandler("User not found with this email", 404))
    }

    const resetToken = user.getResetToken();
    await user.save({validateBeforeSave: false})

    const resetUrl = `${req.protocol}//${req.get('host')}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset url is as follows \n\n 
    ${resetUrl} \n\n If you have not requested this email, then ignore it.`;

    try{
        sendEmail({
            email: user.email,
            subject: "Indsol Password Recovery",
            message
        })

        res.status(200).send({
            success: true,
            message: `Email sent to ${user.email}`
        })

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({validateBeforeSave: false});
        return next(new ErrorHandler(error.message), 500)
    }
})

export const resetPassword = catchAsyncError( async (req, res, next) => {
    const resetPasswordToken =  crypto.createHash('sha256').update(req.params.token).digest('hex'); 
 
     const user = await User.findOne( {
         resetPasswordToken,
         resetPasswordTokenExpire: {
             $gt : Date.now()
         }
     } )
 
     if(!user) {
         return next(new ErrorHandler('Password reset token is invalid or expired', 401));
     }
 
     if( req.body.password !== req.body.confirmPassword) {
         return next(new ErrorHandler('Password does not match', 401));
     }
 
     user.password = req.body.password;
     user.resetPasswordToken = undefined;
     user.resetPasswordTokenExpire = undefined;
     await user.save({validateBeforeSave: false})
     sendToken(user, 201, res)
 
 })

export const getUserProfile = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id)

    res.status(200).send({
        success: true,
        user
    })

 })

export const changePassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id).select('+password');

    if(!await user.isValidPassword(req.body.currentPassword)){
        return next(new ErrorHandler('Current password is incorrect', 401))
    }

    user.password = req.body.password;
    await user.save();

    res.status(200).send({
        success: true
    })
 })

export const updateProfile = catchAsyncError(async(req, res, next) => {

    let newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new: true,
        runValidators:true
    })

    res.status(200).send({
        success: true,
        user
    })
 })    

 //Admin: Get All Users - /api/v1/admin/users
export const getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).send({
         success: true,
         users
    })
 })
 
//Admin: Get Specific User - api/v1/admin/user/:id
export const getUser = catchAsyncError(async (req, res, next) => {
     const user = await User.findById(req.params.id);
     if(!user) {
         return next(new ErrorHandler(`User not found with this id ${req.params.id}`))
     }
     res.status(200).send({
         success: true,
         user
    })
 });
 
//Admin: Update User - api/v1/admin/user/:id
export const updateUser = catchAsyncError(async (req, res, next) => {
     const newUserData = {
         name: req.body.name,
         email: req.body.email,
         role: req.body.role
     }
 
     const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
         new: true,
         runValidators: true,
     })
 
     res.status(200).send({
         success: true,
         user
     })
 })
 
//Admin: Delete User - api/v1/admin/user/:id
export const deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User not found with this id ${req.params.id}`));
    }

    res.status(200).send({
        success: true,
    });
});