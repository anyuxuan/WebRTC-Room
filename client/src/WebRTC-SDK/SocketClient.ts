import SocketIO from 'socket.io-client';

export interface SocketClientProps {
  connect(): void;
  disconnect(): void;
  reconnect(): void;
}

export interface SocketClientOptions {
  IO?: any;
}

class SocketClient implements SocketClientProps {
  private options: SocketClientOptions;
  private io: any;

  constructor(options: SocketClientOptions = {}) {
    const { IO = SocketIO } = options;
    this.io = IO(options);
    this.options = options;
  }

  connect = (): void => {

  };

  disconnect = (): void => {};

  reconnect = (): void => {};
}

export { SocketClient };
