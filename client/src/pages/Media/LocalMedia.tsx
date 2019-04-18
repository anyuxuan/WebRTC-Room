import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import styles from './LocalMedia.scss';
import { initStream } from '@/utils';
import VIDEO_ON_IMG from '@/assets/video-on.png';
import VIDEO_OFF_IMG from '@/assets/video-off.png';

interface LocalMediaState {
  isCameraOn: boolean;
  isMicrophoneOn: boolean;
}

@connect(({ global, media }) => ({ global, media }))
class LocalMedia extends React.Component<any, LocalMediaState> {
  state: LocalMediaState = {
    isCameraOn: false,
    isMicrophoneOn: false,
  };

  componentDidMount(): void {
    this.props.dispatch({
      type: 'media/getDevices',
    });
  }

  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<LocalMediaState>, snapshot?: any): void {

  }

  openCamera = async (): Promise<void> => {
    const { WebRTCSDK } = this.props.global;
    const spec = {
      streamId: 'local',
      video: true,
      audio: false,
    };
    const stream = WebRTCSDK.createStream(spec);
    await initStream(stream);
    this.props.dispatch({
      type: 'media/saveLocalStreams',
      userId: '123',
      stream,
    });
    stream.play('localVideo');
    this.setState({ isCameraOn: true });
  };

  closeCamera = async (): Promise<void> => {
    const { localStreams } = this.props.media;
    const stream = localStreams.get('123');
    stream.stop();
    this.setState({ isCameraOn: false });
  };

  openMicrophone = async (): Promise<void> => {

  };

  closeMicrophone = async (): Promise<void> => {};

  render() {
    const { isCameraOn, isMicrophoneOn } = this.state;
    return (
      <div id={'localVideo'} className={styles.wrapper}>
        <div className={styles.tools}>
          <Icon
            onClick={() => this.openMicrophone()}
            style={{ fontSize: 20 }}
            type="sound"
            theme="twoTone"
          />
          {isCameraOn ?
            <img
              onClick={this.closeCamera}
              src={VIDEO_ON_IMG}
              alt="video-on"
            /> :
            <img
              onClick={this.openCamera}
              src={VIDEO_OFF_IMG}
              alt="video-off"
            />}
          <Icon
            style={{ fontSize: 20 }}
            type="setting"
            theme="twoTone"
          />
        </div>
      </div>
    );
  }
}

export default LocalMedia;
