export function fail() {
  return async function(ctx, next) {
    ctx.response.fail = function(code = 500, msg = 'Error occurred') {
      ctx.status = code;
      ctx.body = {
        success: false,
        code,
        data: null,
        msg: msg && msg.message || msg,
      };
    };
    await next();
  };
}
