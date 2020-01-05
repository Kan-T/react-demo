import React from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import styles from './MiniTabs.module.scss';

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
const MiniTabs = ({miniItems, onMinItem}) => {
    return (
      <div className={styles.miniTabs}>
        {miniItems.map(el => 
          <span 
            className={styles.miniItem}
            key={el.i}
          >
            <span className="mr-3">{el.i}</span>
            <FontAwesomeIcon icon={faChevronDown}
              name={el.i}
              onClick={onMinItem}
            />
          </span>
        )}
      </div>
    );
}

MiniTabs.propTypes = {
  grid: PropTypes.object,
  name: PropTypes.string
}

MiniTabs.defaultProps = {
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

export default MiniTabs;