import { getElementById } from '@/WebRTC-SDK/helpers';
import { Callback } from '@/WebRTC-SDK';

export interface VideoPlayerProps {
  play(callback: Callback<Error, any, void>): void;
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
  
  play(callback: Callback<Error, any, void>): void {
    const { elementId } = this.options;
    const container = getElementById(elementId);
    if (!container) {
      callback(new Error(`Element with id '${elementId}' does not exit in this document`));
      return;
    }
    this.div = document.createElement('div');
    this.video = document.createElement('video');
  }
  
  destroy(): void {
  }
  
  resize(): void {
  }
}

export { VideoPlayer };
