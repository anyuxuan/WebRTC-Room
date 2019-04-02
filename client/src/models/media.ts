export default {
  namespace: 'media',
  state: {
    devices: [],
  },
  effects: {
    * getDevices(_, { select, put, call }) {
      const sdk = yield select(state => state.global.WebRTCSDK);
      yield call(sdk.getDevices, devices => console.log(devices), (err) => console.log(err));
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
