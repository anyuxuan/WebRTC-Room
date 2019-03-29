import socketIO from 'socket.io';
import { logger } from '../utils';
import { isTokenValid } from './helpers/validator';

function socketStarter(server) {
  const io = socketIO(server);

  // middleware
  io.use((socket, next) => {
    const { token } = socket.handshake.query;
    const { isValid, errMsg } = isTokenValid(token);
    if (isValid) {
      return next();
    }
    return next(new Error(errMsg));
  });

  io.on('connection', (socket) => {
    logger.info('A user connected');
    socket.on('event', (data) => {
      logger.info('event: ', data);
    });
    socket.on('disconnect', () => {
      logger.info('disconnect');
    });
  });
}

export { socketStarter };
