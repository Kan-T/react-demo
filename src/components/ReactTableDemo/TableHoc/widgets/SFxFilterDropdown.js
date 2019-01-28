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

  sortDesc = ( desc ) => {
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
    this.toggle();
  }

  filterChange = (e) => {
    let value = e.target.value;
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
                <input type="radio" name={`${id}Sort`} id={`${id}asc`} value={false} 
                  checked={this.sortDesc()}
                  onChange={this.sortChange}
                />Sort A-Z
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                <input type="radio" name={`${id}Sort`} id={`${id}desc`} value={true} 
                  checked={this.sortDesc(true)}
                  onChange={this.sortChange}
                />Sort Z-A
              </Label>
            </FormGroup>
          
            <FormGroup>
              <Label>
                <input type="checkbox" name={`${id}Filter`} id={`${id}a`} value="a"
                  onChange={this.filterChange}
                />a
              </Label>
            </FormGroup>
            <FormGroup>            
              <Label>
                <input type="checkbox" name={`${id}Filter`} id={`${id}e`} value="e"
                  onChange={this.filterChange}
                />e
              </Label>
            </FormGroup>
          </form>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
