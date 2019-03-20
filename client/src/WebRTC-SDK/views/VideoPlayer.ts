import { genErrorFunction, getElementById } from '@/WebRTC-SDK/helpers';

export interface VideoPlayerProps {
  play(success: () => void, fail: (err: Error) => void): void;
  destroy(): void;
  resize(): void;
}

export interface VideoPlayerOptions {
  elementId: string;
  stream: MediaStream;
}

class VideoPlayer implements VideoPlayerProps {
  private readonly options: VideoPlayerOptions;
  private div: HTMLDivElement;
  private video: HTMLVideoElement;

  constructor(options) {
    this.options = options;
  }

  play(success: () => void, fail: (err: Error) => void): void {
    const { elementId } = this.options;
    const errCallback = genErrorFunction(fail);
    const container = getElementById(elementId);
    if (!container) {
      errCallback(new Error(`Element with id '${elementId}' does not exit in this document`));
      return;
    }
    this.div = document.createElement('div');
    this.video = document.createElement('video');
  }

  destroy(): void {}

  resize(): void {}
}

export { VideoPlayer };
