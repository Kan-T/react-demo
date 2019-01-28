import React from 'react';
import SFxFilterDropdown from './widgets/SFxFilterDropdown';

const withSFxFilter = (WrappedComponent) => { 
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        sorted: [],
        filtered: []
      };
    }

    setSorted = (id, value) => {
      if(value === "true"){
        value = true;
      }
      if(value === "false"){
        value = false;
      }
      this.setState({
        sorted: [
          {
            "id": id,
            "desc": value
          }
        ]
      },()=>{console.log(this.state)});
    }

    setFiltered = (id, valueArr) => {
      const filterArr = this.state.filtered.map(filter => {
        if(filter.id === id){
          return {
            "id": id,
            "value": valueArr
          }
        }
        return filter;
      })
      this.setState({
        filtered: filterArr
      });
    }

    setHeader = ({Header, accessor, id}) => (
      <span className="d-flex">
        <span className="flex-shrink-1" style={{overflow: "hidden"}}>{Header}</span>
        <SFxFilterDropdown 
          {...this.props}
          {...this.state}
          setSorted={this.setSorted}
          setFiltered={this.setFiltered}
          //use id when accessor is a function
          id={typeof(accessor)==="string" ? accessor : id}
        />
      </span>
    )

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <React.Fragment>
          <WrappedComponent
            {...this.props}
            columns={this.props.columns.map(column => {
              return {
                ...column,
                filterMethod,
                Header: this.setHeader(column)
              }
            })}
            sortable={false}
            filterable={false}
            sorted={this.state.sorted}
            filtered={this.state.filtered}
          />
        </React.Fragment>
      );
    }
  }
}

function filterMethod(filter, row) {
  return filter.value.indexOf(String(row[filter.id])) > -1
}

export default withSFxFilter