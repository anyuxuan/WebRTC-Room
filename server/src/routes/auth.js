import koaRouter from 'koa-router';

const router = koaRouter();

router.get('/create_token', (ctx, next) => {
  ctx.body = ctx.res.success({ token: '123' });
  next();
});

export default router;
