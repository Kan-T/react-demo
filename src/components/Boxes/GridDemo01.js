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

    onLayoutChange = (layout) => {console.log(layout)
      this.setState({layout: layout})
    }

    setLayout = e => {
      let value = e.currentTarget.value
      let layout = JSON.parse(value)
      this.setState({layout: layout})
    }

    render(){
      return (
        <React.Fragment>
          <h3 className="m-4">react-grid-layout GridDemo01</h3>

          <GridLayout 
            className="layout" 
            layout={this.state.layout}
            onLayoutChange={this.onLayoutChange}
            cols={12} 
            rowHeight={30} 
            width={1200}
            compactType="horizontal"   //('vertical' | 'horizontal')
            margin={[7, 7]}
            // isDraggable={false}
            // isResizable={false}
            // preventCollision={true}
            // isDroppable={true}
          >
            <div className="border" key="a">a</div>
            <div className="border" key="b">b</div>
            <div className="border" key="c">c</div>
          </GridLayout>

          <textarea type="text" 
            className="m-4" 
            rows="20" 
            cols="150" 
            onChange={this.setLayout}
            value={JSON.stringify(this.state.layout, null, "\t")}
          >
          </textarea>

          <GridLayout className="layout border m-3" cols={12} rowHeight={30} width={1200}>
            <div key="a" className="border" data-grid={{x: 0, y: 0, w: 1, h: 2, static: true}}>a</div>
            <div key="b" className="border" data-grid={{x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4}}>b</div>
            <div key="c" className="border" data-grid={{x: 4, y: 0, w: 8, h: 2}}>c</div>
          </GridLayout>

        </React.Fragment>
      )
    }
}

export default GridDemo01;