import React, { Component } from 'react';
import { makeData, Logo, Tips } from "./Utils";
// Import React Table
import ReactTable from "react-table";
import SFxFilterFilter from "./TableHoc/withSFxFilter";
const ReactTableFilter = SFxFilterFilter(ReactTable);

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
  render() {
    return (
      <div>
        <pre>
          <code>
            <strong>this.state ===</strong>{" "}
            {JSON.stringify(this.state, null, 2)}
          </code>
        </pre>
        <ReactTableFilter
          data={data}
          columns={columns}
          className="-striped -highlight"
        />
        <br />
        <Tips />
        <Logo />
      </div>
    );
  }
}

export default T11;
