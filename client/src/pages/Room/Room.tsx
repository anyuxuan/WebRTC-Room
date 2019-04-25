import React from 'react';
import { connect } from 'dva';
import LocalMedia from '@/pages/Media/LocalMedia';
import RemoteMedia from '@/pages/Media/RemoteMedia';
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
    const isSupportRTC = WebRTCSDK.detectRTC();
    this.setState({
      isSupportRTC,
    });
    if (!isSupportRTC) {
      return;
    }
    this.props.dispatch({
      type: 'media/createClient',
      appId: '123',
    });
    this.props.dispatch({
      type: 'media/createRoom',
    });
    this.props.dispatch({
      type: 'media/enterRoom',
      roomParams: {
        token: '123',
        userId: '123',
        roomId: '123',
      },
    });
  }

  render() {
    const { isSupportRTC } = this.state;
    if (!isSupportRTC) {
      return <p className={styles.notSupport}>Your browser does not support WebRTC</p>;
    }
    return (
      <div className={styles.roomContainer}>
        <Device />
        <div className={styles.videoContainer}>
          <LocalMedia />
          <RemoteMedia />
        </div>
      </div>
    );
  }
}

export default Room;
