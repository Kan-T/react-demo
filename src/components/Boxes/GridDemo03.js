import React from "react";
import _ from "lodash";
import LayoutRGL from "./LayoutRGL"

let layouts = {
  lg: [{
      i: "0",
      x: 0,
      y: 0,
      w: 2,
      h: 2
    },{
      i: "1",
      x: 2,
      y: 0,
      w: 6,
      h: 2
    },{
      i: "3",
      x: 0,
      y: 2,
      w: 12,
      h: 2
    },],
    md: [{
      i: "0", x: 0, y: 0, w: 2, h: 2
    },{
      i: "1", x: 2, y: 0, w: 6, h: 2
    },{
      i: "3", x: 0, y: 2, w: 10, h: 2
    },],
    sm: [{
      i: "0", x: 0, y: 0, w: 2, h: 2
    },{
      i: "1", x: 0, y: 2, w: 6, h: 2
    },{
      i: "3", x: 0, y: 4, w: 6, h: 2
    },],
    xs: [{
      i: "0", x: 0, y: 0, w: 2, h: 2
    },{
      i: "1", x: 0, y: 2, w: 4, h: 2
    },{
      i: "3", x: 0, y: 4, w: 4, h: 2
    },],
    xxs: [{
      i: "0", x: 0, y: 0, w: 2, h: 2
    },{
      i: "1", x: 0, y: 2, w: 2, h: 2
    },{
      i: "3", x: 0, y: 4, w: 2, h: 2
    },]
}

const components = [
  {
    i: "0",
    component: (<div className="h-100 w-100" style={{backgroundColor: "gray"}}></div>)
  },{
    i: "1",
    component: (<div className="h-100 w-100" style={{backgroundColor: "gray"}}></div>)
  },{
    i: "3",
    component: (<div className="h-100 w-100" style={{backgroundColor: "gray"}}></div>)
  },
]

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
export default class GridDemo03 extends React.PureComponent {
  render() {
    return (
      <LayoutRGL
        // useCSSTransforms={false}
        layouts={layouts}
        className="border m-1"
        compactType="virtical"
        rowHeight={100}
        margin={[7, 7]}
        components={components}
      />
    );
  }
}