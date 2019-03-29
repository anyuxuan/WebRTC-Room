import koaRouter from 'koa-router';
import md5 from 'blueimp-md5';
import jwt from 'jsonwebtoken';
import { config } from '../config';

const router = koaRouter();

router.post('/create_token', async (ctx, next) => {
  try {
    const { userName, roomId, appId } = ctx.request.body;
    if (!userName) {
      ctx.response.fail(400, 'userName is required');
      return;
    }
    if (!roomId) {
      ctx.response.fail(400, 'roomId is required');
      return;
    }
    if (!appId) {
      ctx.response.fail(400, 'appId is required');
      return;
    }
    const payload = {
      ...ctx.request.body,
      type: 'WebRTC',
    };
    const jwtToken = jwt.sign(payload, config.PRIVATE_KEY);
    ctx.response.success({ token: jwtToken });
    await next();
  } catch (err) {
    await next(err);
  }
});

router.post('/create_app_id', async (ctx, next) => {
  try {
    const { projectName } = ctx.request.body;
    if (!projectName) {
      ctx.response.fail(400, 'projectName is required');
      return;
    }
    const appId = md5(projectName);
    ctx.response.success({ appId });
    await next();
  } catch (err) {
    await next(err);
  }
});

export default router;
