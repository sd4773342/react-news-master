import React from 'react';
import {Row, Col, BackTop} from 'antd';
import MobileHeader from './mobile_header.js';
import MobileFooter from './mobile_footer.js';
import CommonComment from "./common_comments.js";

export default class MobileNewsDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      newsItem: ""
    }
  };
  componentWillMount() {
    // console.log(this.props.match.params.uniquekey);
    var myFetchOptions = {
      method: "GET"
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
      this.setState({newsItem: json});
      document.title = this.state.newsItem.title + 'wang sheng yue 新闻驱动平台'
    });
  };
  createMarkup() {
    return {__html: this.state.newsItem.pagecontent}
  };
  render() {
    return (
      <div id="mobileDetailContainer">
        <MobileHeader></MobileHeader>
        <div class="ucmobileLst">
          <Row>
            <Col span={24} class="container">
              <div class="articleCntainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
              <CommonComment uniquekey={this.props.match.params.uniquekey}/>
            </Col>
          </Row>
          <MobileFooter></MobileFooter>
          <BackTop/>
        </div>
      </div>
    );
  };
};
