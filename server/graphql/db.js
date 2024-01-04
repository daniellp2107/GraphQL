import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect('mongodb+srv://Dan0207:admin@cluster0.u7lbfjt.mongodb.net/ApprendeV2');
        console.log(`Mongodb conneted ${conn.connection.name}`)    
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
    
}