import React from 'react';
import styles from './RemoteVideo.scss';

interface RemoteVideoProps {

}

class RemoteVideo extends React.Component<RemoteVideoProps, any> {
  render() {
    return (
      <div className={styles.wrapper}>
        RemoteVideo
      </div>
    );
  }
}

export default RemoteVideo;
