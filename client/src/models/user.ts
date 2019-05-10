import { createToken, createUserId } from '@/services/auth';

export default {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *createToken({ payload }, { select, call, put }) {
      try {
        const { userName, roomId } = payload;
        const appId = yield select(state => state.global.appId);
        const res = yield call(createToken, { ...payload, appId });
        yield put({
          type: 'saveUser',
          currentUser: {
            userName,
            roomId,
            token: res.data.token,
          },
        });
      } catch (err) {
        console.error(err);
      }
    },
    *createUserId({ userName }, { select, call, put }) {
      try {
        const currentUser = yield select(state => state.user.currentUser);
        const res = yield call(createUserId, { userName });
        yield put({
          type: 'saveUser',
          currentUser: {
            ...currentUser,
            userId: res.data.userId,
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

