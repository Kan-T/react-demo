import React from 'react';

const CustomClearText = () => 'clear all';
export default (props) => {
  const { children = <CustomClearText/>, getStyles, innerProps: { ref, ...restInnerProps } } = props;
  return (
    <div {...restInnerProps} ref={ref} style={getStyles('clearIndicator', props)}>
      <div style={{ padding: '0px 5px' }}>
        {children}
      </div>
    </div>
  );
};