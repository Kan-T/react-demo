import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import Container from "./Container";
import MiniTabs from "./MiniTabs";
import ItemsDisplay from "./ItemsDisplay";
import styles from './Layout.module.scss';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
export default class LayoutRGL extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      layouts: this.props.layouts,
      newCounter: 0,
      isEditable: false,
      maxItemName: null,
      bk: "lg",
      cols: 12
    };
  }

  onAddItem = () => {
    // /*eslint no-console: 0*/
    // this.setState({
    //   // Add a new item. It must have a unique key!
    //   layouts: this.state.layouts.concat({
    //     i: "n" + this.state.newCounter,
    //     x: (this.state.layouts.length * 2) % (this.props.cols || 12),
    //     y: Infinity, // puts it at the bottom
    //     w: 2,
    //     h: 2,
    //     mini: false
    //   }),
    //   // Increment the counter to ensure key is always unique.
    //   newCounter: this.state.newCounter + 1
    // });

    let layouts = {...this.state.layouts}
    Object.keys(layouts).forEach(bk => {
      layouts[bk].concat({
        i: "n" + this.state.newCounter,
        x: (this.state.layouts[bk].length * 2) % (this.props.cols[bk] || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2,
        mini: false
      })
    })
    this.setState({layouts, newCounter: this.state.newCounter + 1})
  }

  onRemoveItem = (e) => {
    let i = e.currentTarget.getAttribute("name");
    let layouts = {...this.state.layouts}
    Object.keys(layouts).forEach(bk => {
      layouts[bk] = _.reject(layouts[bk], { i: i }) 
    })
    this.setState({layouts})
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange = (breakpoint, cols) => {
    this.setState({
      bk: breakpoint,
      cols: cols
    });
  }

  onLayoutChange = (layout) => {
    // this.props.onLayoutChange(layout);
    let items = [...this.state.layouts[this.state.bk]]
    layout.forEach(layoutItem => {
      let idx = items.findIndex(item => item.i === layoutItem.i)
      if(idx > -1) {
        items[idx] = {...items[idx], ...layoutItem}
      }
    })
    this.setState({ layouts: {
      ...this.state.layouts,
      [this.state.bk]: items,
    }});
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

  onMinItem = e => {
    let name = e.currentTarget.getAttribute("name");
    let items = this.state.layouts.map(el => {
      if(el.i === name) {
        return {
          ...el,
          mini: !el.mini
        }
      }
      return el
    });
    this.setState({ items: items });
  }

  getMaxItemClass = maxItemName => {
    if(this.state.maxItemName === null || this.state.maxItemName !== maxItemName) {
      return ""
    }else if(this.props.useCSSTransforms){
      return styles.maxTransforms
    }else{
      return styles.maxAbsulate
    }
  }

  format = (layouts) => {
    return layouts
  }

  miniFormat = (el, i, items) => {
    if(this.state.isEditable || !el.mini) {   //No mini in Edit mode
      return el
    }
    return {
      ...el,
      w: 0,
      h: 0
    }
  }

  reformat = (el, i, items) => {
    console.log(el)
    if(this.state.isEditable) {
      return el
    }
    return el
  }

  createElement(el, isEditable) {
    const i = el.i;
    return (
      <div className={`border ${this.getMaxItemClass(el.i)}`}
        key={i} 
        data-grid={el}
      >
        <Container
          name={i}
          onRemoveItem={this.onRemoveItem}
          onMaxItem={this.onMaxItem}
          onMinItem={this.onMinItem}
          isEditable={this.state.isEditable}
        >
          {el.component}
        </Container>
      </div>
    );
  }

  render() {
    let {useCSSTransforms, breakpoints, cols, rowHeight, margin} = this.props
    return (
      <div>
        <ItemsDisplay layouts={this.state.layouts} />
        <button onClick={this.onAddItem}>Add Item</button>
        <button onClick={this.switchDraggable}>
          {this.state.isEditable
            ? "Disable edit"
            : "Enable edit"
          }
        </button>
        <div className="position-relative">
          <ResponsiveReactGridLayout
            useCSSTransforms={useCSSTransforms}
            isDraggable={this.state.isEditable}
            isResizable={this.state.isEditable}
            className={styles.LayoutRgl}
            compactType="horizontal"
            verticalCompact={false}
            onLayoutChange={this.onLayoutChange}
            onBreakpointChange={this.onBreakpointChange}
            breakpoints={breakpoints}
            cols={cols}
            rowHeight={rowHeight}
            margin={margin}
            layouts={this.format(this.state.layouts)}
          >
            {this.state.layouts[this.state.bk]
              .map(el => this.createElement(el, this.state.isEditable))}
          </ResponsiveReactGridLayout>
          
          {/* {!this.state.isEditable &&
            <MiniTabs 
              miniItems={this.state.items.filter(el => el.mini)}
              onMinItem={this.onMinItem}
            />
          } */}
        </div>
      </div>
    );
  }
}

LayoutRGL.defaultProps = {
  items: [],
  useCSSTransforms: true,
  breakpoints: {lg: 1376, md: 986, sm: 730, xs: 675, xxs: 0},
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  rowHeight: 100,
  margin: [7, 7]
};