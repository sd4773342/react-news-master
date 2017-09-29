import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter, Switch, HashRouter} from 'react-router-dom';
import PCIndex from './components/pc_index.js';
import MobileIndex from './components/mobile_index.js';
import PCNewsDetail from "./components/pc_newsDetail.js";
import MobileNewsDetail from "./components/mobile_newsDetail.js";
import PCNewsContainer from './components/pc_newsContainer.js';
import Details1 from './components/details';
import Details2 from './components/details2';
import Details3 from './components/details3';
import 'antd/dist/antd.css';
import MediaQuery from "react-responsive";

const NoMatch = ({location}) => (
  <div>
    <h3>无法匹配-查找不到此页面-404
      <code>{location.pathname}</code>
    </h3>
  </div>
)

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <MediaQuery query='(min-device-width:1224px)'>
          <HashRouter>
            <Switch>
              <Route path="/details/:uniquekey" component={PCNewsDetail}></Route>
              <PCIndex>
                <Switch>
                  <Route exact component={PCNewsContainer} path="/"></Route>
                  <Route component={Details1} path="/details"></Route>
                  <Route component={Details2} path="/details2"></Route>
                  <Route component={Details3} path="/details3"></Route>
                  <Route component={NoMatch}/>
                </Switch>
              </PCIndex>
            </Switch>
          </HashRouter>
        </MediaQuery>
        <MediaQuery query='(max-device-width:1224px)'>
          <HashRouter>
            <Switch>
              <Route exact component={MobileIndex} path="/"></Route>
              <Route path="/details/:uniquekey" component={MobileNewsDetail}></Route>
            </Switch>
          </HashRouter>
        </MediaQuery>
      </div>
    );
  };
}

ReactDOM.render(
  <Root/>, document.getElementById('mainContainer'));
