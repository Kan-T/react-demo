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
    rowHeight: 100
  };

  constructor(props) {
    super(props);
    console.log(props)

    this.state = {
      items: [0, 1, 2, 3, 4].map(function(i, key, list) {
        return {
          i: i.toString(),
          x: i * 2,
          y: 0,
          w: 2,
          h: 2,
          hasAdd: i === (list.length - 1)  //Last one is true
        };
      }),
      newCounter: 0
    };
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.hasAdd ? "+" : el.i;
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
      items: this.state.items.concat({
        i: "n" + this.state.newCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange = (breakpoint, cols) => {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange = (layout) => {
    // this.props.onLayoutChange(layout);
    this.setState({ layout: layout });
  }

  onRemoveItem(i) {
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  maxItem = (e) => {
    let i = e.currentTarget.getAttribute("idx");
    console.log(i==="3")
  }

  render() {console.log(this.props)
    return (
      <div>
        <button onClick={this.onAddItem}>Add Item</button>
        <ResponsiveReactGridLayout
          className="layout border m-3"
          compactType="horizontal"
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          rowHeight={100}
          margin={[7, 7]}
        >
          {_.map(this.state.items, el => this.createElement(el))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}