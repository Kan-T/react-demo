import React, { Component } from 'react';
import _ from "lodash";
import { makeData, Logo, Tips } from "./Utils";
import withTableControl from './TableHoc/withTableControl';

// Import React Table
import ReactTable from "react-table-6";

const ReactTableControl = withTableControl(ReactTable);

const rawData = makeData();

const requestData = (pageSize, page, sorted, filtered) => {
  return new Promise((resolve, reject) => {
    // You can retrieve your data however you want, in this case, we will just use some local data.
    let filteredData = rawData;

    // You can use the filters in your request, but you are responsible for applying them.
    if (filtered.length) {
      filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
        return filteredSoFar.filter(row => {
          return (row[nextFilter.id] + "").includes(nextFilter.value);
        });
      }, filteredData);
    }
    // You can also use the sorting in your request, but again, you are responsible for applying it.
    const sortedData = _.orderBy(
      filteredData,
      sorted.map(sort => {
        return row => {
          if (row[sort.id] === null || row[sort.id] === undefined) {
            return -Infinity;
          }
          return typeof row[sort.id] === "string"
            ? row[sort.id].toLowerCase()
            : row[sort.id];
        };
      }),
      sorted.map(d => (d.desc ? "desc" : "asc"))
    );

    // You must return an object containing the rows of the current page, and optionally the total pages number.
    const res = {
      rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
      pages: Math.ceil(filteredData.length / pageSize)
    };

    // Here we'll simulate a server response with 500ms of delay.
    setTimeout(() => resolve(res), 500);
  });
};

class T09 extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
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
      filterable : true,
      pages: null,
      loading: true
    };
  }

  fetchData = (state, instance) => {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    console.log('state: ',state)
    requestData(
      state.pageSize,
      state.page,
      state.sorted,
      state.filtered
    ).then(res => {
      // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
      console.log('fetchData, res: ',res)
      this.setState({
        data: res.rows,
        pages: res.pages,
        loading: false
      });
    });
  }

  render() {
    const { data, pages, loading, columns, filterable } = this.state;
    return (
      <React.Fragment>
        <div style={{ backgroundColor: 'rgb(53, 59, 69)', color: '#ffffff' }}>
          <ReactTableControl className="-striped -highlight"
            manual // Forces table not to paginate or sort automatically, so we can handle it server-side
            data={data}
            columns={columns}
            pages={pages} // Display the total number of pages
            loading={loading} // Display the loading overlay when we need it
            onFetchData={this.fetchData} // Request new data when things change
            defaultPageSize={10}
            filterable={filterable}
          />
        </div>
        <br />
        <Tips />
        <Logo />
      </React.Fragment>
    );
  }
}

export default T09;
