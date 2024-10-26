import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm'; 
import { errors } from 'celebrate'
import uploadConfig from '@config/upload';
import { pagination } from 'typeorm-pagination'
const app = express();

app.use(cors());
app.use(express.json());

app.use(pagination)

app.use(routes);

app.use('/files', express.static(uploadConfig.directory))

app.use(errors());
// Middleware de tratamento de erros
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.error(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
);

app.listen(3333, () => console.log('Server is running'));
