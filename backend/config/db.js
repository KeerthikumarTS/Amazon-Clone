import mongoose from "mongoose";

export const db = async () => {
        await mongoose.connect(process.env.MONGO_URI)
        .then((con)=>{
            console.log('MongoDB connection establised on the port:', con.connection.host);
        })
    }    

