import koaRouter from 'koa-router';
import authRouter from './auth';

const router = koaRouter();

router.use(authRouter.routes());

export default router;
