import React, { Component } from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandArrowsAlt } from "@fortawesome/free-solid-svg-icons/faExpandArrowsAlt";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import styles from './Container.module.scss';

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: []
    }

    this.ref = React.createRef()
    this.child = React.cloneElement(this.props.children, {ref: this.ref})
    
  }

  componentDidMount () {
    if(this.ref.current && typeof(this.ref.current.setHeaderConfig) === "function") {
      const {icons} = this.ref.current.setHeaderConfig()
      this.setState({
        icons
      })
    }
  }
  
  genIcon = (icon) => {
    
    // getOnClick can access Container's this, and genIcon's args.
    const getOnClick = () => {
      if(typeof(icon.onClick) !== "string") {
        return null
      }
  
      let func = this.ref.current[icon.onClick]
      if(typeof(func) !== "function") {
        return null
      }
      
      func()
    }

    return (
      <img key={icon.name} src={icon.src} alt=""
        style={icon.style} 
        onClick={getOnClick}
      />
    )
  }

  render() {
    let {name, layout, isEditable, onMinItem, onMaxItem, onRemoveItem} = this.props
    const icons = Array.isArray(layout.icons) ? layout.icons : this.state.icons

    return (
      <div name={name} className={`d-flex flex-column ${styles.component}`} style={layout.style}>
        <div className={styles.header}>
          <span className="text">{name}</span>

          <div className={`pl-2 ${styles.toolStyle}`}>
            {icons.map(this.genIcon)}

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
          {this.child}
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