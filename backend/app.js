import express from "express";
import productRoutes from './routes/product.routes.js'
import authRoutes from './routes/auth.routes.js'
import orderRoutes from './routes/order.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import path from 'path'
import { fileURLToPath } from 'url'; 
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({path:path.join(__dirname,'./config/.env')})

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname,'uploads') ) )

app.use('/api/v1',productRoutes)
app.use('/api/v1',authRoutes)
app.use('/api/v1', orderRoutes)
app.use('/api/v1', paymentRoutes)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

app.use(errorMiddleware);

export default app;