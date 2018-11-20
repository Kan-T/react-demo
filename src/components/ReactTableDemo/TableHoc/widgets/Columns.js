import React, { Component } from 'react';
import { Collapse, Button} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/fontawesome-free-solid';

class Columns extends Component {
  constructor(props) {
    super(props);
    this.state = { collapse: false };
  }
  toggle = ()=>{
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <div style={{background: 'rgba(255, 255, 255, 0.06)'}}>
        <div className="px-3">
          <Button className="btn btn-outline-secondary w-100 py-0 my-0" onClick={this.toggle} >
            { this.state.collapse ? <FontAwesomeIcon icon={faChevronUp} /> :
              <FontAwesomeIcon icon={faChevronDown} />
            }
          </Button>
        </div>
        <Collapse isOpen={this.state.collapse}>
          <ul className="list-inline d-flex flex-wrap mb-0 mt-3">
            { this.props.columns.map( (col,idx) => {
              if(typeof(col.Header) !== 'string'){
                col.Header="X";
              }
              return (
                <li key={col.Header} className="px-3">
                  <input type="checkbox" name={col.Header} id={col.Header} checked={!col.hidden} 
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
            </li >
            {/* <li className="px-3">
              <label htmlFor="defaultPageSize">defaultPageSize</label>
              <input type="number" className="form-control" name="defaultPageSize" id="defaultPageSize" value={this.props.defaultPageSize} 
                    onChange={this.props.configChange}/>
            </li> */}
          </ul>
        </Collapse>
      </div>
    );
  }
}

export default Columns;
