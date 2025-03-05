import mongoose from "mongoose";

import { MONGO_DB, NODE_ENV } from "../config/env.js";

if(! MONGO_DB){
    throw new Error ('please define mongo url environment variable in the .env.local')
}

const connectDB = async () => {
    try { await mongoose.connect(MONGO_DB)
        console.log(`connected to database in ${NODE_ENV} mode`)
        
    } catch (error) {
        console.error('error connecting to database', error)
    }
}

export default connectDB