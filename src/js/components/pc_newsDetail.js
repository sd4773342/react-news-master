import React from 'react';
import {Row, Col, BackTop} from 'antd';
import PCHeader from './pc_header.js';
import PCFooter from './pc_footer.js';
import PCImageBlock from "./pc_newsImagesBlock.js";
import CommonComment from "./common_comments.js";

export default class PCNewsDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      newsItem: ""
    }
  };
  componentWillMount() {
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
      <div>
        <PCHeader></PCHeader>
        <Row>
          <Col span={2}></Col>
          <Col span={14} class="container">
            <div class="articleCntainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
            <CommonComment uniquekey={this.props.match.params.uniquekey}/>
          </Col>
          <Col span={6}>
            <PCImageBlock count={40} type="top" width="100%" cartTitle="头条新闻" imageWidth="155px"/>
          </Col>
          <Col span={2}></Col>
        </Row>
        <PCFooter></PCFooter>
        <BackTop/>
      </div>
    );
  };
};
