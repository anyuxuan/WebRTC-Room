import React from 'react';
import styles from './LocalVideo.scss';

interface LocalVideoProps {

}

class LocalVideo extends React.Component<LocalVideoProps, any> {
  _openCamera = () => {

  };

  render() {
    return (
      <div className={styles.wrapper}>
        LocalVideo
      </div>
    );
  }
}

export default LocalVideo;
