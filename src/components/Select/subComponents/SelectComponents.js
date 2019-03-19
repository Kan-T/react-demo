import React from 'react';
import {components} from 'react-select';

export const MenuList = ({ children, selectProps, ...otherProps }) =>{
	// console.log(selectProps)
	return (
		<components.MenuList {...otherProps}>
			<input
				type="checkbox"
				checked={selectProps.isSelected}
				onChange={() => null}
			/>
			{!selectProps.inputValue && (
				<button
					onClick={() => selectProps.onChange(selectProps.options)}
				>
					Select all
				</button>
			)}
			{children}
		</components.MenuList>
	);
}

export const Option = props => (
	<components.Option {...props}>
		<input
			type="checkbox"
			checked={props.isSelected}
			onChange={() => null}
		/>
		<label>{props.value}</label>
	</components.Option>
);

export const MultiValue = props => {
  return (
    <components.MultiValue {...props}>
      {props.data.label}
    </components.MultiValue>
  );
};

export const MultiValueRemove = props => null;

