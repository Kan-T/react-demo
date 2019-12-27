import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import Container from "./Container"
import styles from './Layout.module.scss';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
export default class GridDemo03 extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items,
      newCounter: 0,
      isEditable: false,
      maxItemName: null
    };
  }

  onAddItem = () => {
    /*eslint no-console: 0*/
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

  onRemoveItem = (e) => {
    let i = e.currentTarget.getAttribute("name");
    this.setState({ items: _.reject(this.state.items, { i: i }) });
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
  
  switchDraggable = () => {
    this.setState({
      isEditable: !this.state.isEditable
    })
  }

  onMaxItem = e => {
    if(this.state.maxItemName) {
      this.setState({maxItemName: null})
    } else {
      let name = e.currentTarget.getAttribute("name");
      this.setState({maxItemName: name})
    }
  }

  createElement(el) {
    const i = el.i;
    return (
      <div className={`border ${this.state.maxItemName === i ? styles.maxAbsulate : ""}`}
        key={i} 
        data-grid={el}
      >
        <Container
          name={i}
          onRemoveItem={this.onRemoveItem}
          onMaxItem={this.onMaxItem}
          isEditable={this.state.isEditable}
        >
          <div className="flex-grow-1" style={{backgroundColor: "gray"}}></div>
        </Container>
      </div>
    );
  }

  render() {
    return (
      <div>
        <button onClick={this.onAddItem}>Add Item</button>
        <button onClick={this.switchDraggable}>
          {this.state.isEditable
            ? "Disable edit"
            : "Enable edit"
          }
        </button>
        <div className="position-relative">
          <ResponsiveReactGridLayout
            useCSSTransforms={false}
            isDraggable={this.state.isEditable}
            isResizable={this.state.isEditable}
            className="border m-1"
            compactType="horizontal"
            onLayoutChange={this.onLayoutChange}
            onBreakpointChange={this.onBreakpointChange}
            rowHeight={100}
            margin={[7, 7]}
          >
            {this.state.items.map(el => this.createElement(el))}
          </ResponsiveReactGridLayout>
        </div>
      </div>
    );
  }
}

GridDemo03.defaultProps = {
  items: [],
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  rowHeight: 100
};