import { Client, ClientProps } from '@/WebRTC-SDK/Client';
import { detectRTC } from '@/WebRTC-SDK/helpers';
import { Stream, StreamProps, StreamSpec } from '@/WebRTC-SDK/Stream';

import 'webrtc-adapter';

export type Callback<T, U, R> = (err?: T, data?: U) => R;

export interface SDKConfig {
  mode: 'live';
  codec: 'vp8' | 'h264';
}

interface WebRTCSDKProps {
  readonly VERSION: string;
  detectRTC(): boolean;
  createClient(config: SDKConfig): ClientProps;
  createStream(spec: StreamSpec): StreamProps;
  getDevices(callback: Callback<Error, MediaDeviceInfo[], void>): Promise<void>;
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
  async getDevices(callback: Callback<Error, MediaDeviceInfo[], void>): Promise<void> {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      callback(new Error('Your browser does not support enumerateDevices function'));
      return;
    }
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      callback(null, devices);
    } catch (err) {
      callback(err);
    }
  },
};

export { WebRTCSDK };
