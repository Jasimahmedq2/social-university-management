/* eslint-disable @typescript-eslint/no-unused-vars */
import express, {
  Application,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from 'express';
import cors from 'cors';
import { MainRouter } from './app/route';
import globalMiddleware from './app/middlewar/globalMIddlewar';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app: Application = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/src/uploads/', express.static('src/uploads'));
app.use(cookieParser());
// app.use(cookieParser());
const corsOptions = {
  origin: [
    'https://nextgen-social-media.netlify.app',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  credentials: true,
};


app.use(cors(corsOptions));
app.get('/', (req: Request, res: Response) => {
  res.json('db running perfectly');
});

app.use('/api/v1', MainRouter);
app.use(globalMiddleware);

// not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    statusCode: 404,
    message: 'Route Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'the route not exist',
      },
    ],
  });
});

export default app;
