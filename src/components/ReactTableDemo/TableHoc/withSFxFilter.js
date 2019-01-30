import React from 'react';
import {findIndex, uniq, uniqBy, without} from 'lodash';
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
      });
    }

    setFiltered = (id, value, checked) => {
      console.log(this.state)
      let filteredTemp = [...this.state.filtered];
      let idx = findIndex(filteredTemp, filter => filter.id === id);
      if (idx > -1) {
        let valueArr = filteredTemp.filter(obj => obj.id === id)[0].value;
        filteredTemp = [
          {
            "id": id, 
            "value": ( checked ? uniq([...valueArr, value]): without(valueArr, value) )
          },
          ...filteredTemp
        ];
        filteredTemp = uniqBy(filteredTemp, "id");
      } else if(checked) {
        filteredTemp.push({
          "id": id,
          "value": [value]
        })
      }
      this.setState({
        filtered: filteredTemp
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
              if(this.props.manual){
                return {
                  ...column,
                  Header: this.setHeader(column)
                }
              }
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
  if(!filter || !filter.value || filter.value.length === 0){
    return true;
  }
  return filter.value.indexOf(String(row[filter.id])) > -1
}

export default withSFxFilter