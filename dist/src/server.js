'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var connections = [];
var server = _http2.default.createServer(app);

var io = _socket2.default.listen(server);

app.get('/', function (req, res) {
  res.send('<h1>Started now</h1>');
});
server.listen('2017' || process.env.PORT, function () {
  return console.log('Running on 2017');
});

io.sockets.on('connection', function (sock) {
  connections.push(sock);
  sock.on('disconnect', function (data) {
    connections.splice(connections.indexOf(sock), 1);
    console.log('disconnected ', { data: data });
  });

  sock.on('sendMessage', function (data) {
    var id = sock.id;
    console.log({ data: data }, 'New message');
    io.sockets.emit('newMessage', { message: { data: data, id: id } });
  });
  sock.on('isTyping', function (data) {
    console.log(data);
    io.sockets.emit('typing', { typing: data });
  });
});