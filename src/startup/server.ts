import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import configureInjector from '../startup/injector';
import configureRoutes from '../startup/routes';
import { errorHandler } from '../middleware/errorHandler';


export default function createServer() {
  dotenv.config();
	const app: Express = express()

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const injector = configureInjector();
  configureRoutes(app, injector);
  app.use(errorHandler);
	return app
}
