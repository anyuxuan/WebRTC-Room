export function fail() {
  return async function(ctx, next) {
    ctx.res.fail = function(msg) {
      return {
        success: false,
        code: 500,
        data: null,
        msg
      };
    };
    await next();
  };
}
