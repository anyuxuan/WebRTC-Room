import { isPlainObject, isString } from '@/WebRTC-SDK/utils/value-check';
import { Logger } from '@/WebRTC-SDK/Logger';
import { Callback } from '@/WebRTC-SDK/WebRTC-SDK';

export interface RoomParams {
  userId: string;
  token: string;
  roomId: string;
}

export interface RoomProps {
  enter(roomParams: RoomParams, callback: Callback<Error, string, void>): void;
  leave(userId: string, callback: Callback<Error, string, void>): void;
  publish(stream: any, callback: Callback<Error, any, void>): void;
  unpublish(stream: any, callback: Callback<Error, any, void>): void;
}

class Room implements RoomProps {
  private roomParams;
  private isEntered = false;

  constructor(params) {
    this.roomParams = params;
  }

  enter(roomParams: RoomParams, callback: Callback<Error, string, void>): void {
    if (!roomParams) {
      callback(new TypeError('Param roomParams is required and must be an object'));
      return;
    }
    const { userId, roomId, token } = roomParams;
    if (!userId || !isString(userId)) {
      callback(new TypeError('Param userId is required and must be a string'));
      return;
    }
    if (!roomId || !isString(roomId)) {
      callback(new TypeError('Param roomId is required and must be a string'));
      return;
    }
    if (!token || !isString(token)) {
      callback(new TypeError('Param sig is required and must be a string'));
      return;
    }
    this.isEntered = true;
    callback(null, userId);
    Logger.info('enterRoom success');
  }

  leave(userId: string, callback: Callback<Error, string, void>): void {
    if (!this.isEntered) {
      callback(new Error(`User ${userId} has not entered the room yet`));
      return;
    }
    callback(null, userId);
    Logger.info('leaveRoom success');
  }

  publish(stream: any, callback: Callback<Error, any, void>): void {
    if (!isPlainObject(stream)) {
      callback(new TypeError('Param stream is required and must be an object'));
      return;
    }
  }

  unpublish(stream: any, callback: Callback<Error, any, void>): void {
    if (!isPlainObject(stream)) {
      callback(new TypeError('Param stream is required and must be an object'));
      return;
    }
  }
}

export { Room };
