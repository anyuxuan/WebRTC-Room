import React from 'react';
import LocalVideo from '../Video/LocalVideo';
import RemoteVideo from '../Video/RemoteVideo';
import styles from './Room.scss';

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
