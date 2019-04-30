import React from 'react';

import styles from './RemoteMedia.scss';

interface RemoteMediaState {

}

class RemoteMedia extends React.Component<any, RemoteMediaState> {
  render() {
    return (
      <div className={styles.wrapper}>
        RemoteVideo
      </div>
    );
  }
}

export default RemoteMedia;
