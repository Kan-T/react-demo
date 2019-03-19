import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { SecureRoute } from 'react-route-guard';
import logo from './statics/img/logo.svg';                               // Supported by CRA

// import store from './store/reducers/index';                           // For Monitoring store

import T01 from './components/ReactTableDemo/T01';
import T02 from './components/ReactTableDemo/T02';
import T03 from './components/ReactTableDemo/T03';
import T04 from './components/ReactTableDemo/T04';
import T05 from './components/ReactTableDemo/T05';
import T06 from './components/ReactTableDemo/T06';
import T07 from './components/ReactTableDemo/T07';
import T08 from './components/ReactTableDemo/T08';
import T09 from './components/ReactTableDemo/T09';
import T10 from './components/ReactTableDemo/T10';
import T11 from './components/ReactTableDemo/T11';
import T12 from './components/ReactTableDemo/T12';
import R01 from './components/ReduxDemo/R01';
import R02 from './components/ReduxDemo/R02';
import Tree01 from './components/TreeDemo/Tree01';
import HooksDemo01 from './components/NewFeature/HooksDemo01';
import HooksDemo02 from './components/NewFeature/HooksDemo02';
import RS01 from './components/Select/RS01';
import Container01 from './components/Boxes/Container01';
import Container02 from './components/Boxes/Container02';

class App extends Component {

  // componentDidMount() {                                               // For Monitoring store
  //   this.unSubscribe = store.subscribe(()=>{
  //     console.log(JSON.stringify(store.getState()));      
  //   });
  // }
  // componentWillUnmount() {
  //   this.unSubscribe();
  // }                                                                   // For Monitoring store ends

  componentDidMount() {                                               // For Monitoring store
    this.test.func();  
  }

  test = {
    func: () => {
      console.log("this in App.test.func: ",this);
    }
  }

  userRouteGuard = {
    shouldRoute: () => {
      if (this.props.showT10){              // this is pointing to App component.
        return true;
      }

      return false;
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <img src={logo} className="App-logo" alt="logo" />   {/* 1st way to import img */}
            <ul className="navbar-nav flex-grow-1 flex-wrap">
              <li className="col nav-item">
                <Link to="/T01">T01</Link>
              </li>
              <li className="col nav-item">
                <Link to="/T02">T02</Link>
              </li>
              <li className="col nav-item">
                <Link to="/T03">T03</Link>
              </li>
              <li className="col nav-item">
                <Link to="/T04">T04</Link>
              </li>
              <li className="col nav-item">
                <Link to="/T05">T05</Link>
              </li>
              <li className="col nav-item">
                <Link to="/T06">T06</Link>
              </li>
              <li className="col nav-item">
                <Link to="/T07">T07</Link>
              </li>
              <li className="col nav-item">
                <Link to="/T08">T08</Link>
              </li>
              <li className="col nav-item">
                <Link to="/T09">T09</Link>
              </li>
              <li className="col nav-item">
                <Link to="/T10">T10</Link>
              </li>
              <li className="col nav-item">
                <Link to="/T11">T11</Link>
              </li>
              <li className="col nav-item">
                <Link to="/T12">T12</Link>
              </li>
              <li className="col nav-item">
                <Link to="/R01">R01</Link>
              </li>
              <li className="col nav-item">
                <Link to="/R02">R02</Link>
              </li>
              <li className="col nav-item">
                <Link to="/Tree01">Tree01</Link>
              </li>
              <li className="col nav-item">
                <Link to="/hook01">hook01</Link>
              </li>
              <li className="col nav-item">
                <Link to="/hook02">hook02</Link>
              </li>
              <li className="col nav-item">
                <Link to="/RS01">RS01</Link>
              </li>
              <li className="col nav-item">
                <Link to="/grid">grid</Link>
              </li>
              <li className="col nav-item">
                <Link to="/golden">golden</Link>
              </li>
            </ul>
            <img src='/img/logo.svg' className="App-logo" alt="logo" />   {/* 2nd way to import img */}
          </nav>

          {/* Switch 唯一匹配 path */}
          <Switch>
            <Route path="/T01" component={T01} />
            <Route path="/T02" component={T02} />
            <Route path="/T03" component={T03} />
            <Route path="/T04" component={T04} />
            <Route path="/T05" component={T05} />
            <Route path="/T06" component={T06} />
            <Route path="/T07" component={T07} />
            <Route path="/T08" component={T08} />
            <Route path="/T09" component={T09} />
            <SecureRoute path="/T10" routeGuard={this.userRouteGuard} component={T10} redirectToPathWhenFail='/' />
            <Route path="/T11" component={T11} />
            <Route path="/T12" component={T12} />
            <Route path="/R01" render={routeProps => <R01 {...routeProps} {...this.props} />} />
            <Route path="/R02" component={R02} />
            <Route path="/Tree01" component={Tree01} />
            <Route path="/hook01" component={HooksDemo01} />
            <Route path="/hook02" component={HooksDemo02} />
            <Route path="/RS01" component={RS01} />
            <Route path="/grid" component={Container01} />
            <Route path="/golden" component={Container02} />
          </Switch>

          <div className="footer"></div>
          <div className="footer bg-secondary fixed-bottom">
            <span className="m-4">From App.js: </span>
            <span className="mx-4">NODE_ENV: {process.env.NODE_ENV}</span>
            <span className="mx-4">REACT_APP_CODE: {process.env.REACT_APP_CODE}</span>
            <span className="mx-4">REACT_APP_VERSION: {process.env.REACT_APP_VERSION}</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
