import React from "react";
import FlexRow from "./FlexRow";
import Container from "./Container";
import {findKey} from "lodash";

export default class FlexLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      layout: this.props.layout,
    };
  }

  genDiv = (layout) => {
    if(layout.type !== "div") {
      throw Error("Layout's element type is not correct. Expecting div, received: " + layout.type);
    }

    return (
      <div key={layout.name} style={layout.style}>
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
      const child = this.props.children.find(child => child.props.name === layout.name)
      return (
        <Container 
          key={layout.name}
          name={layout.name}
          layout={layout}
          onRemoveItem={this.onRemoveItem}
          // onMaxItem={this.onMaxItem}
          // onMinItem={this.minItem}
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
    return this.genDiv(this.state.layout)
  }
}
