import React, { Component } from 'react';
import { makeData, Logo, Tips } from "./Utils";
import withTableControl from './TableHoc/withTableControl';

// Import React Table
import ReactTable from "react-table-v6";

const ReactTableControl = withTableControl(ReactTable);

class T07 extends Component {
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
          accessor: "lastName",
          hidden: false
        },
        {
          Header: "Age",
          accessor: "age",
          hidden: false
        },
        {
          Header: 'Status',
          accessor: 'status',
          maxWidth: 80,
          Cell: row => (
            <div style={{
              width: '100%',
              height: '100%',
              backgroundColor: row.value === 'relationship' ? '#ff2e00'
                : row.value === 'complicated' ? '#ffbf00'
                : '#57d500',
              transition: 'all .3s ease'
            }} />
          ),
        }
      ],
      filterable : false,
    };
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ backgroundColor: 'rgb(53, 59, 69)', color: '#ffffff' }}>
          <ReactTableControl className="-striped -highlight"
            data={this.state.data}
            columns={this.state.columns}
            defaultPageSize={10}
            filterable={this.state.filterable}
          />
        </div>
        <br />
        <Tips />
        <Logo />
      </React.Fragment>
    );
  }
}

export default T07;
