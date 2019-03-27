export function fail() {
  return async function(ctx, next) {
    ctx.response.fail = function(msg, code = 500) {
      ctx.status = code;
      return {
        success: false,
        code,
        data: null,
        msg: msg && msg.message || msg,
      };
    };
    await next();
  };
}
