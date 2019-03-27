export function success() {
  return async function(ctx, next) {
    ctx.response.success = function(data) {
      ctx.status = 200;
      return {
        success: true,
        code: 200,
        data,
      };
    };
    await next();
  };
}
