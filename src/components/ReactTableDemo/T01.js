import React, { Component } from 'react';
import { makeData, Logo, Tips } from "./Utils";

// Import React Table
import ReactTable from "react-table-6";

import Breadcrumb from "../HOC/Breadcrumb";

class T01 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: makeData()
    };
  }
  render() {
    console.log("T01 this.props: ",this.props)

    const { data } = this.state;
    return (
      <div>
        <Breadcrumb />
        <ReactTable
          data={data}
          noDataText="Oh Noes!"                                   // No data text
          columns={[
            {
              Header: "Name",
              columns: [
                {
                  Header: "First Name",
                  accessor: "firstName",
                  // sortMethod: (a, b) => {                       // Custom sorting
                  //   if (a.length === b.length) {
                  //     return a > b ? 1 : -1;
                  //   }
                  //   return a.length > b.length ? 1 : -1;
                  // },
                  // width: 400,                                    // Custom column width
                  // Footer: () =>                                  // Add Footer at bottom of the table
                  //   <div style={{ textAlign: "center" }}>First Name</div>,
                },
                {
                  Header: "Last Name",
                  id: "lastName",
                  accessor: d => d.lastName
                  // accessor: "lastName"
                }
              ]
            },
            {
              Header: "Info",
              columns: [
                {
                  Header: "Age",
                  accessor: "age",
                  // Footer: (                                      // Add Footer at bottom of the table
                  //   <span>
                  //     <strong>Average:</strong>{" "}
                  //     {_.round(_.mean(_.map(data, d => d.age)))}
                  //   </span>
                  // )
                },
                {
                  Header: "Status",
                  accessor: "status"
                }
              ]
            },
            {
              Header: 'Stats',
              columns: [
                {
                  Header: "Visits",
                  accessor: "visits"
                }
              ]
            }
          ]}
          // defaultSorted={[               // Default sort field
          //   {
          //     id: "age",
          //     desc: true
          //   }
          // ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
        <Tips />
        <Logo />
      </div>
    );
  }
}

export default T01;
