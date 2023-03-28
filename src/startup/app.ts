import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import configureInjector from './injector';
import configureRoutes from './routes'

dotenv.config();
const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Create dependency injection container
const injector = configureInjector();

// Apply dependencies to endpoints
configureRoutes(app, injector);

export default app;
