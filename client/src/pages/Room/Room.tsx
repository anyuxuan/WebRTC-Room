import React from 'react';
import { connect } from 'dva';
import LocalVideo from '@/pages/Video/LocalVideo';
import RemoteVideo from '@/pages/Video/RemoteVideo';
import styles from './Room.scss';

interface RoomState {

}

@connect(({ global }) => ({ global }))
class Room extends React.Component<any, RoomState> {
  state = {
    isSupportRTC: true,
  };

  componentDidMount(): void {
    const { WebRTCSDK } = this.props.global;
    this.setState({
      isSupportRTC: WebRTCSDK.detectRTC(),
    });
    this.props.dispatch({
      type: 'media/getDevices',
    });
  }

  render() {
    const { isSupportRTC } = this.state;
    if (!isSupportRTC) {
      return <p>Your browser does not support WebRTC</p>;
    }
    return (
      <div className={styles.roomContainer}>
        <div className={styles.videoContainer}>
          <LocalVideo />
          <RemoteVideo />
        </div>
      </div>
    );
  }
}

export default Room;
