import express from "express";
import productRoutes from './routes/product.routes.js'
import { errorMiddleware } from "./middlewares/error.js";
const app = express();

app.use(express.json())
app.use('/api/v1',productRoutes)

app.use(errorMiddleware);

export default app;