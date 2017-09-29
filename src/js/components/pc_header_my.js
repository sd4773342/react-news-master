import React from 'react';
var header = require("../../css/header.css");

export default class PCHeader extends React.Component {
  constructor() {
    super()
    this.state = {
      index: 0
    }
  }
  handleClick(e) {
    //console.log(e.target.dataset.index);
    this.setState({index: e.target.dataset.index});
  }
  render() {
    //console.log(header);
    return (
      <header class={header.header_css}>
        <div class="logo">
          <a href="/" class="logo">
            <img src="./src/images/news.png" alt="logo"/>
            <span>WangShengYueNews</span>
          </a>
        </div>
        <nav class={header.nav}>
          <a href="javascript:;" class={this.state.index == 0
            ? header.active
            : ''} data-index="0" onClick={this.handleClick.bind(this)}>头条</a>
          <a href="javascript:;" class={this.state.index == 1
            ? header.active
            : ''} data-index="1" onClick={this.handleClick.bind(this)}>社会</a>
          <a href="javascript:;" class={this.state.index == 2
            ? header.active
            : ''} data-index="2" onClick={this.handleClick.bind(this)}>娱乐</a>
        </nav>
      </header>
    );
  };
}
