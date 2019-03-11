import { SDKConfig } from './WebRTC-SDK';

export interface ClientProps {
}

class Client implements ClientProps {
  private config: SDKConfig;

  constructor(config: SDKConfig) {
    this.config = config;
  }
}

export { Client };
