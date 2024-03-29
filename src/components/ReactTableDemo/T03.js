import React, { Component } from 'react';
import { makeData, Logo, Tips } from "./Utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
// Import React Table
import ReactTable from "react-table-v6";

const data = makeData()

const makeDefaultState = () => ({
  sorted: [],
  page: 0,
  pageSize: 5,
  expanded: {},
  resized: [],
  filtered: []
});

let columns = [
      {
        Header: ( {column} ) => {
          return (
          <>
            <span>First Name</span>
            <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
          </>
        )},
        accessor: "firstName"
      },
      {
        Header: "Last Name",
        id: "lastName",
        accessor: d => d.lastName,
        width: 170
      },
      {
        Header: "Age",
        accessor: "age"
      },
    ];

class T03 extends Component {
  constructor() {
    super();
    this.state = makeDefaultState();
    this.resetState = this.resetState.bind(this);
  }

  resetState() {
    this.setState(makeDefaultState());
  }

  setHeaderConfig = () => ({
      icons: [
        {
          name: "T03-reset",
          src: "/img/logo.svg",
          style: {
            height: "12.25px",
            width: "12.25px"
          },
          onClick: "reset"
        }
      ]
    }
  )

  reset = () => {
    this.resetState()
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.resetState}>Reset State</button>
        </div>
        <pre>
          <code>
            <strong>this.state ===</strong>{" "}
            {JSON.stringify(this.state, null, 2)}
          </code>
        </pre>
        <ReactTable
          data={data}
          columns={columns}
          pivotBy={["lastName"]}
          filterable
          defaultPageSize={5}
          className="-striped -highlight"
          // Controlled props
          sorted={this.state.sorted}
          page={this.state.page}
          pageSize={this.state.pageSize}
          expanded={this.state.expanded}
          resized={this.state.resized}
          filtered={this.state.filtered}
          // Callbacks
          onSortedChange={sorted => this.setState({ sorted })}
          onPageChange={page => this.setState({ page })}
          onPageSizeChange={(pageSize, page) =>
            this.setState({ page, pageSize })}
          onExpandedChange={expanded => this.setState({ expanded })}
          onResizedChange={resized => this.setState({ resized })}
          onFilteredChange={filtered => this.setState({ filtered })}
        />
      </div>
    );
  }
}

export default T03;
