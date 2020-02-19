import React from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import styles from './MiniTabs.module.scss';

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
const MiniTabs = ({miniItems, unMinItem}) => {
    return (
      <div className={styles.miniTabs}>
        {miniItems.map(el => 
          <span 
            className={styles.miniItem}
            key={el}
          >
            <span>{el}</span>
            <FontAwesomeIcon icon={faChevronLeft}
              name={el}
              onClick={unMinItem}
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