import React, { Component } from 'react';
import { makeData, Logo, Tips } from "./Utils";
import Columns from './Columns';

// Import React Table
import ReactTable from "react-table";

class T05 extends Component {
  constructor() {
    super();
    var data = makeData(6);
    this.state = {
      data: data,
      columns: [
        {
          Header: "First Name",
          accessor: "firstName",
          checked: true
        },
        {
          Header: "Last Name",
          accessor: "lastName",
          checked: true
        },
        {
          Header: "Age",
          accessor: "age",
          checked: true
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
          checked: true
        },
        {
          Header: "Delete",
          accessor: "firstName",
          Cell: row => (
            <button className="btn btn-danger" name="delete" id={row.value} onClick={this.tableClickHandler}>
              Delete
            </button>
          ),
          checked: true
        }
      ],
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
  tableClickHandler = (e)=>{
    let name = e.target.name;
    let id = e.target.id;
    if(name === "delete"){
      let data = this.state.data.slice();
      for(let i=0; i < data.length; i++){
        if(data[i].firstName === id){
          data.splice(i,1);
          this.setState({data:data});
          return;
        }
      }
    }
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
          />
        </div>
        <br />
        <Tips />
        <Logo />
      </React.Fragment>
    );
  }
}

export default T05;
