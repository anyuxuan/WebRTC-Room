import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import styles from './Welcome.scss';

interface WelcomeState {

}

interface WelcomeFormProps extends FormComponentProps {

}

function hasErrors(fieldsError): boolean {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@connect(({ global, user }) => ({ global, user }))
class Welcome extends React.Component<any, WelcomeState> {
  componentDidMount() {
    this.props.dispatch({
      type: 'global/createAppId',
      projectName: 'WebRTC',
    });
  }

  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<WelcomeState>, snapshot?: any) {
    if (prevProps.global.appId !== this.props.global.appId) {
      this.props.dispatch({
        type: 'user/createToken',
        payload: {
          userName: 'zhangsan',
          roomId: '123',
        },
      });
    }
  }

  enter = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error('请检查信息填写是否正确');
        return;
      }
      console.log('表单:', values);
    });
  };

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;

    return (
      <div className={styles.welcome}>
        <Form onSubmit={this.enter}>
          <Form.Item
            label={'项目ID'}
          >
            {getFieldDecorator('appId', {
              rules: [{
                required: true,
                message: '',
              }],
            })(
              <Input placeholder="appId" />,
            )}
          </Form.Item>
          <Form.Item
            label={'用户名'}
          >
            {getFieldDecorator('userName', {
              rules: [{
                required: true,
                message: '请输入用户名',
              }],
            })(
              <Input placeholder="用户名" />,
            )}
          </Form.Item>
          <Form.Item
            label={'房间号'}
          >
            {getFieldDecorator('roomId', {
              rules: [{
                required: true,
                message: '请输入房间号',
              }],
            })(
              <Input placeholder="房间号" />,
            )}
          </Form.Item>
          <Form.Item>
            <Button
              htmlType={'submit'}
              type={'primary'}
              disabled={hasErrors(getFieldsError())}
            >
              进入房间
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WelcomeComponent = Form.create<WelcomeFormProps>({})(Welcome);

export default WelcomeComponent;
