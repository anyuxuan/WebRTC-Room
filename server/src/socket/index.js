import socketIO from 'socket.io';
import { logger } from '../utils';
import { isTokenValid } from './helpers/validator';

function socketStarter(server) {
  const io = socketIO(server);
  let payload = null;

  // middleware
  io.use((socket, next) => {
    const { token } = socket.handshake.query;
    const { isValid, errMsg, decoded } = isTokenValid(token);
    if (isValid) {
      payload = { ...decoded };
      return next();
    }
    return next(new Error(errMsg));
  });

  io.on('connection', (socket) => {
    logger.info('A user connected');
    socket.on('disconnect', () => {
      logger.info('disconnect');
      socket.broadcast.emit('quit', {
        userName: payload.userName
      });
    });
    socket.on('error', (err) => {
      logger.info('error: ', err);
    });
    socket.broadcast.emit('new-user-joined', {
      appId: payload.appId,
      userName: payload.userName,
      roomId: payload.roomId,
      userId: payload.userId,
    });
  });
}

export { socketStarter };
