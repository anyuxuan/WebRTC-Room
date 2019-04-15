import { Stream } from '@/WebRTC-SDK/Stream';

export function initStream(stream: Stream): Promise<void> {
  return new Promise((resolve, reject) => {
    stream.init((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}
