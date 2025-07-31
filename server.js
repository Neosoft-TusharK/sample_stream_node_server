const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const socketHandler = require('./sockets/socketHandler');
require('dotenv').config();

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

// Authenticate using just user id (demo purpose)
io.use((socket, next) => {
  const userId = socket.handshake.query.userId;
  if (!userId) return next(new Error('User Id required'));
  socket.userId = userId;
  next();
});

// Handle socket connection
io.on('connection', (socket) => socketHandler(socket, io));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
