import { SDKConfig } from '@/WebRTC-SDK/WebRTC-SDK';
import { isString, isFunction } from '@/WebRTC-SDK/utils/value-check';
import { Room, RoomParams, RoomProps } from '@/WebRTC-SDK/Room';

export interface ClientProps {
  initCore(appId: string, success: () => void, fail: (err: Error) => void): void;
  enterRoom(roomParams: RoomParams, success: () => void, fail: (err: Error) => void): void;
}

class Client implements ClientProps {
  private config: SDKConfig;
  private appId: string;
  private room: RoomProps;

  constructor(config: SDKConfig) {
    this.config = config;
  }

  initCore(appId: string, success: () => void, fail: (err: Error) => void): void {
    if (!appId || !isString(appId)) {
      if (isFunction(fail)) {
        fail(new Error(`Param appId is required and must be a string`));
      }
    }
    this.appId = appId;
    if (isFunction(success)) {
      success();
    }
  }

  enterRoom(roomParams: RoomParams, success: () => void, fail: (err: Error) => void): void {
    const errFunc = isFunction(fail) ? fail : (err: Error) => {throw err;};
    if (!roomParams) {
      errFunc(new Error('Param roomParams is required and must be an object'));
    }
    const { userId, roomId, sig } = roomParams;
    if (!userId || !isString(userId)) {
      errFunc(new Error('Param userId is required and must be a string'));
    }
    if (!roomId || !isString(roomId)) {
      errFunc(new Error('Param roomId is required and must be a string'));
    }
    if (!sig || !isString(sig)) {
      errFunc(new Error('Param sig is required and must be a string'));
    }
    this.room = new Room(roomParams);
  }
}

export { Client };
