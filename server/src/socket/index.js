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
    socket.join(payload.roomId, () => {
      const { rooms } = socket;
      logger.info(rooms);
      io.to(payload.roomId).emit('A new user entered the room');
    });
    socket.on('event', (data) => {
      logger.info('event: ', data);
    });
    socket.on('disconnect', () => {
      logger.info('disconnect');
    });
    socket.on('error', (err) => {
      logger.info('error: ', err);
    });
  });
}

export { socketStarter };
