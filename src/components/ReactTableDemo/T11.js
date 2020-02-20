import React, { Component } from 'react';
import { makeData, Logo, Tips } from "./Utils";
import logo from '../../statics/img/logo.svg';                               // Supported by CRA
// Import React Table
import ReactTable from "react-table-v6";
import { advancedExpandTableHOC } from "../HOC/advancedExpandTableHOC";
import SFxFilterFilter from "./TableHoc/withSFxFilter";
import withColControl from "./TableHoc/withColControl"
const ReactTableFilter = withColControl(SFxFilterFilter(advancedExpandTableHOC(ReactTable)));

const data = makeData()

let columns = [
  {
    Header: "First Name",
    accessor: "firstName"
  },
  {
    Header: "Last Name",
    id: "lastName",
    accessor: d => d.lastName,
    minWidth: 100
  },
  {
    Header: "Age",
    accessor: "age"
  },
];

class T11 extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     page: 0
  //   }
  // }

  render() {
    return (
      <div>
        {/* <pre>
          <code onClick={()=>{this.setState({page:this.state.page+1})}}>
            <strong>this.state ===</strong>{" "}
            {JSON.stringify(this.state, null, 2)}
          </code>
          <code onClick={()=>{this.setState({page:this.state.page-1})}}>
            <strong>page -1</strong>{" "}
          </code>
        </pre> */}
        <div style={{ backgroundColor: '#1B3C44', color: '#ffffff' }}>
          <ReactTableFilter
            // page={this.state.page}
            data={data}
            columns={columns}
            className="-striped -highlight"
            SubComponent={({ row, nestingPath, toggleRowSubComponent }) => {
              return (
                <div style={{ padding: "20px" }}>
                  <img src={logo} className="App-logo" alt="logo" />   {/* 1st way to import img */}
                </div>
              );
            }}
          />
        </div>
        <br />
        <Tips />
        <Logo />
      </div>
    );
  }
}

export default T11;
