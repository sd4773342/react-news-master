import React from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Card
} from 'antd';
import {Router, Route, Link, hashHistory} from 'react-router';
const FormItem = Form.Item;
const {TextArea} = Input;

class CommonComment extends React.Component {
  constructor() {
    super()
    this.state = {
      comments: ""
    }
  };
  componentDidMount() {
    var myFetchOptions = {
      method: "GET"
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => this.setState({comments: json}));
  }

  handleSubmit(e) {
    e.preventDefault();
    var myFetchOptions = {
      method: "GET"
    }
    this.props.form.validateFields((err, values) => {
      //console.log(values);
      var _this = this;
      if (!err) {
        //console.log(values);
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=' + localStorage.userid + '&uniquekey=' + this.props.uniquekey + '&commnet=' + values.commentContent, myFetchOptions).then(response => response.json()).then(json => {
          this.componentDidMount();
        });
      }
    });
  };

  render() {
    let {getFieldDecorator} = this.props.form;
    const {comments} = this.state;
    //console.log(this.state);
    const commentsList = comments.length
      ? comments.map((comments, index) => (
        <Card key={index} title={comments.UserName} extra={<a href="#">发表于{comments.datetime}</a>}>
          <p>{comments.Comments}</p>
        </Card>
      ))
      : "没有加载到任何评论"
    return (
      <div>
        <Row>
          <Col span={24}>
            {commentsList}
            <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
              <FormItem label="发表评论">
                {getFieldDecorator('commentContent', {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: '请输入您的用户名'
                  //   }
                  // ]
                })(<TextArea placeholder="请输入您的评论"/>)}
              </FormItem>
              <Button type="primary" htmlType="submit">发表评论</Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  };
}

export default CommonComment = Form.create({})(CommonComment);
