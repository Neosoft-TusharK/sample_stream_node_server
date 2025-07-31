const socketHandler = (socket, io) => {
  const userId = socket.handshake.query.userId || 'guest_' + Date.now();
  socket.userId = userId;
  console.log('New connection: ' + socket.id);
  console.log('Total connections:', io.engine.clientsCount);
  console.log(`✅ User connected: ${userId}`);

  socket.on('sendMessage', ({ message }) => {
    const payload = {
      userId: socket.userId,
      message,
      timestamp: Date.now(),
    };

    console.log(`📤 ${socket.userId}: ${message}`);
    io.emit('receiveMessage', payload); // group broadcast
  });

  socket.on('disconnect', () => {
    console.log(`❌ ${userId} disconnected`);
      console.log('Remaining connections:', io.engine.clientsCount);
  });
};

module.exports = socketHandler;
