import { isPlainObject, isString } from '@/WebRTC-SDK/utils/value-check';
import { Logger } from '@/WebRTC-SDK/Logger';
import { genErrorFunction } from '@/WebRTC-SDK/helpers';

export interface RoomParams {
  userId: string;
  sig: string;
  roomId: string;
}

export interface RoomProps {
  enter(roomParams: RoomParams, success: () => void, fail: (err: Error) => void): void;
  leave(userId: string, success: () => void, fail: (err: Error) => void): void;
  publish(stream: any, success: () => void, fail: (err: Error) => void): void;
  unpublish(stream: any, success: () => void, fail: (err: Error) => void): void;
}

class Room implements RoomProps {
  private roomParams;
  private isEntered = false;

  constructor(params) {
    this.roomParams = params;
  }

  enter(roomParams: RoomParams, success: () => void, fail: (err: Error) => void): void {
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
    this.isEntered = true;
    Logger.info('enterRoom success');
  }

  leave(userId: string, success: () => void, fail: (err: Error) => void): void {
    const errCallback = genErrorFunction(fail);
    if (!this.isEntered) {
      errCallback(new Error(`User ${userId} has not entered the room yet`));
      return;
    }
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

export { Room };
