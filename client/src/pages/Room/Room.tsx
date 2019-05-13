import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import LocalMedia from '@/pages/Media/LocalMedia';
import RemoteMedia from '@/pages/Media/RemoteMedia';
import Device from '@/pages/Device/Device';

import styles from './Room.scss';
import { isEmpty } from '@/utils';

interface RoomState {
  isSupportRTC: boolean;
}

@connect(({ global, user }) => ({ global, user }))
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
    this.join();
  }

  join = async () => {
    const { currentUser } = this.props.user;
    const { appId } = this.props.global;
    if (!appId || isEmpty(currentUser)) {
      router.replace('/welcome');
    }
    await this.props.dispatch({
      type: 'media/createClient',
      appId,
    });
    await this.props.dispatch({
      type: 'media/createRoom',
    });
    await this.props.dispatch({
      type: 'media/enterRoom',
      roomParams: {
        token: currentUser.token,
        userId: currentUser.userId,
        roomId: currentUser.roomId,
      },
    });
  };

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
