import React, { Component } from 'react';
class T10 extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="my-4">
          <span className="mx-4">NODE_ENV: {process.env.NODE_ENV}</span>
          <span className="mx-4">REACT_APP_CODE: {process.env.REACT_APP_CODE}</span>
          <span className="mx-4">REACT_APP_VERSION: {process.env.REACT_APP_VERSION}</span>
        </div>
      </React.Fragment>
    );
  }
}

export default T10;
