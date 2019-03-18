import { SDKConfig } from '@/WebRTC-SDK/WebRTC-SDK';
import { isString, isFunction } from '@/WebRTC-SDK/utils/value-check';

export interface ClientProps {
}

class Client implements ClientProps {
  private config: SDKConfig;
  private appId: string;

  constructor(config: SDKConfig) {
    this.config = config;
  }

  initCore(appId: string, success: () => void, fail: (err: Error) => void): void {
    if (!appId || !isString(appId)) {
      if (isFunction(fail)) {
        fail(new Error());
      }
    }
    this.appId = appId;
    if (isFunction(success)) {
      success();
    }
  }

  enterRoom() {

  }
}

export { Client };
