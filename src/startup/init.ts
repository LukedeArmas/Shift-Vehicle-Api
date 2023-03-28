import app from './app';
import { Express } from 'express';
import { connectDb } from '../db/config';
// would normally go in an environment variable
const PORT = 8080;


export default async function init(): Promise<Express> {
  await connectDb();

  console.log(`Starting Express server on port ${PORT}...`);

  app.listen(PORT, () => {
    console.log(`Express server started on port ${PORT}`);
  });
  return app;
}

// init();