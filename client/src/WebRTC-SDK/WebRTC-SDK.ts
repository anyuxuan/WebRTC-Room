import { Client, ClientProps } from './Client';

export interface SDKConfig {
  mode: 'live';
  codec: 'vp8' | 'h264';
}

const WebRTCSDK = {
  VERSION: '0.0.1',
  detectRTC() {
    console.log('detect RTC');
  },
  createClient(config: SDKConfig): ClientProps {
    return new Client(config);
  },
  createStream(spec: any): any {

  },
  getDevices(success, error): any[] {
    return [];
  },
};

export { WebRTCSDK };
