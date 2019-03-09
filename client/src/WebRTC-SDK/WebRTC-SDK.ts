import { Client, ClientProps } from './Client';

export interface SDKConfig {
  mode: 'live',
  codec: 'vp8' | 'h264',
}

class WebRTCSDK {
  private readonly VERSION = '0.0.1';

  detectRTC() {}

  createClient(config: SDKConfig): ClientProps {
    return new Client(config);
  }
}

export { WebRTCSDK };
