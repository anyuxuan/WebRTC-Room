export function success() {
  return async function(ctx, next) {
    ctx.res.success = function(data) {
      return {
        success: true,
        code: 200,
        data,
      };
    };
    await next();
  };
}
