const socketIO = require('socket.io');

const io = socketIO({
  serveClient: false
});

io.on('connection', (socket) => {
  socket.on('seek', (time) => {
    if (socket.rooms) {
      for (const room in socket.rooms) {
        io.to(room).emit('seek', time);
      }
    }
  });

  socket.on('join', (roomName) => {
    socket.join(roomName);
  });
});

module.exports = function SocketIOService(http) {
  io.attach(http, {
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
  });
};
