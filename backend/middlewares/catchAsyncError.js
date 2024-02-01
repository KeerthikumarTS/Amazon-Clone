// const catchAsyncError = func =>{
//     return(req,res,next) => {
//         func(req,res,next).catch(next)
//     }
// } another way of writing handling -- code by Procademy

const catchAsyncError = func => (req,res,next) =>{
    Promise.resolve(func(req, res, next)).catch(next)
}
    


export default catchAsyncError;