import React from 'react';
import { connect } from 'dva';
import DeviceList, { DeviceType } from '@/components/DeviceList/DeviceList';
import styles from './Device.scss';
import { Button } from 'antd';

interface DeviceState {
  isCameraOpen: boolean;
  isMicrophoneOpen: boolean;
}

@connect(({ media }) => ({ media }))
class Device extends React.Component<any, DeviceState> {
  state: DeviceState = {
    isCameraOpen: false,
    isMicrophoneOpen: false
  };
  
  componentDidMount() {
    this.props.dispatch({
      type: 'media/getDevices',
    });
  }
  
  onChangeDevice = ({ kind, deviceId }) => {
    console.log(kind, deviceId);
  };
  
  openCamera = () => {
    console.log('open camera');
    this.setState({
      isCameraOpen: true
    });
  };
  
  closeCamera = () => {
    console.log('close camera');
    this.setState({
      isCameraOpen: false
    });
  };
  
  openMicrophone = () => {
    console.log('open microphone');
    this.setState({
      isMicrophoneOpen: true
    });
  };
  
  closeMicrophone = () => {
    console.log('close microphone');
    this.setState({
      isMicrophoneOpen: false
    });
  };
  
  render() {
    const { isCameraOpen, isMicrophoneOpen } = this.state;
    const { media } = this.props;
    return (
      <div className={styles.deviceContainer}>
        <div className={styles.deviceListContainer}>
          <DeviceList
            className={styles.deviceList}
            deviceList={media.devices}
            onChange={this.onChangeDevice}
            type={DeviceType.CAMERA}
          />
          <DeviceList
            className={styles.deviceList}
            deviceList={media.devices}
            onChange={this.onChangeDevice}
            type={DeviceType.MICROPHONE}
          />
        </div>
        <div className={styles.deviceControl}>
          <Button
            htmlType={'button'}
            className={styles.button}
            onClick={isCameraOpen ? this.closeCamera : this.openCamera}
          >
            {`${isCameraOpen ? '关闭' : '打开'}摄像头`}
          </Button>
          <Button
            htmlType={'button'}
            className={styles.button}
            onClick={isMicrophoneOpen ? this.closeMicrophone : this.openMicrophone}
          >
            {`${isMicrophoneOpen ? '关闭' : '打开'}麦克风`}
          </Button>
        </div>
      </div>
    );
  }
}

export default Device;
