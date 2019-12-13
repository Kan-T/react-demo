import React, { Component } from 'react';
import { makeData } from "./Utils";
import withTableControl from './TableHoc/withTableControl';
// Import React Table
import ReactTable from "react-table-6";
import { advancedExpandTableHOC } from "../HOC/advancedExpandTableHOC";
const ReactTableControl = withTableControl(advancedExpandTableHOC(ReactTable));

class T10 extends Component {
  constructor() {
    super();
    var data = makeData();
    this.state = {
      data: data,
      columns: [
        {
          Header: "First Name",
          accessor: "firstName",
          hidden: false
        },
        {
          Header: "Last Name",
          id: "lastName",
          hidden: false,
          accessor: d => d.lastName
        },
        {
          Header: "Age",
          accessor: "age",
          hidden: false
        },
        {
          Header: "Status",
          accessor: "status"
        },
        {
          Header: "Visits",
          accessor: "visits"
        }
      ],
      filterable : false,
    };
  }

  render() {
    const { data } = this.state;
    return (
      <div style={{ backgroundColor: '#1B3C44', color: '#ffffff' }}>
        <ReactTableControl
          data={data}
          columns={this.state.columns}
          defaultPageSize={10}
          className="-striped -highlight"
          SubComponent={({ row, nestingPath, toggleRowSubComponent }) => {
            return (
              <div style={{ padding: "20px" }}>
                <button
                  onClick={e => toggleRowSubComponent({ nestingPath }, e)}
                >
                  CLOSE SUBCOMPONENT {row.firstName} {row.lastName}
                </button>
              </div>
            );
          }}
        />
        <br />
      </div>
    );
  }
}

export default T10;
