import http from 'http';
import Koa from 'koa';
import koaBody from 'koa-body';
import koaLogger from 'koa-logger';
import { config } from './config';
// routes
import authRouter from './routes/auth';
// middleWares
import { success } from './middlewares/success';

// utils
import { logger } from './utils/logger';
// socket
import { socketStarter } from './socket';

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

app.use(success());

app.use(koaBody());

app.use(ignoreAssets(koaLogger()));

app.use(authRouter.routes());

const server = http.createServer(app.callback());

server.on('listening', () => {
  logger.info('App is listening on port: %d', config.PORT);
});

server.on('error', (err) => {
  logger.info(err);
});

server.listen(config.PORT);

socketStarter(server);
