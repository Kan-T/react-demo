import React, {Component} from 'react';
import { Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';

class SearchInput extends Component{
  render() {
    return (
      <div className="d-flex flex-grow-1 align-items-center bg-white rounded">
        <Input className="border-0 outline-0" placeholder="Search"
          value={this.props.searchText || ''}
          onChange={this.props.setSearchText}
        />
        <FontAwesomeIcon icon={faSearch} className="fa-lg text-secondary mx-1"/>
      </div>
    )
  }
}

export default SearchInput;