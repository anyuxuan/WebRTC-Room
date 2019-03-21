import http from 'http';
import Koa from 'koa';

const app = new Koa();

const port = 3000;

const server = http.createServer(app.callback());

server.listen(port);

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

server.on('listening', () => {
  console.log('App is listening on port: %d', port);
});
