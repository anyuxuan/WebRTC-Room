import { SDKConfig } from '@/WebRTC-SDK/WebRTC-SDK';
import { isString, isFunction } from '@/WebRTC-SDK/utils/value-check';
import { Logger } from '@/WebRTC-SDK/Logger';
import { genErrorFunction } from '@/WebRTC-SDK/helpers';
import { Room, RoomParams, RoomProps } from '@/WebRTC-SDK/Room';
import { Stream, StreamProps, StreamSpec } from '@/WebRTC-SDK/Stream';

export interface ClientProps {
  initCore(appId: string, success: () => void, fail: (err: Error) => void): void;
  initRoom(roomParams: RoomParams): RoomProps;
  getDevices(success: (devices: MediaDeviceInfo[]) => void, fail: (err: Error) => void): void;
  createStream(spec: StreamSpec): StreamProps;
}

class Client implements ClientProps {
  private config: SDKConfig;
  private appId: string;

  constructor(config: SDKConfig) {
    this.config = config;
  }

  initCore(appId: string, success: () => void, fail: (err: Error) => void): void {
    const errCallback = genErrorFunction(fail);
    if (!appId || !isString(appId)) {
      errCallback(new TypeError(`Param appId is required and must be a string`));
      return;
    }
    this.appId = appId;
    if (isFunction(success)) {
      success();
    }
    Logger.info('initCore success');
  }

  initRoom(roomParams: RoomParams): RoomProps {
    return new Room(roomParams);
  }

  getDevices(success: (devices: MediaDeviceInfo[]) => void, fail: (err: Error) => void): void {
    const errCallback = genErrorFunction(fail);
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      errCallback(new Error('Your browser does not support enumerateDevices function'));
      return;
    }
    navigator.mediaDevices.enumerateDevices().then(success).catch(errCallback);
  }

  createStream(spec: StreamSpec): StreamProps {
    return new Stream(spec);
  }
}

export { Client };
