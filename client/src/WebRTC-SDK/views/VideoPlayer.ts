import { getElementById, isDomNode, setDomAttributes } from '@/WebRTC-SDK/helpers';
import { Callback } from '@/WebRTC-SDK';
import { Stream } from '@/WebRTC-SDK/Stream';
import { Logger } from '@/WebRTC-SDK/Logger';

export interface VideoPlayerProps {
  play(callback: Callback<Error, any, void>): void;
  destroy(): void;
  resize(): void;
}

export interface VideoPlayerOptions {
  streamId: string;
  elementId: string | HTMLElement;
  stream: Stream;
}

class VideoPlayer implements VideoPlayerProps {
  private readonly options: VideoPlayerOptions;
  private div: HTMLDivElement;
  private video: HTMLVideoElement;
  private container: HTMLElement;

  constructor(options) {
    this.options = options;
  }

  play = (callback: Callback<Error, any, void>): void => {
    const { elementId, streamId, stream } = this.options;
    if (elementId) {
      if (isDomNode(elementId)) {
        this.container = elementId as HTMLElement;
      } else {
        this.container = getElementById(elementId as string);
      }
    } else {
      Logger.warning('Param elementId is missing, the video will append to the body of document');
      this.container = document.body;
    }
    this.div = document.createElement('div');
    setDomAttributes(this.div, {
      id: `player_${streamId}`,
      class: `rtc_player`,
      style: 'width: 100%; height: 100%; position: relative; background-color: black; overflow: hidden;',
    });
    this.video = document.createElement('video');
    setDomAttributes(this.video, {
      id: `stream${streamId}`,
      class: `rtc_stream`,
      style: 'width: 100%; height: 100%; position: absolute;',
      autoplay: 'autoplay',
      playsinline: 'playsinline',
    });
    if (stream.isLocal()) {
      this.video.volume = 0;
    }
    this.container.appendChild(this.div);
    this.div.appendChild(this.video);
    this.video.srcObject = stream.getMediaStream();
    callback(null);
  };

  destroy = (): void => {
    this.video.pause();
    this.container.removeChild(this.div);
  };

  resize = (): void => {
  };
}

export { VideoPlayer };
