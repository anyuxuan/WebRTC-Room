import { Client, ClientProps } from './Client';
import { detectRTC } from './helpers';

export interface SDKConfig {
  mode: 'live';
  codec: 'vp8' | 'h264';
}

const WebRTCSDK = {
  VERSION: '0.0.1',
  detectRTC,
  createClient(config: SDKConfig): ClientProps {
    return new Client(config);
  },
  createStream(spec: any): any {

  },
  getDevices(success, error): void {
    return;
  },
};

export { WebRTCSDK };
