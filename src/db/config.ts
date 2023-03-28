import mongoose, { Connection } from 'mongoose';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();

export const connectDb = async (): Promise<{ connection: Connection, server: MongoMemoryServer }> => {
  // In memory mongo database for testing
  const server = await MongoMemoryServer.create();
  const uri = server.getUri();
  try {
    const { connection } = await mongoose.connect(uri);
    console.log(`Connected to MongoDB database: ${connection.host}`);
  
    return { connection, server };
  } catch (e) {
    console.log('Connection to database failed', e.message);
    process.exit(1);
  }
};

export const closeDb = async (connection: Connection, server: MongoMemoryServer): Promise<void> => {
    connection && await connection.dropDatabase();
    connection && await connection.close();
    server && await server.stop();
}

export const clearDb = async (connect: Connection): Promise<void> => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}