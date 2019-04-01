import { Client, ClientProps } from './Client';
import { detectRTC, genErrorFunction } from './helpers';
import { Stream, StreamProps, StreamSpec } from '@/WebRTC-SDK/Stream';

export interface SDKConfig {
  mode: 'live';
  codec: 'vp8' | 'h264';
}

interface WebRTCSDKProps {
  readonly VERSION: string;
  detectRTC(): boolean;
  createClient(config: SDKConfig): ClientProps;
  createStream(spec: StreamSpec): StreamProps;
  getDevices(success: (devices: MediaDeviceInfo[]) => void, fail: (err: Error) => void): void;
}

const WebRTCSDK: WebRTCSDKProps = {
  VERSION: '0.0.1',
  detectRTC,
  createClient(config: SDKConfig): ClientProps {
    return new Client(config);
  },
  createStream(spec: StreamSpec): StreamProps {
    return new Stream(spec);
  },
  getDevices(success: (devices: MediaDeviceInfo[]) => void, fail: (err: Error) => void): void {
    const errCallback = genErrorFunction(fail);
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      errCallback(new Error('Your browser does not support enumerateDevices function'));
      return;
    }
    navigator.mediaDevices.enumerateDevices().then(success).catch(errCallback);
  },
};

export { WebRTCSDK };
