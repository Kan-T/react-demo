import React, { Component } from "react";
import PropTypes from 'prop-types';
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
    this.state = {
      isMax: false
    };
  }

  onMaxItem = () => {
    let value = this.state.isMax;
    this.setState({isMax: !value})
  }

  render() {
    let {title, onRemoveItem} = this.props;
    return (
      <div className={`d-flex flex-column h-100 w-100 ${this.state.isMax ? styles.max : ""}`}>
        <div className={styles.header}
          title={title} 
        >
          <span className="text">{title}</span>

          <div className={`pl-1 ${styles.toolStyle}`}>
            {
              !this.props.isEditable &&
              <span className="mr-1"
                onClick={this.onMaxItem}
              >
                max
              </span>
            }
            <span
              className="remove mr-1"
              title={title}
              onClick={onRemoveItem.bind(this, title)}
            >
              x
            </span>
          </div>
        </div>

        {this.props.children}
      </div>
    );
  }
}