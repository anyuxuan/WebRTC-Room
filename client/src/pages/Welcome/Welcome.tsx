import React from 'react';
import { connect } from 'dva';

import styles from './Welcome.scss';

interface WelcomeState {

}

@connect(({ user }) => ({ user }))
class Welcome extends React.Component<any, WelcomeState> {
  componentDidMount() {
    this.props.dispatch({
      type: 'user/createToken',
      payload: {
        userName: 'zhangsan',
        roomId: '123',
        appId: '123',
      },
    });
  }
  
  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<WelcomeState>, snapshot?: any) {
  }
  
  render() {
    return (
      <div className={styles.welcome}>
        Welcome
      </div>
    );
  }
}

export default Welcome;
