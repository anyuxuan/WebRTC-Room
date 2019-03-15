import React from 'react';
import { connect } from 'dva';
import LocalVideo from '@/pages/Video/LocalVideo';
import RemoteVideo from '@/pages/Video/RemoteVideo';
import styles from './Room.scss';

@connect(({ global }) => ({ global }))
class Room extends React.Component {
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
