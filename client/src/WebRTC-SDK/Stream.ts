import { genErrorFunction } from '@/WebRTC-SDK/helpers';
import { VideoPlayer, VideoPlayerOptions, VideoPlayerProps } from '@/WebRTC-SDK/views/VideoPlayer';
import { AudioPlayer, AudioPlayerOptions, AudioPlayerProps } from '@/WebRTC-SDK/views/AudioPlayer';

export interface StreamProps {
  init(): void;
  play(elementId: string, success: () => void, fail: (err: Error) => void): void;
  getAttributes(): void;
  getId(): string;
  hasVideo(): boolean;
  hasAudio(): boolean;
  hasMedia(): boolean;
  muteVideo(): void;
  unmuteVideo(): void;
  muteAudio(): void;
  unmuteAudio(): void;
}

export interface StreamSpec {
  streamId: string;
  microphoneId: string;
  cameraId: string;
  video: boolean;
  audio: boolean;
}

class Stream implements StreamProps {
  private spec: StreamSpec;
  private p2p: boolean;
  private video: boolean;
  private audio: boolean;
  private pc: RTCPeerConnection;
  private local: boolean = false;
  private player: VideoPlayerProps | AudioPlayerProps;
  private elementId: string;
  private stream: MediaStream;

  constructor(spec) {
    this.spec = spec;
    this.video = spec.video;
    this.audio = spec.audio;
  }

  init() {

  }

  play(elementId: string, success: () => void, fail: (err: Error) => void): void {
    const errCallback = genErrorFunction(fail);
    if (!elementId) {
      errCallback(new TypeError('Param elementId is required and must be a string'));
      return;
    }
    this.elementId = elementId;
    if (this.hasVideo()) {
      const options: VideoPlayerOptions = {
        elementId,
        stream: this.stream,
      };
      this.player = new VideoPlayer(options);
    } else if (this.hasAudio()) {
      const options: AudioPlayerOptions = {
        elementId,
        stream: this.stream,
      };
      this.player = new AudioPlayer(options);
    }
    this.player.play(success, fail);
  }

  getAttributes(): void {}

  getId(): string {
    return this.spec.streamId;
  }

  hasVideo(): boolean {
    return !!this.spec.video;
  }

  hasAudio(): boolean {
    return !!this.spec.audio;
  }

  hasMedia(): boolean {
    return !!this.spec.video || !!this.spec.audio;
  }

  muteVideo(): void {}

  unmuteVideo(): void {}

  muteAudio(): void {}

  unmuteAudio(): void {}
}

export { Stream };
