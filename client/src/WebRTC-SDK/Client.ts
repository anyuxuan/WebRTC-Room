import { Callback, SDKConfig } from '@/WebRTC-SDK/WebRTC-SDK';
import { isString, isFunction } from '@/WebRTC-SDK/utils/value-check';
import { Logger } from '@/WebRTC-SDK/Logger';
import { Room, RoomParams, RoomProps } from '@/WebRTC-SDK/Room';

export interface ClientProps {
  initCore(appId: string, callback: Callback<Error, any, void>): void;
  initRoom(roomParams: RoomParams): RoomProps;
}

class Client implements ClientProps {
  private config: SDKConfig;
  private appId: string;

  constructor(config: SDKConfig) {
    this.config = config;
  }

  initCore = (appId: string, callback: Callback<Error, any, void>): void => {
    if (!appId || !isString(appId)) {
      callback(new TypeError(`Param appId is required and must be a string`));
      return;
    }
    this.appId = appId;
    if (isFunction(callback)) {
      callback(null);
    }
    Logger.info('initCore success');
  };

  initRoom = (roomParams: RoomParams): RoomProps => {
    return new Room(roomParams);
  };
}

export { Client };
