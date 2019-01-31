import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, FormGroup, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';

export default class SFxFilterDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sortChecked = ( desc ) => {
    const { sorted, id } = this.props;
    if(sorted && sorted.length > 0 && sorted.filter(sort => sort.id===id).length > 0){
      if(desc) {
        return sorted.filter(sort => sort.id===id)[0].desc;
      }else{
        return !sorted.filter(sort => sort.id===id)[0].desc;       
      }
    }
    return false;
  }

  sortChange = (e) => {
    e.stopPropagation();
    this.props.setSorted(this.props.id, e.target.value);
    // this.toggle();
  }

  filterChecked = (filterStr) => {
    const { filtered, id } = this.props;
    if(filtered && filtered.length > 0 && filtered.filter(elem => elem.id===id).length > 0){
      return filtered.filter(elem => elem.id===id)[0].value.indexOf(filterStr) > -1;
    }
    return false;
  }

  filterChange = (e) => {
    let value = e.target.value;
    let checked = e.target.checked;
    this.props.setFiltered(this.props.id, value, checked);
  }

  render() {
    const {id} = this.props;
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle
          tag="span"
          onClick={this.toggle}
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
        >
          <FontAwesomeIcon icon={faCaretDown} className="mx-1"/>
        </DropdownToggle>
        <DropdownMenu>
          <form>
            <FormGroup>
              <Label>
                <input type="radio" name={`${id}Sort`}value={false} 
                  checked={this.sortChecked()}
                  onChange={this.sortChange}
                />Sort A-Z
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                <input type="radio" name={`${id}Sort`} value={true} 
                  checked={this.sortChecked(true)}
                  onChange={this.sortChange}
                />Sort Z-A
              </Label>
            </FormGroup>

            {
              this.props.manual && this.props.colFilterData && this.props.colFilterData[id] && this.props.colFilterData[id].map((filterStr) => {
                return (
                <FormGroup key={`${id}Filter${filterStr}`}>
                  <Label>
                    <input type="checkbox" name={`${id}Filter`} value={filterStr}
                      checked={this.filterChecked(filterStr)}
                      onChange={this.filterChange}
                    />{filterStr}
                  </Label>
                </FormGroup>
              )})
            }
          </form>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
