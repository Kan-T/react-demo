import React, { Component } from "react";
import T02 from '../ReactTableDemo/T02';
import T03 from '../ReactTableDemo/T03';
import T04 from '../ReactTableDemo/T04';
import GoldenLayout from 'golden-layout';
import ReactDOM from 'react-dom';
import styles from './GoldenLayoutSample.module.scss'
window.React = React;
window.ReactDOM = ReactDOM;

class GoldenLayoutSample extends Component {
  constructor(props) {
    super(props);
    this.state={
      config: {
        content: [{
            type: 'row',
            content:[
              {
                title:'T03',
                type:'react-component',
                component: 'T03',
                props: { label: 'T03' }
              },
              {
                type: 'column',
                content:[
                  {
                    title:'T02',
                    type:'react-component',
                    component: 'T02',
                    props: { label: 'T02' }
                  },
                  {
                    title:'T04',
                    type:'react-component',
                    component: 'T04',
                    props: { label: 'T04' }
                  }
                ]
              }
            ]
        }]
      }
    }
  }

  componentDidMount() {
    setTimeout(()=>{
      /* you can pass config as prop, or use a predefined one */
      const myLayout = new GoldenLayout(this.state.config, this.node);
      /* register components or bind events to your new instance here */
      myLayout.registerComponent('T02', T02);
      myLayout.registerComponent('T03', T03);
      myLayout.registerComponent('T04', T04);
      myLayout.on( 'stateChanged', () => {
        let config = myLayout.toConfig();
        this.setState({config: config});
      });
      myLayout.init();
    },0)
  }



  setNode = (node) => {
    this.node = node;
  }

  render() {
    return (
      <React.Fragment>
        {this.state.config && 
          console.log(this.state.config)
        }
        <div id="wrapper" className={styles.wrapper}>
            <ul id="menuContainer" className={styles.menuContainer}></ul>
            <div className={styles.layoutContainer} ref={this.setNode} ></div>
        </div>
      </React.Fragment>
    )
  }
}

export default GoldenLayoutSample;