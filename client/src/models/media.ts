export default {
  namespace: 'media',
  state: {
    devices: [],
  },
  effects: {
    * getDevices(_, { select, put }) {
      try {
        const sdk = yield select(state => state.global.WebRTCSDK);
        const devices: MediaDeviceInfo[] = yield new Promise((resolve, reject) => {
          sdk.getDevices(resolve, reject);
        });
        yield put({
          type: 'saveDevices',
          devices,
        });
      } catch (err) {
        console.error(err);
      }
    },
  },
  reducers: {
    saveDevices(state, devices) {
      return {
        ...state,
        devices,
      };
    },
  },
};
