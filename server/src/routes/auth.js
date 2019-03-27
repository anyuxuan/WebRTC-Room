import koaRouter from 'koa-router';

const router = koaRouter();

router.post('/create_token', async (ctx, next) => {
  try {
    const { userName, roomId } = ctx.request.body;
    if (!userName) {
      ctx.body = ctx.response.fail('Param userName is required', 400);
    }
    ctx.body = ctx.response.success({ token: '123' });
    await next();
  } catch (err) {
    await next(err);
  }
});

router.post('/create_app_id', async (ctx, next) => {
  try {
    ctx.body = ctx.response.success({ appId: '123' });
    await next();
  } catch (err) {
    await next(err);
  }
});

export default router;
