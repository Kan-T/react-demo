import React from 'react';
import {components} from 'react-select';

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <EmojiIcon
        primaryColor={colourOptions[2].color}
      />
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;