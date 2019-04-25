import socketIO from 'socket.io-client';
import EventEmitter from 'wolfy87-eventemitter';
import { Logger } from '@/WebRTC-SDK/Logger';

export interface SocketClientProps extends EventEmitter {
  connect(): void;
  disconnect(): void;
  reconnect(): void;
}

export interface SocketClientOptions {
  url: string;
  ioClient?: SocketIOClientStatic;
  ioOptions?: SocketIOClient.ConnectOpts;
}

const connectionStats = {
  CONNECTED: Symbol('CONNECTED'),
  RECONNECTING: Symbol('RECONNECTING'),
  DISCONNECTED: Symbol('DISCONNECTED'),
};

class SocketClient extends EventEmitter implements SocketClientProps {
  private readonly options: SocketClientOptions;
  private io: SocketIOClient.Socket;
  private state: Symbol;

  constructor(options: SocketClientOptions) {
    super();
    this.options = options;
    this.state = connectionStats.DISCONNECTED;
  }

  connect = (): void => {
    const { ioClient = socketIO, url, ioOptions } = this.options;
    this.io = ioClient(url, ioOptions);
    this._listenSocketEvents();
  };

  disconnect = (): void => {};

  reconnect = (): void => {};

  private _listenSocketEvents = (): void => {
    this.io.on('connect', (data) => {
      Logger.info('connect', data);
      this.state = connectionStats.CONNECTED;
      this.emit('connected');
    });
    this.io.on('event', (data) => {
      Logger.info('event', data);
    });
    this.io.on('disconnect', (data) => {
      Logger.info('disconnect', data);
      this.state = connectionStats.DISCONNECTED;
      this.emit('disconnected');
    });
    this.io.on('error', (err) => {
      Logger.error('error: ', err);
    });
  };
}

export { SocketClient };
