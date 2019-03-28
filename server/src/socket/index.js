import socketIO from 'socket.io';
import { logger } from '../utils/logger';
import { isValid } from './helpers/validator';

function socketStarter(server) {
  const io = socketIO(server);

  // middleware
  io.use((socket, next) => {
    const token = socket.handshake.query;
    if (isValid(token)) {
      return next();
    }
    return next(new Error('Authentication error'));
  });

  io.on('connection', (socket) => {
    logger.info('A user connected');
    const token = socket.handshake.query;
    logger.info('token: ', token);
    socket.on('event', (data) => {
      logger.info('event: ', data);
    });
    socket.on('disconnect', () => {
      logger.info('disconnect');
    });
  });
}

export { socketStarter };
