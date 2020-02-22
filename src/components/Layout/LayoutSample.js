import React, { Component } from "react";
import FlexLayout from "./components/FlexLayout";
import T01 from '../ReactTableDemo/T01';
import T02 from '../ReactTableDemo/T02';
import T03 from '../ReactTableDemo/T03';
import T04 from '../ReactTableDemo/T04';
import T05 from '../ReactTableDemo/T05';
import T06 from '../ReactTableDemo/T06';

class LayoutSample extends Component {
    constructor(props){
      super(props);
      this.state = {
        layout: {
          type: "div",
          name: "root",
          rows: [
            {
              type: "row",
              name:"1",
              components: [
                {
                  type: "component",
                  name: "T03",
                  style: {
                    flex: 0,
                    minHeight: "800px",
                    flexBasis: "400px"
                  }
                },
                {
                  type: "div",
                  name:"1.2",
                  style: {
                    flex: 1,
                    flexBasis: "400px"
                  },
                  rows: [
                    {
                      type: "row",
                      name:"1.2-1",
                      components: [
                        {
                          type: "component",
                          name: "T01",
                          style: {
                            flex: 1,
                            minHeight: "400px",
                            flexBasis: "400px"
                          }
                        }
                      ]
                    },
                    {
                      type: "row",
                      name:"1.2-2",
                      components: [
                        {
                          type: "component",
                          name: "T02",
                          style: {
                            flex: 1,
                            minHeight: "400px",
                            flexBasis: "400px"
                          }
                        },
                        {
                          type: "component",
                          name: "T04",
                          style: {
                            flex: 1,
                            minHeight: "400px",
                            flexBasis: "400px"
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  type: "component",
                  name: "T05",
                  style: {
                    flex: 0,
                    minHeight: "800px",
                    flexBasis: "300px"
                  }
                },
              ]
            },
            {
              type: "row",
              name: "2",
              components: [
                {
                  type: "component",
                  name: "T06",
                  style: {
                    flex: 1,
                    minHeight: "400px",
                    flexBasis: "300px"
                  }
                }
              ]
            }
          ]
        }
      }
    }

    log = () => {
      console.log("LayoutSample.log")
    }

    render(){
      return (
        <React.Fragment>
          {/* <div className="m-4">
            {JSON.stringify(this.state.layout)}
          </div> */}
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

export default LayoutSample;