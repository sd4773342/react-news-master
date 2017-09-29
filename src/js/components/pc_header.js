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
import {Link} from 'react-router-dom';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

class PCHeader extends React.Component {
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

  componentWillMount() {
    if (localStorage.userid != undefined && localStorage.userid !='') {
      this.setState({haslogined: true});
      this.setState({userNickname: localStorage.nickUserName, userid: localStorage.userid});
    }
  }

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
      console.log(values);
      var _this = this;
      if (!err) {
        console.log(values);
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=' + this.state.action + '&username=' + values.userName + '&password=' + values.password + '&r_userName=' + values.r_userName + '&r_password=' + values.r_password + '&r_confirmPassword=' + values.r_confirmPassword, myFetchOptions).then(response => response.json()).then(json => {
          console.log(json);
          this.setState({userNickname: json.NickUserName, userid: json.UserId});
          localStorage.userid = json.UserId;
          localStorage.nickUserName = json.NickUserName;
        });
        if (this.state.action == "login") {
          this.setState({haslogined: true});
        }
        message.success("请求成功");
        _this.setModalVisible(false);
      }
    });
  };

  callback(key) {
    if (key == 1) {
      this.setState({action: 'login'})
    } else if (key == 2) {
      this.setState({action: 'register'})
    }
  };
  loginout() {
    localStorage.userid = '';
    localStorage.nickUserName = '';
    if (this.state.action == "login") {
      this.setState({haslogined: false});
    }
  }

  render() {
    let {getFieldDecorator} = this.props.form;
    console.log(this.state.haslogined);
    const userShow = this.state.haslogined
      ? <Menu.Item key="logout" class="register">
          <Button type="primary" htmlType="button">{this.state.userNickname}</Button>
          &nbsp;&nbsp;&nbsp;&nbsp; {/* <Link target="_blank" to={``}> */}
          <Button type="dashed" htmlType="button">个人中心</Button>
          {/* </Link> */}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="ghost" htmlType="button" onClick={this.loginout.bind(this)}>退出</Button>
        </Menu.Item>
      : <Menu.Item key="register" class="register">
        <Icon type="appstore"/>注册/登录
      </Menu.Item>;
    return (
      <header>
        <Row>
          <Col span={2}></Col>
          <Col span={4}>
            <a href="/" class="logo">
              <img src="/src/images/news.png" alt="logo"/>
              <span>SaintNews</span>
            </a>
          </Col>
          <Col span={16}>
            <Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
              <Menu.Item key="top">
                <Link to="/"><Icon type="appstore"/>头条</Link>
              </Menu.Item>
              <Menu.Item key="shehui">
                <Link to="/details"><Icon type="appstore"/>社会</Link>
              </Menu.Item>
              <Menu.Item key="guonei">
                <Link to="/details2"><Icon type="appstore"/>国内</Link>
              </Menu.Item>
              <Menu.Item key="guoji">
                <Link to="/details3"><Icon type="appstore"/>国际</Link>
              </Menu.Item>
              <Menu.Item key="yule"><Icon type="appstore"/>娱乐</Menu.Item>
              <Menu.Item key="tiyu"><Icon type="appstore"/>体育</Menu.Item>
              <Menu.Item key="shishang"><Icon type="appstore"/>时尚</Menu.Item>
              {userShow}
            </Menu>

            <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisibile} onCancel={() => this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText="关闭">
              <Tabs type="card" onChange={this.callback.bind(this)} defaultActiveKey="1" animated="true">

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
          </Col>
          <Col span={2}></Col>
        </Row>
      </header>

    );
  };
}

export default PCHeader = Form.create({})(PCHeader);
