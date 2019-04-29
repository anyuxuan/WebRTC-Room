import { createToken } from '@/services/auth';

export default {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *createToken({ payload }, { call, put }) {
      try {
        const { userName, roomId, appId } = payload;
        const res = yield call(createToken, payload);
        yield put({
          type: 'saveUser',
          currentUser: {
            userName,
            roomId,
            appId,
            token: res.data.token,
          },
        });
      } catch (err) {
        console.error(err);
      }
    },
  },
  reducers: {
    saveUser(state, { currentUser }) {
      return {
        ...state,
        currentUser,
      };
    },
  },
};

