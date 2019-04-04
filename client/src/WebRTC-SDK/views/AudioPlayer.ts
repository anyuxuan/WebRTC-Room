import { Callback } from '@/WebRTC-SDK';

export interface AudioPlayerProps {
  play(callback: Callback<Error, any, void>): void;
  destroy(): void;
}

export interface AudioPlayerOptions {
  elementId: string;
  stream: MediaStream;
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
