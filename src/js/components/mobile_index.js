import React from 'react';
import {Row, Col} from 'antd';
import MobileHeader from './mobile_header.js';
import MobileFooter from './mobile_footer.js';
import MobileContent from './mobile_content.js';

export default class MobileIndex extends React.Component {
  render() {
    return (
      <div>
        <MobileHeader></MobileHeader>
        <MobileContent></MobileContent>
        <MobileFooter></MobileFooter>
      </div>
    );
  };
}
