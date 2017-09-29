import React from 'react';
import {Row, Col, Icon, Tabs, Carousel} from 'antd';
import PCNewsBlock from "./pc_newsBlock.js";
import PCImageBlock from "./pc_newsImagesBlock.js";
const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component {
  render() {
    const settings = {
      dots: true,
      autoplay: true,
      speed: 500
    }
    return (
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} class="container">
            <div class="leftContainer">
              <div class="carousel">
                <Carousel {...settings}>
                  <div><img src='./src/images/carousel_1.jpg'/></div>
                  <div><img src='./src/images/carousel_2.jpg'/></div>
                  <div><img src='./src/images/carousel_3.jpg'/></div>
                  <div><img src='./src/images/carousel_4.jpg'/></div>
                </Carousel>
              </div>
              <PCImageBlock count={6} type="guoji" width="400px" cartTitle="国际头条" imageWidth="112px"/>
            </div>
            <Tabs class="tabs_news">
              <TabPane tab='头条新闻' key="1">
                <PCNewsBlock count={22} type="top" width="100%" bordered="flase"/>
              </TabPane>
              <TabPane tab='国际新闻' key="2">
                <PCNewsBlock count={22} type="guoji" width="100%" bordered="flase"/>
              </TabPane>
            </Tabs>
            <div>
              <PCImageBlock count={10} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="145px"/>
              <PCImageBlock count={20} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="145px"/>
            </div>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    );
  };
};
