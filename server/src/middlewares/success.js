export function success() {
  return async function(ctx, next) {
    ctx.response.success = function(data) {
      ctx.status = 200;
      ctx.body = {
        success: true,
        code: 200,
        data,
      };
    };
    await next();
  };
}
