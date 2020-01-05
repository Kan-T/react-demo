import React, { Component } from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandArrowsAlt } from "@fortawesome/free-solid-svg-icons/faExpandArrowsAlt";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import styles from './Container.module.scss';

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
export default class Container extends Component {
  render() {
    let {name, isEditable, onMinItem, onMaxItem, onRemoveItem, children} = this.props;
    return (
      <div name={name} className="d-flex flex-column h-100 w-100">
        <div className={styles.header}>
          <span className="text">{name}</span>

          <div className={`pl-2 ${styles.toolStyle}`}>
            {!isEditable &&
              <>
                <FontAwesomeIcon icon={faMinus}
                  className="mr-2"
                  name={name}
                  onClick={onMinItem}
                />
                <FontAwesomeIcon icon={faExpandArrowsAlt}
                  className="mr-2"
                  name={name}
                  onClick={onMaxItem}
                />
              </>
            }

            <FontAwesomeIcon icon={faTimes} 
              className="remove mr-2"
              name={name}
              onClick={onRemoveItem}
            />
          </div>
        </div>

        <div className="flex-grow-1">
          {children}
        </div>
      </div>
    );
  }
}

Container.propTypes = {
  grid: PropTypes.object,
  name: PropTypes.string
}

Container.defaultProps = {
  grid: {
    i: 0,
    x: 0,
    y: 0,
    w: 2,
    h: 2,
    hasAdd: false,
    hasMax: false
  },
  name: ""
}