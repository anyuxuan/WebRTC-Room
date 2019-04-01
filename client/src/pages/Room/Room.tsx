import React from 'react';
import { connect } from 'dva';
import LocalVideo from '@/pages/Video/LocalVideo';
import RemoteVideo from '@/pages/Video/RemoteVideo';
import styles from './Room.scss';

interface RoomState {

}

@connect(({ global }) => ({ global }))
class Room extends React.Component<any, RoomState> {
  componentDidMount(): void {
    const { WebRTCSDK } = this.props.global;
    WebRTCSDK.getDevices((devices) => {
      console.log('devices: ', devices);
    });
  }

  render() {
    return (
      <div>
        Room
        <div className={styles.videoContainer}>
          <LocalVideo />
          <RemoteVideo />
        </div>
      </div>
    );
  }
}

export default Room;
