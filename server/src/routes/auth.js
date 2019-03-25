import koaRouter from 'koa-router';

const router = koaRouter();

router.get('/create_token', (ctx, next) => {
  ctx.body = 'create token success';
  next();
});

export default router;
