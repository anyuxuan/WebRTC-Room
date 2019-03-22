import http from 'http';
import Koa from 'koa';
import socketIO from 'socket.io';
import { config } from './config';

const app = new Koa();

const server = http.createServer(app.callback());

const io = socketIO(server);

server.listen(config.PORT);

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('event', (data) => {
    console.log('event: ', data);
  });
  socket.on('disconnect', () => {
    console.log('disconnect');
  });
});

server.on('listening', () => {
  console.log('App is listening on port: %d', config.PORT);
});
