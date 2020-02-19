import React, { Component } from "react";
import FlexRow from "./components/FlexRow";

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
          <FlexRow>
            <div style={{background: "beige", flexGrow: 1}}></div>
          </FlexRow>
        </React.Fragment>
      )
    }
}

export default LayoutSample;