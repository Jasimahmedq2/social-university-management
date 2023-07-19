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
import http from 'http';
import socketio from 'socket.io';
import { Message } from './app/modules/message/message.model';

const app: Application = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cookieParser());
const corsOptions = {
  origin: [
    'https://book-catalog-frontend.netlify.app',
    'http://localhost:3000',
  ],
  credentials: true,
};

// socket io

io.on('connection', socket => {
  console.log('New client connected:', socket.id);

  socket.on('joinRoom', (roomId: any) => {
    socket.join(roomId);
  });

  socket.on('sendMessage', async (message: { roomId: any }) => {
    const newMessage = new Message(message);
    await newMessage.save();
    io.to(message.roomId).emit('message', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

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
  next();
});

export default app;
