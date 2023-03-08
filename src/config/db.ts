import mongoose from 'mongoose';

export const connectDB = async () => {
    const uri = process.env.MONGO_URI || '';
    try {
        const conn = await mongoose.connect(uri);
        console.log(`Mongo db connected: ${conn.connection.host}`)
    } catch (error) {
        console.error('Mongo db connection failed');
        process.exit(1);
    }
}