import koaRouter from 'koa-router';
import md5 from 'blueimp-md5';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { generateId } from '../utils';

const router = koaRouter();

router.post('/create_token', async (ctx, next) => {
  try {
    const errorFields = [];
    Object.entries(ctx.request.body).forEach(([key, value]) => {
      if (!value) {
        errorFields.push(key);
      }
    });
    if (errorFields.length) {
      ctx.response.fail(400, `\'${errorFields.join('、')}\' is required`);
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

router.post('/create_user_id', async (ctx, next) => {
  try {
    const { userName } = ctx.request.body;
    if (!userName) {
      ctx.response.fail(400, 'userName is required');
      return;
    }
    ctx.response.success({ userId: `${generateId()}` });
    await next();
  } catch (err) {
    await next(err);
  }
});

export default router;
