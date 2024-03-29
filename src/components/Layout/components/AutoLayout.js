import React from "react";
import FlexRow from "./FlexRow";
import Container from "./Container";
import {findKey} from "lodash";
import "../styles/AutoLayoutStyle.scss"

export default class AutoLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      layout: this.props.layout,
    };

    this.children = React.Children.toArray(this.props.children)
  }

  genDiv = (layout) => {
    if(layout.type !== "div") {
      throw Error("Layout's element type is not correct. Expecting div, received: " + layout.type);
    }

    return (
      <div key={layout.name} className="autoLayoutDiv" style={layout.style}>
        {Array.isArray(layout.rows) && layout.rows.map(this.genRow)}
      </div>
    )
  }

  genRow = (layout) => {
    if(layout.type !== "row") {
      throw Error("Layout's element type is not correct. Expecting row, received: " + layout.type);
    }

    return (
      <FlexRow key={layout.name}>
        {Array.isArray(layout.components) && layout.components.map(this.genComponent)}
      </FlexRow>
    )
  }

  genComponent = (layout) => {
    if(layout.type === "div") {
      return this.genDiv(layout)
    }

    if(layout.type === "component") {
      const child = this.children.find(child => child.props.name === layout.name)
      return (
        <Container 
          key={layout.name}
          name={layout.name}
          layout={layout}
          onRemoveItem={this.onRemoveItem}
          // isEditable={this.state.isEditable}
        >
          {child}
        </Container>
      )

    } else {
      throw Error("Layout's element type is not correct. Expecting div or component, received: " + layout.type);
    }

  }

  onRemoveItem = (e) => {
    let name = e.currentTarget.getAttribute("name")
    let layout = {...this.state.layout}
    console.log(layout, name, findKey(layout, {name: name}))
  }

  render() {
    return (
      <div className={`autoLayoutContainer ${this.props.className}`}>
        {this.genDiv(this.state.layout)}
      </div>
    )
  }
}
