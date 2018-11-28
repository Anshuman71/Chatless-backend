import express from 'express';
import http from 'http';
import Socket from 'socket.io';

const app = express();

let connections = [];
const server = http.createServer(app);

const io = Socket.listen(server);
// io.configure(function() {
//   io.set('transports', ['xhr-polling']);
//   io.set('polling duration', 10);
// });
app.get('/', (req, res) => {
  res.send('<h1>Started now</h1>');
});
server.listen('5000' || process.env.PORT, () => console.log('Running on 2017'));

io.sockets.on('connection', sock => {
  connections.push(sock);
  sock.on('disconnect', data => {
    connections.splice(connections.indexOf(sock), 1);
    console.log('disconnected ', { data });
  });

  sock.on('sendMessage', data => {
    const id = sock.id;
    console.log({ data }, 'New message');
    io.sockets.emit('newMessage', { message: { data, id } });
  });
  sock.on('isTyping', data => {
    console.log(data);
    io.sockets.emit('typing', { typing: data });
  });
});
