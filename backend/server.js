import app from "./app.js"
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'; 
import { db } from "./config/db.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path:path.join(__dirname,'./config/.env')})

db();

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV

const server = app.listen(PORT,() => {
    console.log(`Server is running on port: ${PORT} in ${NODE_ENV}`);
})

process.on('unhandledRejection',(err) => {
    console.log(`Error:${err.message}`);
    console.log('Shutting down the server due to unhandled rejection error');
    server.close(() => {
        process.exit(1)
    })
})

process.on('uncaughtException',(err) => {
    console.log(`Error:${err.message}`);
    console.log('Shutting down the server due to uncaught exception error');
    server.close(() => {
        process.exit(1)
    })
})


