import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import {uniq} from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import SearchInput from './SearchInput';

export default class SFxFilterDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      searchText: ""
    };
  }

  filterListClient = () => uniq(this.props.data.map(row => row[this.props.id]))

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sortChecked = ( desc ) => {
    const { sorted, id } = this.props;
    if (sorted && sorted.length > 0 && sorted.filter(sort => sort.id===id).length > 0){
      if (desc) {
        return sorted.filter(sort => sort.id===id)[0].desc;
      } else {
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
    if (filtered && filtered.length > 0 && filtered.filter(elem => elem.id===id).length > 0){
      return filtered.filter(elem => elem.id === id)[0].value.indexOf(String(filterStr)) > -1;
    }
    return false;
  }

  filterChange = (e) => {
    let value = e.target.value;
    let checked = e.target.checked;
    this.props.setFiltered(this.props.id, value, checked);
  }

  getFilterList = () => {
    const {manual, id, colFilterData} = this.props;
    if (manual){
      return (colFilterData && colFilterData[id]) ? colFilterData[id].filter(elem => elem.indexOf(this.state.searchText)>-1).slice(0,10) : [];
    } else {
      return this.filterListClient().filter(elem=>this.filterStr(elem)).slice(0,10);
    }
  }

  filterStr = (elem) => {
    let str;
    if (elem === 0){
      str = "0";
    } else {
      str = elem && String(elem);
    }
    if (this.state.searchText && this.state.searchText.length > 0){
      return str.substr(0, this.state.searchText.length) === this.state.searchText;
    }
    return true;
  }

  setSearchText = (e) => {
    let value = e.target.value;
    if (value === 0){
      value = "0";
    } else {
      value = value && String(value);
    }
    this.setState({searchText: value});
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
          <form className="dropdownMenu">
            <div className="dropdownSort">
              <label>
                <input type="radio" name={`${id}Sort`}value={false} 
                  checked={this.sortChecked()}
                  onChange={this.sortChange}
                />Sort A-Z
              </label>
            </div>
            <div className="dropdownSort">
              <label>
                <input type="radio" name={`${id}Sort`} value={true} 
                  checked={this.sortChecked(true)}
                  onChange={this.sortChange}
                />Sort Z-A
              </label>
            </div>

            <div>
              <SearchInput searchText={this.state.searchText} setSearchText={this.setSearchText}/>
            </div>

            {/* this.props.colFilterData && this.props.colFilterData[id] && this.props.colFilterData[id].map((filterStr) => { */}
            {
              this.getFilterList().map((filterStr) => {
                return (
                  <div key={`${id}Filter${filterStr}`} className="dropdownFilter">
                    <label>
                      <input type="checkbox" name={`${id}Filter`} value={filterStr}
                        checked={this.filterChecked(filterStr)}
                        onChange={this.filterChange}
                      />{filterStr}
                    </label>
                  </div>
                )})
            }
          </form>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
