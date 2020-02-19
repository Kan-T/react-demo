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

    let bp = getCurrentBp(this.props.breakpoints)
    this.state = {
      layouts: this.props.layouts,
      newCounter: 0,
      isEditable: false,
      maxItemName: null,
      miniItems: [],
      bp: bp,   // this leads bug
      cols: this.props.cols[bp]
    };
  }

  onAddItem = () => {
    let layouts = {...this.state.layouts}
    Object.keys(layouts).forEach(bp => {
      layouts[bp] = layouts[bp].concat({
        i: "n" + this.state.newCounter,
        x: (this.state.layouts[bp].length * 2) % (this.props.cols[bp] || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
      })
    })
    this.setState({layouts, newCounter: this.state.newCounter + 1})
  }

  onRemoveItem = (e) => {
    let i = e.currentTarget.getAttribute("name");
    let layouts = {...this.state.layouts}
    Object.keys(layouts).forEach(bp => {
      layouts[bp] = _.reject(layouts[bp], { i: i }) 
    })
    this.setState({layouts})
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange = (breakpoint, cols) => {
    this.setState({
      bp: breakpoint,
      cols: cols
    });
  }

  onLayoutChange = (layout) => {
    if(!this.state.isEditable) {
      return
    }

    this.props.onLayoutChange && this.props.onLayoutChange(layout);
    this.setState({ layouts: {
      ...this.state.layouts,
      [this.state.bp]: layout,
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

  minItem = e => {
    let name = e.currentTarget.getAttribute("name");
    if(!this.state.miniItems.includes(name)) {
      this.setState({ miniItems: [...this.state.miniItems, name] });
    }
  }

  unMinItem = e => {
    let name = e.currentTarget.getAttribute("name")
    let i = this.state.miniItems.findIndex(el => el === name)
    if(i > -1) {
      let items = [...this.state.miniItems]
      items.splice(i,1)
      this.setState({ miniItems: items });
    }
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

  createElement(el) {
    const i = el.i;
    const isHide = this.state.miniItems.includes(i);
    const componentObj = this.props.components.find(obj => obj.i === i);
    const component = componentObj && componentObj.component;
    return (
      <div className={`border ${this.getMaxItemClass(el.i)} ${isHide? styles.hide : ''}`}
        key={i} 
        data-grid={el}
      >
        <Container
          name={i}
          onRemoveItem={this.onRemoveItem}
          onMaxItem={this.onMaxItem}
          onMinItem={this.minItem}
          isEditable={this.state.isEditable}
        >
          {
            component || 
            (<div>Empty</div>)
          }
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
            compactType={null}
            onLayoutChange={this.onLayoutChange}
            onBreakpointChange={this.onBreakpointChange}
            breakpoints={breakpoints}
            cols={cols}
            rowHeight={rowHeight}
            margin={margin}
            layouts={this.format(this.state.layouts)}
          >
            {this.state.layouts[this.state.bp]
              .map(el => this.createElement(el, this.state.isEditable))}
          </ResponsiveReactGridLayout>

          {!this.state.isEditable &&
            <MiniTabs
              miniItems={this.state.miniItems}
              unMinItem={this.unMinItem}
            />
          }
        </div>
      </div>
    );
  }
}

function getCurrentBp(breakpoints){
  let width = document.body.clientWidth
  if(breakpoints.lg && width > breakpoints.lg){
    return "lg"
  }
  if(breakpoints.md && width > breakpoints.md){
    return "md"
  }
  if(breakpoints.sm && width > breakpoints.sm){
    return "sm"
  }
  if(breakpoints.xs && width > breakpoints.xs){
    return "xs"
  }
  if(breakpoints.xxs && width > breakpoints.xxs){
    return "xxs"
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