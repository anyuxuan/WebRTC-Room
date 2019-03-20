import { SDKConfig } from '@/WebRTC-SDK/WebRTC-SDK';
import { isString, isFunction, isPlainObject } from '@/WebRTC-SDK/utils/value-check';
import { Room, RoomParams, RoomProps } from '@/WebRTC-SDK/Room';
import { Logger } from '@/WebRTC-SDK/Logger';

export interface ClientProps {
  initCore(appId: string, success: () => void, fail: (err: Error) => void): void;
  enterRoom(roomParams: RoomParams, success: () => void, fail: (err: Error) => void): void;
  publish(stream: any, success: () => void, fail: (err: Error) => void): void;
  unpublish(stream: any, success: () => void, fail: (err: Error) => void): void;
}

class Client implements ClientProps {
  private config: SDKConfig;
  private appId: string;
  private room: RoomProps;

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

  enterRoom(roomParams: RoomParams, success: () => void, fail: (err: Error) => void): void {
    const errCallback = genErrorFunction(fail);
    if (!roomParams) {
      errCallback(new TypeError('Param roomParams is required and must be an object'));
      return;
    }
    const { userId, roomId, sig } = roomParams;
    if (!userId || !isString(userId)) {
      errCallback(new TypeError('Param userId is required and must be a string'));
      return;
    }
    if (!roomId || !isString(roomId)) {
      errCallback(new TypeError('Param roomId is required and must be a string'));
      return;
    }
    if (!sig || !isString(sig)) {
      errCallback(new TypeError('Param sig is required and must be a string'));
      return;
    }
    this.room = new Room(roomParams);
    this.room.connect();
    Logger.info('enterRoom success');
  }

  leaveRoom(userId: string, success: () => void, fail: (err: Error) => void): void {
    const errCallback = genErrorFunction(fail);
    if (!this.room) {
      errCallback(new Error(`User ${userId} has not entered the room yet`));
      return;
    }
    this.room.disconnect();
    Logger.info('leaveRoom success');
  }

  publish(stream: any, success: () => void, fail: (err: Error) => void): void {
    const errCallback = genErrorFunction(fail);
    if (!isPlainObject(stream)) {
      errCallback(new TypeError('Param stream is required and must be an object'));
      return;
    }
  }

  unpublish(stream: any, success: () => void, fail: (err: Error) => void): void {
    const errCallback = genErrorFunction(fail);
    if (!isPlainObject(stream)) {
      errCallback(new TypeError('Param stream is required and must be an object'));
      return;
    }
  }
}

function genErrorFunction<T extends (err: Error | any) => void>(failCallback): T {
  return isFunction(failCallback) ? failCallback : (err: Error | any) => {throw err;};
}

export { Client };
