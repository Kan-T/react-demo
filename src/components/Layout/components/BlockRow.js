import React, { Component } from "react";
import {ResizableBox} from 'react-resizable';
import styles from './BlockRow.module.scss';

const fixedStyles = {
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  position: "relative",
  height: "100%"
}

class BlockRow extends Component {
    constructor(props){
      super(props);
      this.state = {
        
      }
    }

    render(){
      return (
        <ResizableBox height={200} axis="y">
          <div className={`${styles.blockRow} ${this.props.className||''}`} style={{...this.props.styles, ...fixedStyles}}>
            {this.props.children}
          </div>
        </ResizableBox>
      )
    }
}

export default BlockRow;