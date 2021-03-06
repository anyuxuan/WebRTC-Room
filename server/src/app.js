import http from 'http';
import Koa from 'koa';
import koaBody from 'koa-body';
import koaLogger from 'koa-logger';
import { config } from './config';
// routes
import routers from './routes';
// middleWares
import cors from '@koa/cors';
import { success } from './middlewares/success';
import { fail } from './middlewares/fail';

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

app
  .use(cors())
  .use(success())
  .use(fail())
  .use(koaBody())
  .use(ignoreAssets(koaLogger()))
  .use(routers.routes());

const server = http.createServer(app.callback());

server.on('listening', () => {
  logger.info('App is listening on port: %d', config.PORT);
});

server.on('error', (err) => {
  logger.info(err);
});

server.listen(config.PORT);

socketStarter(server);
