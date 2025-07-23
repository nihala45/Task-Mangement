import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const mongodbUrl = process.env.MONGODB_URL;

export const connectDB = async () => {
  try {
    if (!mongodbUrl) {
      throw new Error("MongoDB URL is not defined in environment variables");
    }

    await mongoose.connect(mongodbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); 
  }
};
