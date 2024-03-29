import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { SecureRoute } from 'react-route-guard';
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
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
import GridDemo01 from './components/Boxes/GridDemo01';
import GridDemo02 from './components/Boxes/GridDemo02';
import GridDemo03 from './components/Boxes/GridDemo03';
import GoldenLayoutSample from './components/Boxes/GoldenLayoutSample';
import ReactResizeDemo from './components/Resize/ReactResizeDemo';
import LayoutSampleLvl1 from './components/Layout/LayoutSampleLvl1';
import LayoutSample from './components/Layout/LayoutSample';
import ThemeDemo01 from './components/Theme/ThemeDemo01';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen1: false,
      isOpen2: false,
      isOpen3: false,
      isOpen4: false,
      isOpen5: false
    }
  }

  // componentDidMount() {                                               // For Monitoring store
  //   this.unSubscribe = store.subscribe(()=>{
  //     console.log(JSON.stringify(store.getState()));      
  //   });
  // }
  // componentWillUnmount() {
  //   this.unSubscribe();
  // }                                                                   // For Monitoring store ends

  // componentDidMount() {                                               // For Monitoring store
  //   this.test.func();  
  // }

  // test = {
  //   func: () => {
  //     console.log("this in App.test.func: ",this);
  //   }
  // }

  userRouteGuard = {
    shouldRoute: () => {
      if (this.props.showT10){              // this is pointing to App component.
        return true;
      }

      return false;
    }
  }

  toggle = (stateName) => {
    this.setState({
      [stateName]: !this.state[stateName]
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <img src={logo} className="App-logo" alt="logo" />   {/* 1st way to import img */}
            <ul className="navbar-nav flex-grow-1 flex-wrap align-items-center">
              <Dropdown className="col nav-item text-center" isOpen={this.state.isOpen1} toggle={this.toggle.bind(this, "isOpen1")}>
                <DropdownToggle nav caret>
                  react-table-v6
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem className="col nav-item text-center">
                    <Link to="/T01">T01</Link>
                  </DropdownItem>
                  <DropdownItem className="col nav-item text-center">
                    <Link to="/T02">T02</Link>
                  </DropdownItem>
                  <DropdownItem className="col nav-item text-center">
                    <Link to="/T03">T03</Link>
                  </DropdownItem>
                  <DropdownItem className="col nav-item text-center">
                    <Link to="/T04">T04</Link>
                  </DropdownItem>
                  <DropdownItem className="col nav-item text-center">
                    <Link to="/T05">T05</Link>
                  </DropdownItem>
                  <DropdownItem className="col nav-item text-center">
                    <Link to="/T06">T06</Link>
                  </DropdownItem>
                  <DropdownItem className="col nav-item text-center">
                    <Link to="/T07">T07</Link>
                  </DropdownItem>
                  <DropdownItem className="col nav-item text-center">
                    <Link to="/T08">T08</Link>
                  </DropdownItem>
                  <DropdownItem className="col nav-item text-center">
                    <Link to="/T09">T09</Link>
                  </DropdownItem>
                  <DropdownItem className="col nav-item text-center">
                    <Link to="/T10">T10</Link>
                  </DropdownItem>
                  <DropdownItem className="col nav-item text-center">
                    <Link to="/T11">T11</Link>
                  </DropdownItem>
                  <DropdownItem className="col nav-item text-center">
                    <Link to="/T12">T12</Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Dropdown className="col nav-item text-center" isOpen={this.state.isOpen2} toggle={this.toggle.bind(this, "isOpen2")}>
                <DropdownToggle nav caret>
                  ReduxDemo
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem className="col nav-item text-center">
                    <Link to="/R01">R01</Link>
                  </DropdownItem>
                  <DropdownItem className="col nav-item text-center">
                    <Link to="/R02">R02</Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Dropdown className="col nav-item text-center" isOpen={this.state.isOpen3} toggle={this.toggle.bind(this, "isOpen3")}>
                <DropdownToggle nav caret>
                  hook
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem className="col nav-item text-center">
                    <Link to="/hook01">hook01</Link>
                  </DropdownItem>
                  <DropdownItem className="col nav-item text-center">
                    <Link to="/hook02">hook02</Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Dropdown className="col nav-item text-center" isOpen={this.state.isOpen4} toggle={this.toggle.bind(this, "isOpen4")}>
                <DropdownToggle nav caret>
                  Layout
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem className="col nav-item text-center">
                    <Link to="/GridDemo01">GridDemo01</Link>
                  </DropdownItem>
                  <DropdownItem className="col nav-item text-center">
                    <Link to="/GridDemo02">GridDemo02</Link>
                  </DropdownItem>
                  <DropdownItem className="col nav-item text-center">
                    <Link to="/GridDemo03">GridDemo03</Link>
                  </DropdownItem>
                  <DropdownItem className="col nav-item text-center">
                  <Link to="/golden">golden</Link>
                  </DropdownItem>
                  <DropdownItem className="col nav-item text-center">
                  <Link to="/LayoutSampleLvl1">LayoutSampleLvl1</Link>
                  </DropdownItem>
                  <DropdownItem className="col nav-item text-center">
                  <Link to="/LayoutSample">LayoutSample</Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Dropdown className="col nav-item text-center" isOpen={this.state.isOpen5} toggle={this.toggle.bind(this, "isOpen5")}>
                <DropdownToggle nav caret>
                  TestComponents
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem className="col nav-item text-center">
                    <Link to="/Tree01">Tree01</Link>
                  </DropdownItem>
                  <DropdownItem className="col nav-item text-center">
                    <Link to="/RS01">RS01</Link>
                  </DropdownItem>
                  <DropdownItem className="col nav-item text-center">
                    <Link to="/ReactResizeDemo">ResizeDemo</Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              
              <Dropdown className="col nav-item text-center" isOpen={this.state.isOpen6} toggle={this.toggle.bind(this, "isOpen6")}>
                <DropdownToggle nav caret>
                  Theme
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem className="col nav-item text-center">
                    <Link to="/ThemeDemo01">ThemeDemo01</Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              
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
            <Route path="/GridDemo01" component={GridDemo01} />
            <Route path="/GridDemo02" component={GridDemo02} />
            <Route path="/GridDemo03" component={GridDemo03} />
            <Route path="/golden" component={GoldenLayoutSample} />
            <Route path="/ReactResizeDemo" component={ReactResizeDemo} />
            <Route path="/LayoutSampleLvl1" component={LayoutSampleLvl1} />
            <Route path="/LayoutSample" component={LayoutSample} />
            <Route path="/ThemeDemo01" component={ThemeDemo01} />
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
