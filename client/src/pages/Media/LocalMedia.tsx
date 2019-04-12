import React from 'react';
import { connect } from 'dva';
import { StreamProps, StreamSpec } from '@/WebRTC-SDK';
import styles from './LocalMedia.scss';

interface LocalMediaState {
  localStreams: Map<string, StreamProps>;
}

interface HardwareInfo {
  deviceId: string;
}

@connect(({ global, media }) => ({ global, media }))
class LocalMedia extends React.Component<any, LocalMediaState> {
  state: LocalMediaState = {
    localStreams: new Map(),
  };

  componentDidMount(): void {
    this.props.dispatch({
      type: 'media/getDevices',
    });
  }

  componentWillReceiveProps(nextProps: Readonly<any>): void {
    const { devices } = nextProps.media;
    if (devices.length) {
      const cameraList = devices.filter(device => device.kind === 'videoinput');
      this.openCamera({
        deviceId: cameraList[0].deviceId,
      });
    }
  }

  openCamera = (hardwareInfo: HardwareInfo): void => {
    const { WebRTCSDK } = this.props.global;
    const { deviceId } = hardwareInfo;
    const spec: StreamSpec = {
      streamId: 'local',
      video: true,
      audio: false,
      cameraId: deviceId,
    };
    const stream = WebRTCSDK.createStream(spec);
    stream.init((err) => {
      if (err) {
        console.error(err);
        return;
      }
      stream.play('localVideo', () => {});
    });
  };

  render() {
    return (
      <div id={'localVideo'} className={styles.wrapper}>
        LocalVideo
      </div>
    );
  }
}

export default LocalMedia;
