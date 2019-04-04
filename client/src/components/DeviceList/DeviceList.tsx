import React from 'react';
import classNames from 'classnames';
import { Select } from 'antd';

interface DeviceListProps {
  className?: string;
  deviceList?: MediaDeviceInfo[];
  placeholder?: string;
  type?: DeviceType;
  onChange: (value: SelectedValue) => void;
}

export interface SelectedValue {
  kind: string;
  deviceId: string;
}

export const enum DeviceType {
  ALL = 'ALL',
  CAMERA = 'videoinput',
  MICROPHONE = 'audioinput',
  SPEAKER = 'audiooutput'
}

const Option = Select.Option;

function getLabelName(type: DeviceType) {
  const NAME_MAP = {
    [DeviceType.ALL]: '所有设备',
    [DeviceType.CAMERA]: '摄像头设备',
    [DeviceType.MICROPHONE]: '麦克风设备',
    [DeviceType.SPEAKER]: '扬声器设备'
  };
  return NAME_MAP[type];
}

function DeviceList(props: DeviceListProps) {
  const {
    className = '',
    deviceList = [],
    placeholder = '请选择设备',
    type = DeviceType.ALL,
    onChange,
  } = props;
  const cls = classNames(className);
  return (
    <div className={cls}>
      <span>{getLabelName(type)}: </span>
      <Select
        style={{ width: 120 }}
        onChange={(value: string) => {
          const [kind, deviceId] = value.match(/(\w+)[^-](\w+)/g);
          onChange({ kind, deviceId });
        }}
        placeholder={placeholder}
      >
        {deviceList
          .filter(device => {
            if (type === DeviceType.ALL) {
              return device;
            }
            return device.kind === type;
          })
          .map(device => (
            <Option
              key={`${device.kind}-${device.deviceId}`}
            >
              {device.deviceId}
            </Option>
          ))}
      </Select>
    </div>
  );
}

export default DeviceList;
