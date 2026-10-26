import mongoose from 'mongoose';
import config from './env.js';

let isConnected = false;

export const connectDB = async () => {
  if (!config.mongoUri) {
    console.log('ℹ️  MONGODB_URI not provided. Server running in High-Fidelity Demonstration / In-Memory Mode.');
    return false;
  }

  try {
    const conn = await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected successfully to host: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error('⚠️  MongoDB connection failed:', error.message);
    console.log('ℹ️  Falling back to in-memory demonstration store for uninterrupted service.');
    return false;
  }
};

export const disconnectDB = async () => {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
    console.log('MongoDB disconnected.');
  }
};

export const getDBStatus = () => ({
  isConnected,
  mode: isConnected ? 'mongodb' : 'demo-memory',
});

export default { connectDB, disconnectDB, getDBStatus };
