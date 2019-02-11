import React from 'react';
import Columns from './SubComponents/Columns';

function getColumns(data) {
  const columns = [];
  const sample = data[0];
  Object.keys(sample).forEach(key => {
    if (key !== "_id" && key !== "children") {
      columns.push({
        accessor: key,
        Header: key,
        hidden: false
      });
    }
  });
  return columns;
}

const withColControl = (WrappedComponent) => { 
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        columns: this.props.columns || getColumns(this.props.data),
        filterable: this.props.filterable,
        defaultPageSize: this.props.defaultPageSize || 10
      };
    }

    colChange = (idx, e)=>{
      var value = e.target.checked;
  
      this.setState((state) => {
        let toShow = value
        state.columns[idx].hidden = !toShow;
        return state;
      })
    }
    configChange = (e)=>{
      var value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
      var name = e.target.name;
      this.setState({
        [name] : value
      });
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <React.Fragment>
          <Columns columns={this.state.columns} 
            filterable={this.state.filterable}
            colChange={this.colChange}
            configChange={this.configChange}>
          </Columns>
          <WrappedComponent
            {...this.props}
            columns={this.state.columns.filter(col => !col.hidden)}
            filterable={this.state.filterable}
          />
        </React.Fragment>
      );
    }
  }
}

export default withColControl