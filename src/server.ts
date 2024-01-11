import mongoose from 'mongoose';
import config from './config';
import app from './app';
import http from 'http';
import { Server } from 'socket.io';
import handleChatEvents from './app/socket/handleSocketEvent';
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      'https://nextgen-social-media.netlify.app',
      'http://localhost:3000',
      'http://localhost:3001',
    ],
    credentials: true,
  },
});

const port = config.port || 5000;
const socketPort = 3001;

const connectDB = async () => {
  try {
    await mongoose.connect(config.db_connect as string);
    console.log('yee, db connected');
    app.listen(port, () => {
      console.log('servicer is running:', port);
    });
    io.listen(socketPort);
  } catch (error) {
    console.log(error);
  }
};


handleChatEvents(io);

connectDB();
