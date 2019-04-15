import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { StreamProps, StreamSpec } from '@/WebRTC-SDK';
import styles from './LocalMedia.scss';
import { initStream } from '@/utils';

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
  }

  openCamera = async (): Promise<void> => {
    const { WebRTCSDK } = this.props.global;
    const spec: StreamSpec = {
      streamId: 'local',
      video: true,
      audio: false,
    };
    const stream = WebRTCSDK.createStream(spec);
    await initStream(stream);
    stream.play('localVideo', () => {});
  };

  openMicrophone = async (): Promise<void> => {

  };

  render() {
    return (
      <div id={'localVideo'} className={styles.wrapper}>
        <div className={styles.tools}>
          <Icon
            onClick={() => this.openMicrophone()}
            style={{ fontSize: 20 }}
            type="sound"
            theme="filled"
          />
          <Icon
            onClick={() => this.openCamera()}
            style={{ fontSize: 20 }}
            type="camera"
            theme="filled"
          />
          <Icon
            style={{ fontSize: 20 }}
            type="setting"
            theme="filled"
          />
        </div>
      </div>
    );
  }
}

export default LocalMedia;
