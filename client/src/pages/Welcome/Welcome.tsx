import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, message, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import router from 'umi/router';

import styles from './Welcome.scss';

interface WelcomeState {
}

interface WelcomeFormProps extends FormComponentProps {

}

function hasErrors(fieldsError): boolean {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@connect(({ global, user }) => ({ global, user }))
class Welcome extends React.PureComponent<any, WelcomeState> {
  enter = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        message.error('请检查信息是否填写正确');
        return;
      }
      const { userName, roomId } = values;
      await this.props.dispatch({
        type: 'user/createToken',
        payload: {
          userName,
          roomId,
        },
      });
      await this.props.dispatch({
        type: 'user/createUserId',
        userName,
      });
      router.push({
        pathname: '/room',
      });
    });
  };

  generateAppId = async () => {
    const projectName = this.props.form.getFieldValue('projectName');
    if (!projectName) {
      message.error('项目名称不能为空');
      return;
    }
    await this.props.dispatch({
      type: 'global/createAppId',
      projectName,
    });
    const { appId } = this.props.global;
    this.props.form.setFieldsValue({
      appId,
    });
  };

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;

    return (
      <div className={styles.welcome}>
        <Row>
          <Col span={8} offset={8}>
            <Form onSubmit={this.enter}>
              <Form.Item label={'项目名称'}>
                <Row gutter={24}>
                  <Col span={18}>
                    {getFieldDecorator('projectName')(
                      <Input placeholder={'项目名称'} />,
                    )}
                  </Col>
                  <Col span={6} className={styles.generateBtn}>
                    <Button
                      htmlType={'button'}
                      type={'primary'}
                      onClick={this.generateAppId}
                    >
                      生成项目Id
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item label={'项目Id'}>
                {getFieldDecorator('appId', {
                  rules: [{
                    required: true,
                    message: '请输入项目Id',
                  }],
                })(
                  <Input placeholder={'项目Id'} />,
                )}
              </Form.Item>
              <Form.Item label={'用户名'}>
                {getFieldDecorator('userName', {
                  rules: [{
                    required: true,
                    message: '请输入用户名',
                  }],
                })(
                  <Input placeholder="用户名" />,
                )}
              </Form.Item>
              <Form.Item label={'房间号'}>
                {getFieldDecorator('roomId', {
                  rules: [{
                    required: true,
                    message: '请输入房间号',
                  }],
                })(
                  <Input placeholder="房间号" />,
                )}
              </Form.Item>
              <Form.Item className={styles.submitItem}>
                <Button
                  htmlType={'submit'}
                  type={'primary'}
                  disabled={hasErrors(getFieldsError())}
                >
                  进入房间
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

const WelcomeComponent = Form.create<WelcomeFormProps>({})(Welcome);

export default WelcomeComponent;
