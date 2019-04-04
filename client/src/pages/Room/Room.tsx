import React from 'react';
import { connect } from 'dva';
import LocalVideo from '@/pages/Video/LocalVideo';
import RemoteVideo from '@/pages/Video/RemoteVideo';
import Device from '@/pages/Device/Device';
import styles from './Room.scss';

interface RoomState {
  isSupportRTC: boolean;
}

@connect(({ global }) => ({ global }))
class Room extends React.Component<any, RoomState> {
  state: RoomState = {
    isSupportRTC: true,
  };
  
  componentDidMount() {
    const { WebRTCSDK } = this.props.global;
    this.setState({
      isSupportRTC: WebRTCSDK.detectRTC(),
    });
  }
  
  render() {
    const { isSupportRTC } = this.state;
    if (!isSupportRTC) {
      return <p>Your browser does not support WebRTC</p>;
    }
    return (
      <div className={styles.roomContainer}>
        <Device />
        <div className={styles.videoContainer}>
          <LocalVideo/>
          <RemoteVideo/>
        </div>
      </div>
    );
  }
}

export default Room;
