// index.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define a route for the home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Define a connection event handler for Socket.IO
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle message events
  socket.on('message', (message) => {
    console.log('Received message:', message);
    io.emit('message', message); // Broadcast the message to all connected clients
  });

  // Handle disconnection event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
