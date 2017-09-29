import React from 'react';
import {Row, Col, Tabs} from 'antd';
import {Link} from 'react-router-dom';
import Tloader from 'react-touch-loader';
//import ReactPullToRefresh from 'react-pull-to-refresh';
export default class MobileList extends React.Component {
  constructor() {
    super();
    this.state = {
      news: "",
      count: 8,
      hasMore: 0,
      initializing: 1,
      refreshedAt: Date.now(),
      autoLoadMore: 1
    }
  };

  componentWillMount() {
    var myFetchOptions = {
      method: "GET"
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.state.count, myFetchOptions).then(response => response.json()).then(json => this.setState({news: json}));
  };

  loadMore(resolve) {
    setTimeout(() => {
      var count = this.state.count;
      this.setState({
        count: count + 8,
        autoLoadMore: 1
      });

      var myFetchOptions = {
        method: 'GET'
      };
      fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.state.count, myFetchOptions).then(response => response.json()).then(json => this.setState({news: json}));

      this.setState({
        hasMore: count > 0 && count < 50
      });

      resolve();

    }, 2e3);
  };

  handleRefresh(resolve, reject) {
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=yule" +
      "&count=20",
    myFetchOptions).then(response => response.json()).then(json => {
      this.setState({news: json});
      resolve();
    });
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({hasMore: 1, initializing: 2, autoLoadMore: 1});
    }, 2e3);
  };

  render() {
    var {hasMore, initializing, refreshedAt, autoLoadMore} = this.state;
    const {news} = this.state;
    const newsList = news.length
      ? news.map((newsItem, index) => (
        <section key={index} class="m_article list-item special_section clearfix">
          <Link to={`/details/${newsItem.uniquekey}`}>
            <div className="m_article_img">
              <img src={newsItem.thumbnail_pic_s} alt={newsItem.title}/>
            </div>
            <div className="m_article_info">
              <div className="m_article_title">
                <span>{newsItem.title}</span>
              </div>
              <div className="m_article_desc clearfix">
                <div className="m_article_desc_l">
                  <span className="m_article_channel">{newsItem.realtype}</span>
                  <span className="m_article_time">{newsItem.date}</span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      ))
      : "没有加载到任何新闻"
    return (
      <div>
        <Row>
          <Col span={24}>
            <Tloader className="main" onLoadMore={this.loadMore.bind(this)} hasMore={hasMore} initializing={initializing}>
              {newsList}
            </Tloader>
          </Col>
        </Row>
      </div>
    )
  };
};
