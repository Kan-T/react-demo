import React, { Component } from "react";

const fixedStyles = {
  flex: 1,
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  flexWrap: "wrap"
}

class FlexRow extends Component {

    render(){
      return (
        <div className={`autoLayoutRow ${this.props.className||''}`} style={{...this.props.styles, ...fixedStyles}}>
          {this.props.children}
        </div>
      )
    }
}

export default FlexRow;