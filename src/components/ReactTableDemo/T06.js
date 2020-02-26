import React, { Component } from 'react';
import { makeData, Logo, Tips } from "./Utils";
import Columns from './Columns';

// Import React Table
import ReactTable from "react-table-v6";
import checkboxHOC from "react-table-v6/lib/hoc/selectTable";

const CheckboxTable = checkboxHOC(ReactTable);

function getData(d) {
  const data = d.map(item => {
    // using chancejs to generate guid
    // shortid is probably better but seems to have performance issues
    // on codesandbox.io
    const _id = item.firstName + ' ' + item.lastName;
    return {
      _id,
      ...item
    };
  });
  return data;
}

function getColumns(data) {
  const columns = [];
  const sample = data[0];
  Object.keys(sample).forEach(key => {
    if (key !== "children" && key !== "_id") {
      columns.push({
        accessor: key,
        Header: key,
        checked: true
      });
    }
  });
  return columns;
}

class T06 extends Component {
  constructor() {
    super();
    var data = getData(makeData());
    this.state = {
      data: data,
      columns: getColumns(data),
      filterable : false,
      selection: [],
      selectAll: false
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

  toggleSelection = (key, shift, row) => {
    /*
      Implementation of how to manage the selection state is up to the developer.
      This implementation uses an array stored in the component state.
      Other implementations could use object keys, a Javascript Set, or Redux... etc.
    */
    // start off with the existing state
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);
    // check to see if the key exists
    if (keyIndex >= 0) {
      // it does exist so we will remove it using destructing
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
    } else {
      // it does not exist so add it
      selection.push(key);
    }
    // update the state
    this.setState({ selection });
  };

  toggleAll = () => {
    /*
      'toggleAll' is a tricky concept with any filterable table
      do you just select ALL the records that are in your data?
      OR
      do you only select ALL the records that are in the current filtered data?
      
      The latter makes more sense because 'selection' is a visual thing for the user.
      This is especially true if you are going to implement a set of external functions
      that act on the selected information (you would not want to DELETE the wrong thing!).
      
      So, to that end, access to the internals of ReactTable are required to get what is
      currently visible in the table (either on the current page or any other page).
      
      The HOC provides a method call 'getWrappedInstance' to get a ref to the wrapped
      ReactTable and then get the internal state and the 'sortedData'. 
      That can then be iterrated to get all the currently visible records and set
      the selection state.
    */
    const selectAll = this.state.selectAll ? false : true;
    const selection = [];
    if (selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // we just push all the IDs onto the selection array
      currentRecords.forEach(item => {
        selection.push(item._original._id);
      });
    }
    this.setState({ selectAll, selection });
  };

  isSelected = key => {
    /*
      Instead of passing our external selection state we provide an 'isSelected'
      callback and detect the selection state ourselves. This allows any implementation
      for selection (either an array, object keys, or even a Javascript Set object).
    */
    return this.state.selection.includes(key);
  };

  logSelection = () => {
    console.log("selection:", this.state.selection);
  };

  render() {
    const { toggleSelection, toggleAll, isSelected, logSelection } = this;
    const { data, columns, selectAll } = this.state;

    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: "checkbox"
    };

    return (
      <div>
        <Columns columns={this.state.columns} 
          defaultPageSize={this.state.filterable}
          colChange={this.colChange}
          configChange={this.configChange}
        />
        <button onClick={logSelection}>Log Selection</button>
        <div style={{ backgroundColor: 'rgb(53, 59, 69)', color: '#ffffff' }}>
          <CheckboxTable
            ref={r => (this.checkboxTable = r)}
            data={data}
            defaultPageSize={5}
            className="-striped -highlight"
            columns={this.state.columns.filter(col => col.checked)}
            filterable={this.state.filterable}
            {...checkboxProps}
          />
        </div>
      </div>
    );
  }
}

export default T06;
