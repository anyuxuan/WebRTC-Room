import { isFunction } from '@/WebRTC-SDK/utils';

export function genErrorFunction<T extends (err: Error | any) => void>(failCallback): T {
  return isFunction(failCallback) ? failCallback : (err: Error | any) => {throw err;};
}
