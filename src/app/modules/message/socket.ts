// socket.ts
import { Server } from 'socket.io';

const setupSocketIO = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('New client connected: ', socket.id);

    socket.on('disconnect', () => {
      console.log('Client disconnected: ', socket.id);
    });
  });

  return io;
};

export default setupSocketIO;
