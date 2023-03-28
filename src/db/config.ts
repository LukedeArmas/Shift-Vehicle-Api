import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';


let mongod;
dotenv.config();

export const connectDb = async (): Promise<void> => {
  // In memory mongo database for testing
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  try {
    const connection = await mongoose.connect(uri);
    console.log(`Connected to MongoDB database: ${connection.connection.host}`);
  } catch (e) {
    console.log('Connection to database failed', e.message);
    process.exit(1);
  }
};

export const closeDb = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    mongod && await mongod.stop();
}

export const clearDb = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}