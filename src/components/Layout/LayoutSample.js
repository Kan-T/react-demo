import React, { Component } from "react";
import BlockRow from "./components/BlockRow";

class LayoutSample extends Component {
    constructor(props){
      super(props);
      this.state = {
        
      }
    }

    render(){
      return (
        <React.Fragment>
          <div className="m-4">
            {JSON.stringify(this.state.layout)}
          </div>
          <BlockRow>
            <div style={{background: "beige", flexGrow: 1}}></div>
          </BlockRow>
        </React.Fragment>
      )
    }
}

export default LayoutSample;