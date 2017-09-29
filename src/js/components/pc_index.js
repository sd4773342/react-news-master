import React from 'react';
import {Row, Col} from 'antd';
import PCHeader from './pc_header.js';
import PCFooter from './pc_footer.js';
import PCNewsContainer from './pc_newsContainer.js';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Details1 from './details';
import Details2 from './details2';
import Details3 from './details3';

export default class PCIndex extends React.Component {
  render() {
    return (
      <div>
        <PCHeader></PCHeader>
        {this.props.children}
        {/* <PCNewsContainer></PCNewsContainer> */}
        <PCFooter></PCFooter>
      </div>
    );
  };
}
