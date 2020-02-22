import React, { Component } from "react";
import FlexLayout from "./components/FlexLayoutLvl1";
import T01 from '../ReactTableDemo/T01';
import T02 from '../ReactTableDemo/T02';
import T03 from '../ReactTableDemo/T03';
import T04 from '../ReactTableDemo/T04';
import T05 from '../ReactTableDemo/T05';
import T06 from '../ReactTableDemo/T06';

class LayoutSampleLvl1 extends Component {
    constructor(props){
      super(props);
      this.state = {
        layout: {
          items: [
            {
              name: "T01",
              row: 0,
              style: {
                flex: 1,
                minHeight: "300px",
                flexBasis: "400px"
              }
            },
            {
              name: "T02",
              row: 0,
              style: {
                flex: 1,
                minHeight: "400px",
                flexBasis: "400px"
              }
            },
            {
              name: "T03",
              row: 1,
              style: {
                flex: 1,
                minHeight: "400px",
                flexBasis: "400px"
              }
            },
            {
              name: "T04",
              row: 1,
              style: {
                flex: 1,
                minHeight: "400px",
                flexBasis: "400px"
              }
            },
          ]
        }
      }
    }

    render(){
      return (
        <React.Fragment>
          <div className="m-4">
            {JSON.stringify(this.state.layout)}
          </div>
          <FlexLayout
            layout={this.state.layout}
          >
            <T01 name="T01"/>
            <T02 name="T02"/>
            <T03 name="T03"/>
            <T04 name="T04"/>
            <T05 name="T05"/>
            <T06 name="T06"/>
          </FlexLayout>
        </React.Fragment>
      )
    }
}

export default LayoutSampleLvl1;