import socketIO from 'socket.io';
import { logger } from '../utils/logger';

function socketStarter(server) {
  const io = socketIO(server);

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
