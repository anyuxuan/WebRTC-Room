import { VideoPlayer, VideoPlayerOptions, VideoPlayerProps } from '@/WebRTC-SDK/views/VideoPlayer';
import { AudioPlayer, AudioPlayerOptions, AudioPlayerProps } from '@/WebRTC-SDK/views/AudioPlayer';
import { Callback } from '@/WebRTC-SDK/WebRTC-SDK';
import { getUserMedia } from '@/WebRTC-SDK/helpers';
import { Logger } from '@/WebRTC-SDK/Logger';
import { noop } from '@/WebRTC-SDK/utils';

export interface StreamProps {
  init(callback: Callback<Error, any, void>): Promise<void>;
  play(elementId: string, callback?: Callback<Error, any, void>): void;
  stop(): void;
  getAttributes(): void;
  getId(): string;
  hasVideo(): boolean;
  hasAudio(): boolean;
  hasMedia(): boolean;
  muteVideo(): void;
  unmuteVideo(): void;
  muteAudio(): void;
  unmuteAudio(): void;
  isLocal(): boolean;
  isPlaying(): boolean;
  getMediaStream(): MediaStream;
}

export interface StreamSpec {
  streamId?: string;
  microphoneId?: string;
  cameraId?: string;
  video?: boolean;
  audio?: boolean;
  local?: boolean;
}

class Stream implements StreamProps {
  private spec: StreamSpec;
  private p2p: boolean;
  private video: boolean;
  private audio: boolean;
  private pc: RTCPeerConnection;
  private local: boolean;
  private player: VideoPlayerProps | AudioPlayerProps;
  private elementId: string;
  private stream: MediaStream;
  private initialized: boolean;
  private isShowing: boolean = false;
  private videoMuted: boolean = false;
  private audioMuted: boolean = false;

  constructor(spec) {
    this.spec = spec;
    this.video = spec.video;
    this.audio = spec.audio;
    if (spec.local == null || spec.local === true) {
      this.local = true;
    }
  }

  init = async (callback: Callback<Error, any, void>): Promise<void> => {
    if (this.initialized) {
      callback(new Error('Stream has been initialized'));
      return;
    }
    if (!this.local) {
      callback(new Error('Stream is not a local stream'));
      return;
    }
    if (this.video || this.audio) {
      try {
        const constraints = {
          video: this.video,
          audio: this.audio,
        };
        const stream = await getUserMedia(constraints);
        Logger.info('User has granted access to local media');
        this.stream = stream;
        callback(null, stream);
      } catch (err) {
        Logger.info('Failed to get access to local media');
        callback(err);
      }
    } else {
      callback(new Error('Stream does not has valid attributes'));
      return;
    }
  };

  play = (elementId: string, callback: Callback<Error, any, void> = noop): void => {
    if (!elementId) {
      callback(new TypeError('Param elementId is required and must be a string'));
      return;
    }
    this.elementId = elementId;
    const { streamId } = this.spec;
    if (this.hasVideo()) {
      const options: VideoPlayerOptions = {
        streamId,
        elementId,
        stream: this,
      };
      this.player = new VideoPlayer(options);
    } else if (this.hasAudio()) {
      const options: AudioPlayerOptions = {
        streamId,
        elementId,
        stream: this,
      };
      this.player = new AudioPlayer(options);
    }
    this.player.play(callback);
    this.isShowing = true;
  };

  stop = (): void => {
    if (this.isShowing) {
      if (this.player) {
        this.player.destroy();
        this.isShowing = false;
      }
    }
  };

  getAttributes = (): void => {};

  getId = (): string => {
    if (this.local && !this.spec.streamId) {
      return 'local';
    } else {
      return this.spec.streamId;
    }
  };

  hasVideo = (): boolean => {
    return !!this.spec.video;
  };

  hasAudio = (): boolean => {
    return !!this.spec.audio;
  };

  hasMedia = (): boolean => {
    return !!this.spec.video || !!this.spec.audio;
  };

  muteVideo = (): void => {
    this.videoMuted = true;
  };

  unmuteVideo = (): void => {
    this.videoMuted = false;
  };

  muteAudio = (): void => {
    this.audioMuted = true;
  };

  unmuteAudio = (): void => {
    this.audioMuted = false;
  };

  isLocal = (): boolean => {
    return this.local;
  };

  isPlaying = (): boolean => {
    return this.isShowing;
  };

  getMediaStream = (): MediaStream => {
    return this.stream;
  };
}

export { Stream };
