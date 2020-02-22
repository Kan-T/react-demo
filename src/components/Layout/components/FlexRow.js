import React, { Component } from "react";
import styles from './FlexRow.module.scss';

const fixedStyles = {
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  position: "relative",
  flexWrap: "wrap"
}

class FlexRow extends Component {

    render(){
      return (
        <div className={`${styles.flexRow} ${this.props.className||''}`} style={{...this.props.styles, ...fixedStyles}}>
          {this.props.children}
        </div>
      )
    }
}

export default FlexRow;