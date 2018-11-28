import express from 'express';
import http from 'http';
import Socket from 'socket.io';

const app = express();

let connections = [];
const server = http.createServer(app);

const io = Socket.listen(server);
app.get('/', (req, res) => {
  res.send('<h1>Started now</h1>');
});

server.listen(process.env.PORT || 5000, () => console.log('Running on 2017'));

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
