import React, { Component } from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandArrowsAlt } from "@fortawesome/free-solid-svg-icons/faExpandArrowsAlt";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import styles from './Container.module.scss';

export default class Container extends Component {

  log = () => {
    this.props.children._self.log()
  }

  render() {
    let {name, style, isEditable, onMinItem, onMaxItem, onRemoveItem, children} = this.props;
    return (
      <div name={name} className={`d-flex flex-column ${styles.component}`} style={style}>
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

        <div className={`flex-grow-1 ${styles.content}`}>
          {children}
        </div>
      </div>
    );
  }
}

Container.propTypes = {
  name: PropTypes.string
}

Container.defaultProps = {
  name: ""
}