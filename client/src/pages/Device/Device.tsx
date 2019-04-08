import React from 'react';
import { connect } from 'dva';
import DeviceList, { DeviceType } from '@/components/DeviceList/DeviceList';
import styles from './Device.scss';
import { Button } from 'antd';

interface DeviceState {
  currentCamera: CurrentDeviceStates;
  currentMicrophone: CurrentDeviceStates;
  selectedCamera: string;
  selectedMicrophone: string;
}

interface CurrentDeviceStates {
  isOpen: boolean;
  deviceId: string;
}

@connect(({ media }) => ({ media }))
class Device extends React.Component<any, DeviceState> {
  state: DeviceState = {
    currentCamera: {
      isOpen: false,
      deviceId: '',
    },
    currentMicrophone: {
      isOpen: false,
      deviceId: '',
    },
    selectedCamera: '',
    selectedMicrophone: '',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'media/getDevices',
    });
  }

  onChangeDevice = ({ kind, deviceId }) => {
    console.log(kind, deviceId);
    if (kind === DeviceType.CAMERA) {
      this.setState({ selectedCamera: deviceId });
    } else if (kind === DeviceType.MICROPHONE) {
      this.setState({ selectedMicrophone: deviceId });
    }
  };

  openCamera = () => {
    console.log('open camera');
    this.setState(({ currentCamera }) => ({
      currentCamera: {
        ...currentCamera,
        isOpen: true,
      },
    }));
  };

  closeCamera = () => {
    console.log('close camera');
    this.setState(({ currentCamera }) => ({
      currentCamera: {
        ...currentCamera,
        isOpen: false,
      },
    }));
  };

  openMicrophone = () => {
    console.log('open microphone');
    this.setState(({ currentMicrophone }) => ({
      currentMicrophone: {
        ...currentMicrophone,
        isOpen: true,
      },
    }));
  };

  closeMicrophone = () => {
    console.log('close microphone');
    this.setState(({ currentMicrophone }) => ({
      currentMicrophone: {
        ...currentMicrophone,
        isOpen: false,
      },
    }));
  };

  render() {
    const { currentCamera, currentMicrophone } = this.state;
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
            onClick={currentCamera.isOpen ? this.closeCamera : this.openCamera}
          >
            {`${currentCamera.isOpen ? '关闭' : '打开'}摄像头`}
          </Button>
          <Button
            htmlType={'button'}
            className={styles.button}
            onClick={currentMicrophone.isOpen ? this.closeMicrophone : this.openMicrophone}
          >
            {`${currentMicrophone.isOpen ? '关闭' : '打开'}麦克风`}
          </Button>
        </div>
      </div>
    );
  }
}

export default Device;
