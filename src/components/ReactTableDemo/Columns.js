import React, { Component } from 'react';

class Columns extends Component {

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <React.Fragment>
        <ul className="list-inline d-flex flex-wrap mb-0 mt-3">
          { this.props.columns.map( (col,idx) => {
            return (
              <li key={col.Header} className="px-3">
                <input type="checkbox" name={col.Header} id={col.Header} checked={col.checked} 
                      onChange={(e) => this.props.colChange(idx, e)}/>
                <label htmlFor={col.Header}>{col.Header}</label>
              </li>
            )
          })}
        </ul>

        <ul className="list-inline d-flex flex-wrap mb-0 mt-3">
          <li className="px-3">
            <input type="checkbox" name="filterable" id="filterable" checked={this.props.filterable} 
                  onChange={this.props.configChange}/>
            <label htmlFor="filterable">Filterable</label>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default Columns;
