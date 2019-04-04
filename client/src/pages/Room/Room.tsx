import React from 'react';
import { connect } from 'dva';
import LocalVideo from '@/pages/Video/LocalVideo';
import RemoteVideo from '@/pages/Video/RemoteVideo';
import DeviceList, { DeviceType } from '@/components/DeviceList/DeviceList';
import styles from './Room.scss';

interface RoomState {
  isSupportRTC: boolean;
}

@connect(({ global, media }) => ({ global, media }))
class Room extends React.Component<any, RoomState> {
  state: RoomState = {
    isSupportRTC: true,
  };
  
  componentDidMount() {
    const { WebRTCSDK } = this.props.global;
    this.setState({
      isSupportRTC: WebRTCSDK.detectRTC(),
    });
    this.props.dispatch({
      type: 'media/getDevices',
    });
  }
  
  openCamera = ({ kind, deviceId }) => {
    console.log(kind, deviceId);
  };
  
  openMicrophone = ({ kind, deviceId }) => {
    console.log(kind, deviceId);
  };
  
  render() {
    const { isSupportRTC } = this.state;
    const { media } = this.props;
    if (!isSupportRTC) {
      return <p>Your browser does not support WebRTC</p>;
    }
    return (
      <div className={styles.roomContainer}>
        <DeviceList deviceList={media.devices} onChange={this.openCamera} type={DeviceType.CAMERA}/>
        <DeviceList deviceList={media.devices} onChange={this.openMicrophone} type={DeviceType.MICROPHONE}/>
        <div className={styles.videoContainer}>
          <LocalVideo/>
          <RemoteVideo/>
        </div>
      </div>
    );
  }
}

export default Room;
