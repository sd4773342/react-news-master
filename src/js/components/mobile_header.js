import React from 'react';
import {
  Row,
  Col,
  Menu,
  Icon,
  Tabs,
  message,
  Form,
  Input,
  Button,
  CheckBox,
  Modal
} from 'antd';
import {Router, Route, Link, hashHistory} from 'react-router';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

class MobileHeader extends React.Component {
  constructor() {
    super()
    this.state = {
      current: 'top',
      modalVisibile: false,
      action: 'login',
      haslogined: false,
      userNickname: '默认昵称',
      userid: 0
    }
  };
  setModalVisible(value) {
    this.setState({modalVisibile: value});
  };

  handleClick(e) {
    if (e.key == "register") {
      this.setState({current: 'register'});
      this.setState({modalVisibile: true});
    } else {
      this.setState({current: e.key});
    }
  };
  handleSubmit(e) {
    //页面开始像API提交数据
    e.preventDefault();
    var myFetchOptions = {
      method: "GET"
    }
    this.props.form.validateFields((err, values) => {
      var _this = this;
      if (!err) {
        //console.log(values);
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=' + this.state.action + '&username=' + values.userName + '&password=' + values.password + '&r_userName=' + values.r_userName + '&r_password=' + values.r_password + '&r_confirmPassword=' + values.r_confirmPassword, myFetchOptions).then(response => response.json()).then(json => {
          console.log(json);
          this.setState({userNickname: json.NickUserName, userid: json.UserId});
        });
        if (this.state.action == "login") {
          this.setState({haslogined: true});
        }
        message.success("请求成功");
        _this.setModalVisible(false);
      }
    });
  };
  login(e) {
    this.setModalVisible(true);
  };
  callback(key) {
    if (key == 1) {
      this.setState({action: 'login'})
    } else if (key == 2) {
      this.setState({action: 'register'})
    }
  };
  render() {
    let {getFieldDecorator} = this.props.form;
    const userShow = this.state.haslogined
      ? <Link><Icon type="inbox"/></Link>
      : <Icon type="setting" onClick={this.login.bind(this)}/>
    return (
      <div id="mobileheader">
        <header>
          <img src="../src/images/news.png" alt="logo"/>
          <span>SaintNews</span>
          {userShow}
        </header>

        <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisibile} onCancel={() => this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText="关闭">
          <Tabs type="card"  onChange={this.callback.bind(this)}>
            <TabPane tab="登录" key="1">
              <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="账户">
                  {getFieldDecorator('userName', {
                    // rules: [
                    //   {
                    //     required: true,
                    //     message: '请输入您的用户名'
                    //   }
                    // ]
                  })(<Input placeholder="请输入用户名"/>)}
                </FormItem>
                <FormItem label="密码">
                  {getFieldDecorator('password', {
                    // rules: [
                    //   {
                    //     required: true,
                    //     message: '请输入您的密码'
                    //   }
                    // ]
                  })(<Input type="password" placeholder="请输入您的密码"/>)}
                </FormItem>
                <Button type="primary" htmlType="submit">登录</Button>
              </Form>
            </TabPane>

            <TabPane tab="注册" key="2">
              <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="账户">
                  {getFieldDecorator('r_userName', {
                    // rules: [
                    //   {
                    //     required: true,
                    //     message: '请输入您的用户名'
                    //   }
                    // ]
                  })(<Input placeholder="请输入用户名"/>)}
                </FormItem>
                <FormItem label="密码">
                  {getFieldDecorator('r_password', {
                    // rules: [
                    //   {
                    //     required: true,
                    //     message: '请输入您的密码'
                    //   }
                    // ]
                  })(<Input type="password" placeholder="请输入您的密码"/>)}
                </FormItem>
                <FormItem label="确认密码">
                  {getFieldDecorator('r_confirmPassword', {
                    // rules: [
                    //   {
                    //     required: true,
                    //     message: '请再次输入您的密码'
                    //   }
                    // ]
                  })(<Input type="password" placeholder="请再次输入您的密码"/>)}
                </FormItem>
                <Button type="primary" htmlType="submit">注册</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    )
  }
}
export default MobileHeader = Form.create({})(MobileHeader);
