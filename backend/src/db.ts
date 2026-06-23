import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in the .env file');
    }
    
    await mongoose.connect(uri);
    console.log('⚡ Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    console.warn('⚠️  Proceeding without database. Core engine features may be limited.');
  }
};
