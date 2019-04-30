import React from 'react';
import { connect } from 'dva';
import DeviceList, { DeviceType } from '@/components/DeviceList/DeviceList';

import styles from './Device.scss';

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
      </div>
    );
  }
}

export default Device;
