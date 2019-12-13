import React, { Component } from 'react';
import _ from "lodash";
import { makeData, Logo, Tips } from "./Utils";
import logo from '../../statics/img/logo.svg';                               // Supported by CRA
import ReactTable from "react-table-6";
import { advancedExpandTableHOC } from "../HOC/advancedExpandTableHOC";
import SFxFilterFilter from "./TableHoc/withSFxFilter";
const ReactTableFilter = SFxFilterFilter(advancedExpandTableHOC(ReactTable));

const rawData = makeData();
// const fetchData = async () => {
//    const res = await fetch('./data/asstsData.json').then(res => {
//     console.log(res)
//   });
//   return res;
// }
// console.log(fetchData())

const singleFilter = (filter, row) => {
  if(!filter || !filter.value || filter.value.length === 0){
    return true;
  }
  return filter.value.indexOf(String(row[filter.id])) > -1
}

const requestData = (pageSize, page, sorted, filtered) => {
  return new Promise((resolve, reject) => {
    // You can retrieve your data however you want, in this case, we will just use some local data.
    let filteredData = rawData;

    // You can use the filters in your request, but you are responsible for applying them.
    if (filtered.length) {
      filteredData = filtered.reduce((filteredSoFar, curFilter) => {
        return filteredSoFar.filter(row => {
          return singleFilter(curFilter, row);
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

class T12 extends Component {
  constructor(props) {
    super(props);
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

  // componentDidMount() {
  //   fetch('/data/asstsData.json')
  //     .then(res => res)
  //     .then(data => {
  //       console.log(Promise.resolve(data))
  //       this.setState({ data: data });
  //     })
  //     .catch(err=>console.log("error: ",err));
  // }

  fetchData = (state, instance) => {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    requestData(
      state.pageSize,
      state.page,
      state.sorted,
      state.filtered
    ).then(res => {
      // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
      this.setState({
        data: res.rows,
        pages: res.pages,
        loading: false
      },()=>{console.log("state: ",state);console.log("res: ",res);});
    });
  }

  render() {
    const { data, pages, loading, columns } = this.state;
    return (
      <React.Fragment>
        <div style={{ backgroundColor: '#1B3C44', color: '#ffffff' }}>
          <ReactTableFilter
            manual // Forces table not to paginate or sort automatically, so we can handle it server-side
            loading={loading} // Display the loading overlay when we need it
            onFetchData={this.fetchData} // Request new data when things change
            data={data}
            columns={columns}
            className="-striped -highlight"
            defaultPageSize={10}
            pages={pages} // Display the total number of pages
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
      </React.Fragment>
    );
  }
}

export default T12;
