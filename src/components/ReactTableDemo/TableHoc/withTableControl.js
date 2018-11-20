import React from 'react';
import Columns from './widgets/Columns';

function getColumns(data) {
  const columns = [];
  const sample = data[0];
  Object.keys(sample).forEach(key => {
    if (key !== "_id" && key !== "children") {
      console.log(key)
      columns.push({
        accessor: key,
        Header: key,
        hidden: false
      });
    }
  });
  return columns;
}

const withTableControl = (WrappedComponent) => { 
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        columns: this.props.columns || getColumns(this.props.data),
        filterable: this.props.filterable,
        defaultPageSize: this.props.defaultPageSize || 10,
        props: this.props
      };
    }

    componentDidMount() {                             // Remove columns & filterable from props, so this component can control them.
      // let props = Object.assign({},this.props);
      // props.columns=0;
      // delete props.columns;
      // delete props.filterable;
      // this.setState({props: props});
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
            {...this.state.props}
            columns={this.state.columns.filter(col => !col.hidden)}
            filterable={this.state.filterable}
          />
        </React.Fragment>
      );
    }
  }
}

export default withTableControl