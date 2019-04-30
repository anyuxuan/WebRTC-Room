import { WebRTCSDK } from '@/WebRTC-SDK';
import { createAppId } from '@/services/auth';

export default {
  namespace: 'global',
  state: {
    WebRTCSDK,
    appId: '',
  },
  effects: {
    *createAppId({ projectName }, { call, put }) {
      try {
        const res = yield call(createAppId, projectName);
        const { data } = res;
        yield put({
          type: 'saveAppId',
          appId: data.appId,
        });
      } catch (err) {
        console.error(err);
      }
    },
  },
  reducers: {
    saveAppId(state, { appId }) {
      return {
        ...state,
        appId,
      };
    },
  },
};
