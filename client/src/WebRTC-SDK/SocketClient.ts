import socketIO from 'socket.io-client';
import EventEmitter from 'wolfy87-eventemitter';

export interface SocketClientProps {
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

  };
}

export { SocketClient };
