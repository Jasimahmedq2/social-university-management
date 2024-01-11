
const handleChatEvents = io => {
  io.on('connection', socket => {
    console.log('User connected');

    socket.on('chat message', msg => {
      console.log({msg})
      io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

export default handleChatEvents;
