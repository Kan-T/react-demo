import React from "react";
import _ from "lodash";
import LayoutRGL from "./LayoutRGL"

let items = [{
  i: "0",
  x: 0,
  y: 0,
  w: 2,
  h: 2,
  mini: false,
  component: (<div className="h-100 w-100" style={{backgroundColor: "gray"}}></div>)
},{
  i: "1",
  x: 2,
  y: 0,
  w: 2,
  h: 2,
  mini: false,
  component: (<div className="h-100 w-100" style={{backgroundColor: "gray"}}></div>)
},{
  i: "3",
  x: 10,
  y: 2,
  w: 2,
  h: 2,
  mini: false,
  component: (<div className="h-100 w-100" style={{backgroundColor: "gray"}}></div>)
}]

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
export default class GridDemo03 extends React.PureComponent {
  render() {
    return (
      <LayoutRGL
        // useCSSTransforms={false}
        items={items}
        className="border m-1"
        compactType="virtical"
        rowHeight={100}
        margin={[7, 7]}
      />
    );
  }
}