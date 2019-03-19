import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { colourOptions } from './data';
import ClearIndicator from './subComponents/ClearIndicator';
import { MenuList, Option, MultiValue, MultiValueRemove } from './subComponents/SelectComponents';

export default () => {
  const [state, setState] = useState({value: null});
  
  const prefix = (text) => ({
    alignItems: 'center',
    display: 'flex',
    ':before': {
      content: `'${text}'`,
      display: 'block',
      color: '#9aabaf',
      marginRight: 8,
    },
  });

  const selectStyles = {
    control: styles => {
      return ({ ...styles, backgroundColor: '#132e35', borderRadius: 0, boxShadow: '0px', color: '#fff' })
    },
    option: (styles, state) => {
      return {
        ...styles,
        backgroundColor: '#132e35',
        color: state.isDisabled
          ? '#ccc'
          : '#fff'
      };
    },
    valueContainer: styles => ({ ...styles, ...prefix('colors: '), textWrap: 'none' , overflow: 'hidden' }),
    placeholder: () => ({display: 'none'}),
    menu: styles => ({ ...styles, marginTop: '0' }),
    menuList: styles => ({ ...styles, padding: '0', border: 'solid 1px #2684ff' }),
    multiValue: styles => ({ ...styles, color: '#fff', backgroundColor: '#132e35' }),
    multiValueLabel: styles => ({ ...styles, color: '#fff' }),
  };

  return (
    <div style={{width:'200px', margin:'10px'}}>
      <Select
        isMulti
        name="colors"
        options={colourOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        styles={selectStyles}
        components={{ ClearIndicator, Option, MenuList, MultiValue, MultiValueRemove }}
        hideSelectedOptions={false}
        onChange={e => {console.log("e: ", e, " state: ", state)}}
      />
    </div>
  )
};