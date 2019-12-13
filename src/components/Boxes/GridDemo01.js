import React, { Component } from "react";
import GridLayout from 'react-grid-layout';

class GridDemo01 extends Component {
    constructor(props){
      super(props);
      this.state = {
        layout: [
          {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
          {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
          {i: 'c', x: 4, y: 0, w: 1, h: 2}
        ]
      }
    }

    setLayout = (layout) => {
      this.setState({layout: layout})
    }

    render(){
      return (
        <React.Fragment>
          <h3 className="m-4">react-grid-layout container</h3>
          <div className="m-4">
            {JSON.stringify(this.state.layout)}
          </div>
          <GridLayout className="layout border m-3" 
            layout={this.state.layout}
            onLayoutChange={this.setLayout}
            cols={12} 
            rowHeight={30} 
            width={1200}>
            <div className="border" key="a">a</div>
            <div className="border" key="b">b</div>
            <div className="border" key="c">c</div>
          </GridLayout>
        </React.Fragment>
      )
    }
}

export default GridDemo01;