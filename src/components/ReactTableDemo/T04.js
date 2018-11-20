import React, { Component } from 'react';
import { makeData, Logo, Tips } from "./Utils";
import cols from "./T04_config";
import Columns from './Columns';

// Import React Table
import ReactTable from "react-table";

// const data = makeData();
// let keys = Object.keys(data[0]);
// keys.pop();                                 // Removing the children field in mockup data.
// let columns = keys.map(key => {return {Header: key, accessor: key}});

class T04 extends Component {
  constructor() {
    super();
    var data = makeData();
    this.state = {
      data: data,
      columns: cols || genCols(data[0]),
      filterable : false,
    };
  }
  colChange = (idx, e)=>{
    var value = e.target.checked;

    this.setState((state) => {
      state.columns[idx].checked = value;
      return state;
    })
  }
  configChange = (e)=>{
    var value = e.target.checked;
    var name = e.target.name;
    this.setState({
      [name] : value
    });
  }

  render() {
    return (
      <React.Fragment>
        <Columns columns={this.state.columns} 
                defaultPageSize={this.state.filterable}
                colChange={this.colChange}
                configChange={this.configChange}>
        </Columns>
        <div style={{ backgroundColor: 'rgb(53, 59, 69)', color: '#ffffff' }}>
          <ReactTable className="-striped -highlight"
            data={this.state.data}
            columns={this.state.columns.filter(col => col.checked)}
            defaultPageSize={10}
            filterable={this.state.filterable}
            // pivotBy={["lastName"]}
            // sorted={this.state.sorted}                                   // Controlled props
            // page={this.state.page}
            // pageSize={this.state.pageSize}
            // expanded={this.state.expanded}
            // resized={this.state.resized}
            // filtered={this.state.filtered}
            // onSortedChange={sorted => this.setState({ sorted })}          // Callbacks
            // onPageChange={page => this.setState({ page })}
            // onPageSizeChange={(pageSize, page) =>
            //   this.setState({ page, pageSize })}
            // onExpandedChange={expanded => this.setState({ expanded })}
            // onResizedChange={resized => this.setState({ resized })}
            // onFilteredChange={filtered => this.setState({ filtered })}
          />
        </div>
        <br />
        <Tips />
        <Logo />
      </React.Fragment>
    );
  }
}

function genCols(item){
  var keys = Object.keys(item);
  keys = keys.filter(key => Object.prototype.toString.call(item[key]) !== '[object Array]')
  var cols =  keys.map(key => {
    return {
      Header: key,
      accessor: key,
      checked: true
    }
  })
  return cols;
}

export default T04;
