import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
export default class AddRemoveLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout border m-3",
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 50
  };

  constructor(props) {
    super(props);

    this.state = {
      layoutLg: [
        {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
        {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
        {i: '+', x: 4, y: 0, w: 1, h: 2, hasAdd: true}
      ],
      newCounter: 0
    };
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    }
    let i = el.i
    return (
      <div className="border" 
        key={i} data-grid={el}
      >
        {el.hasAdd ? (
          <span
            className="add text border"
            onClick={this.onAddItem}
            title="You can add an item by clicking here, too."
          >
            Add +
          </span>
        ) : (
          <span className="text">{i}</span>
        )}
        <div className="border pl-1" style={removeStyle}>
          <span className="mr-1"
            idx={i}
            onClick={this.maxItem}
          >
            max
          </span>
          <span
            className="remove mr-1"
            onClick={this.onRemoveItem.bind(this, i)}
          >
            x
          </span>
        </div>
      </div>
    );
  }

  onAddItem = () => {
    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      layoutLg: this.state.layoutLg.concat({
        i: "n" + this.state.newCounter,
        x: (this.state.layoutLg.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange = (breakpoint, cols, ...rest) => {
    console.log(breakpoint, cols)
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  setLayout = e => {
    let value = e.currentTarget.value
    let layout = JSON.parse(value)
    this.onLayoutChange(layout)
  }

  onLayoutChange = (layout) => {
    // this.props.onLayoutChange(layout);
    let items = [...this.state.layoutLg]
    layout.forEach(layoutItem => {
      let idx = items.findIndex(item => item.i === layoutItem.i)
      if(idx > -1) {
        items[idx] = {...items[idx], ...layoutItem}
      }
    })
    this.setState({ layoutLg: items });
    console.log(layout,items)
  }

  onRemoveItem(i) {
    console.log("removing", i);
    this.setState({ layoutLg: _.reject(this.state.layoutLg, { i: i }) });
  }

  maxItem = (e) => {
    let i = e.currentTarget.getAttribute("idx");
    console.log(i==="3")
  }

  render() {
    return (
      <div>
        <textarea type="text" 
          className="m-4" 
          rows="12" 
          cols="150" 
          onChange={this.setLayout}
          value={JSON.stringify(this.state.layoutLg, null, "\t")}
        >
        </textarea>
        <button onClick={this.onAddItem}>Add Item</button>
        <ResponsiveReactGridLayout
          className="layout border m-3"
          // compactType="horizontal"
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          rowHeight={60}
          margin={[7, 7]}
          layouts={{lg: this.state.layoutLg}}
        >
          {_.map(this.state.layoutLg, el => this.createElement(el))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}