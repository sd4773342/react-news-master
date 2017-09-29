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
  Modal,
  Carousel
} from 'antd';
import {Router, Route, Link, hashHistory} from 'react-router';
import MobileList from './mobile_list.js';
const TabPane = Tabs.TabPane;

export default class MobildContent extends React.Component {
  constructor() {
    super()
    this.state = {}
  };

  componentWillMount() {}

  render() {
    const settings = {
      dots: true,
      autoplay: true,
      speed: 500
    }
    return (
      <div>
        <Tabs defaultActiveKey="1" >
          <TabPane tab="头条" key="1">
            <div class="carousel">
              <Carousel {...settings}>
                <div><img src='../src/images/carousel_1.jpg'/></div>
                <div><img src='../src/images/carousel_2.jpg'/></div>
                <div><img src='../src/images/carousel_3.jpg'/></div>
                <div><img src='../src/images/carousel_4.jpg'/></div>
              </Carousel>
            </div>
            <MobileList count={22} type="top"/>
          </TabPane>
          <TabPane tab="社会" key="2">
            <MobileList count={22} type="shehui"/>
          </TabPane>
          <TabPane tab="国内" key="3">
            <MobileList count={22} type="guonei"/>
          </TabPane>
          <TabPane tab="国际" key="4">
            <MobileList count={22} type="guoji"/>
          </TabPane>
          <TabPane tab="娱乐" key="5">
            <MobileList count={22} type="yule"/>
          </TabPane>
          <TabPane tab="体育" key="6">
            <MobileList count={22} type="tiyu"/>
          </TabPane>
          <TabPane tab="时尚" key="7">
            <MobileList count={22} type="shishang"/>
          </TabPane>
        </Tabs>
      </div>
    );
  };
}
