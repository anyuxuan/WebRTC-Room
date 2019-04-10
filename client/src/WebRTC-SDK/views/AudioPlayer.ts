import { Callback } from '@/WebRTC-SDK';
import { Stream } from '@/WebRTC-SDK/Stream';

export interface AudioPlayerProps {
  play(callback: Callback<Error, any, void>): void;
  destroy(): void;
}

export interface AudioPlayerOptions {
  streamId: string;
  elementId: string | HTMLElement;
  stream: Stream;
}

class AudioPlayer implements AudioPlayerProps {
  private options: AudioPlayerOptions;

  constructor(options) {
    this.options = options;
  }

  play(callback: Callback<Error, any, void>): void {
  }

  destroy(): void {
  }
}

export { AudioPlayer };
