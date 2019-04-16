import { Callback } from '@/WebRTC-SDK';
import { Stream } from '@/WebRTC-SDK/Stream';
import { getElementById, isDomNode, setDomAttributes } from '@/WebRTC-SDK/utils';
import { Logger } from '@/WebRTC-SDK/Logger';

export interface AudioPlayerProps {
  play(callback: Callback<Error, any, void>): void;
  destroy(): void;
  resize(): void;
}

export interface AudioPlayerOptions {
  streamId: string;
  elementId: string | HTMLElement;
  stream: Stream;
}

class AudioPlayer implements AudioPlayerProps {
  private options: AudioPlayerOptions;
  private audio: HTMLAudioElement;
  private div: HTMLDivElement;
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
      class: 'rtc_player',
      style: 'width: 100%; height: 100%; position: relative; overflow: hidden;',
    });
    this.audio = document.createElement('audio');
    setDomAttributes(this.audio, {
      id: `stream_${streamId}`,
      class: 'rtc_stream',
      style: 'width: 100%; height: 100%; position: absolute;',
      autoplay: 'autoplay',
    });
    if (stream.isLocal()) {
      this.audio.volume = 0;
    }
    this.container.appendChild(this.div);
    this.div.appendChild(this.audio);
    this.audio.srcObject = stream.getMediaStream();
    callback(null);
  };

  destroy = (): void => {
    this.audio.pause();
    this.container.removeChild(this.div);
  };

  resize = (): void => {};
}

export { AudioPlayer };
