import React, { Component } from "react";
import AutoLayout from "./components/AutoLayout";
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
                  },
                  icons: [
                    {
                      name: "T03-reset",
                      src: "/img/logo.svg",
                      style: {
                        height: "12.25px",
                        width: "12.25px"
                      },
                      onClick: "reset"
                    },
                    "min",
                    "max"
                  ]
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
                          },
                          icons: [
                            "min",
                            "max"
                          ]
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
                          },
                          icons: [
                            "min",
                            "max"
                          ]
                        },
                        {
                          type: "component",
                          name: "T04",
                          style: {
                            flex: 1,
                            minHeight: "400px",
                            flexBasis: "400px"
                          },
                          icons: [
                            "min",
                            "max"
                          ]
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
                  },
                  icons: [
                    "min",
                    "max"
                  ]
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
                  },
                  icons: [
                    "min",
                    "max"
                  ]
                }
              ]
            }
          ]
        }
      }
    }

    render(){
      return (
        <React.Fragment>
          <AutoLayout
            layout={this.state.layout}
            className="default"
          >
            <T01 name="T01"/>
            <T02 name="T02"/>
            <T03 name="T03"/>
            <T04 name="T04"/>
            <T05 name="T05"/>
            <T06 name="T06"/>
          </AutoLayout>
        </React.Fragment>
      )
    }
}

export default LayoutSample;