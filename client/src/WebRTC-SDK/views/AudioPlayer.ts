export interface AudioPlayerProps {
  play(success: () => void, fail: (err: Error) => void): void;
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

  play(success: () => void, fail: (err: Error) => void): void {}

  destroy(): void {}
}

export { AudioPlayer };
