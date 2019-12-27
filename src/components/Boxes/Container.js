import React, { Component } from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandArrowsAlt } from "@fortawesome/free-solid-svg-icons/faExpandArrowsAlt";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import styles from './Container.module.scss';

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
export default class Container extends Component {
  static propTypes = {
    grid: PropTypes.object,
    title: PropTypes.string
  }
  static defaultProps = {
    grid: {
      i: 0,
      x: 0,
      y: 0,
      w: 2,
      h: 2,
      hasAdd: false,
      hasMax: false
    },
    title: "0"
  };

  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      isMaxWin: false
    };
  }

  onMaxWin = () => {
    let value = this.state.isMaxWin;
    this.setState({isMaxWin: !value})
  }

  render() {
    let {name, onRemoveItem} = this.props;
    return (
      <div name={name} className={`d-flex flex-column h-100 w-100 ${this.state.isMaxWin ? styles.maxWin : ""}`}>
        <div className={styles.header}>
          <span className="text">{name}</span>

          <div className={`pl-2 ${styles.toolStyle}`}>
            {!this.props.isEditable &&
              <FontAwesomeIcon icon={faExpandArrowsAlt} 
                className="mr-2"
                onClick={this.onMaxWin}
              />
            }

            <FontAwesomeIcon icon={faExpandArrowsAlt}
              className="mr-2"
              name={name}
              onClick={this.props.onMaxItem}
            />

            <FontAwesomeIcon icon={faTimes} 
              className="remove mr-2"
              name={name}
              onClick={onRemoveItem}
            />
          </div>
        </div>

        {this.props.children}
      </div>
    );
  }
}