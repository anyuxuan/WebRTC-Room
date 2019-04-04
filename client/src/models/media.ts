export default {
  namespace: 'media',
  state: {
    devices: [],
  },
  effects: {
    * getDevices(_, { select, put, cps }) {
      try {
        const sdk = yield select(state => state.global.WebRTCSDK);
        const devices = yield cps(sdk.getDevices);
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
    saveDevices(state, { devices }) {
      return {
        ...state,
        devices,
      };
    },
  },
};
