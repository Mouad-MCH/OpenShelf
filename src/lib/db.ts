import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const dbConnect = async () => {
    if(!MONGODB_URI) {
        throw new Error('Please define the MONGODB_URI environment variable')
    }

    await mongoose.connect(MONGODB_URI);
    return mongoose;
}

export default dbConnect;