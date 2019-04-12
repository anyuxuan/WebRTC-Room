export default {
  namespace: 'media',
  state: {
    devices: [],
    client: null,
    room: null,
  },
  effects: {
    *getDevices(_, { select, put, cps }) {
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
    *createClient({ appId }, { select, put, cps }) {
      try {
        let client = yield select(state => state.media.client);
        const sdk = yield select(state => state.global.WebRTCSDK);
        if (client || !sdk) return;
        const spec = {
          codec: 'vp8',
          mode: 'live',
        };
        client = sdk.createClient(spec);
        yield cps(client.initCore, appId);
        yield put({
          type: 'saveClient',
          client,
        });
      } catch (err) {
        console.error(err);
      }
    },
    *createRoom({ roomParams }, { select, put }) {
      try {
        let room = yield select(state => state.media.room);
        const client = yield select(state => state.media.client);
        if (room || !client) return;
        room = client.initRoom(roomParams);
        yield put({
          type: 'saveRoom',
          room,
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
    saveClient(state, { client }) {
      return {
        ...state,
        client,
      };
    },
    saveRoom(state, { room }) {
      return {
        ...state,
        room,
      };
    },
  },
};
