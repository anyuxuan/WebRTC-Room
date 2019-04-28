import { createToken } from '@/services/auth';

export default {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *createToken({ payload }, { call, put }) {
      try {
        const res = yield call(createToken, payload);
        console.log(res, 'res');
        yield put({
          type: 'saveUser',
          currentUser: {},
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

