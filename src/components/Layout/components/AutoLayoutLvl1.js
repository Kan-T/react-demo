import React from "react";
import FlexRow from "./FlexRow";
import Container from "./Container";
import {sortedUniq, reject} from "lodash";

export default class AutoLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.layout.items,
    };
  }

  onRemoveItem = (e) => {
    let name = e.currentTarget.getAttribute("name")
    let items = {...this.state.items}
    items = reject(items, { name: name })

    this.setState({items: items})
  }

  render() {
    const {children} = this.props
    const rowNumbersAll = this.state.items.map(item => item.row)
    const rowNumbers = sortedUniq(rowNumbersAll)

    return (
      <React.Fragment>
        {rowNumbers.map((rowNumber) => (
          <FlexRow key={rowNumber}>
            <RowItems
              items={this.state.items.filter(({row}) => row === rowNumber)}
              children={children}
              onRemoveItem={this.onRemoveItem}
            />
          </FlexRow>
        ))}
      </React.Fragment>
    )
  }
}

function RowItems({items, children, onRemoveItem}) {
  return items.map(item => {
    const child = children.find(child => child.props.name === item.name)
    return (
      <Container 
        key={item.name}
        name={item.name}
        style={item.style}
        onRemoveItem={onRemoveItem}
        // onMaxItem={this.onMaxItem}
        // onMinItem={this.minItem}
        // isEditable={this.state.isEditable}
      >
        {child}
      </Container>
    )
  })
}