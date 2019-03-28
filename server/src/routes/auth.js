import koaRouter from 'koa-router';
import md5 from 'blueimp-md5';

const router = koaRouter();

router.post('/create_token', async (ctx, next) => {
  try {
    const { userName, roomId } = ctx.request.body;
    if (!userName) {
      ctx.response.fail(400, 'userName is required');
      return;
    }
    ctx.response.success({ token: '123' });
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
