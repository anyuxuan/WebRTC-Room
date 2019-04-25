import EventEmitter from 'wolfy87-eventemitter';
import { isPlainObject, isString } from '@/WebRTC-SDK/utils/value-check';
import { Logger } from '@/WebRTC-SDK/Logger';
import { Callback } from '@/WebRTC-SDK/WebRTC-SDK';
import { SocketClient, SocketClientProps } from '@/WebRTC-SDK/SocketClient';

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

class Room extends EventEmitter implements RoomProps {
  private roomParams;
  private isEntered = false;
  private socket: SocketClientProps;

  constructor() {
    super();
  }

  enter = (roomParams: RoomParams, callback: Callback<Error, string, void>): void => {
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
      callback(new TypeError('Param token is required and must be a string'));
      return;
    }
    this.roomParams = roomParams;
    this.socket = new SocketClient({
      url: 'localhost:3000',
      ioOptions: {
        query: {
          token,
        },
      },
    });
    this.socket.connect();
    this.socket.on('connected', () => {
      Logger.info('enterRoom success');
      this.isEntered = true;
      callback(null, userId);
    });
  };

  leave = (userId: string, callback: Callback<Error, string, void>): void => {
    if (!this.isEntered) {
      callback(new Error(`User ${userId} has not entered the room yet`));
      return;
    }
    callback(null, userId);
    Logger.info('leaveRoom success');
  };

  publish = (stream: any, callback: Callback<Error, any, void>): void => {
    if (!isPlainObject(stream)) {
      callback(new TypeError('Param stream is required and must be an object'));
      return;
    }
  };

  unpublish = (stream: any, callback: Callback<Error, any, void>): void => {
    if (!isPlainObject(stream)) {
      callback(new TypeError('Param stream is required and must be an object'));
      return;
    }
  };
}

export { Room };
