import products from '../data/products.js'
import Product from '../models/product.model.js'
import dotenv from "dotenv"
import path from 'path';
import { fileURLToPath } from 'url'; 
import { db } from '../config/db.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path:'backend/config/.env'})


const seedProducts = async () => {
    try{
        await db();
        await Product.deleteMany();
        console.log('Products deleted!');
        await Product.insertMany(products);
        console.log('Products added!');
    }
    catch(error){
        console.log('Error:', error)
    }
    process.exit();
}

seedProducts();