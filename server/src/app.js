import http from 'http';
import socketIO from 'socket.io';
import Koa from 'koa';
import koaBody from 'koa-body';
import logger from 'koa-logger';
import { config } from './config';
import authRouter from './routes/auth';

const app = new Koa();

function ignoreAssets(middleWare) {
  return async function(ctx, next) {
    if (/(\.js|\.css|\.ico)$/.test(ctx.path)) {
      await next();
    } else {
      await middleWare.call(this, ctx, next);
    }
  };
}

app.use(koaBody());

app.use(ignoreAssets(logger()));

app.use(authRouter.routes());

const server = http.createServer(app.callback());

const io = socketIO(server);

server.on('listening', () => {
  console.log('App is listening on port: %d', config.PORT);
});

server.on('error', (err) => {
  console.log(err);
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

server.listen(config.PORT);
