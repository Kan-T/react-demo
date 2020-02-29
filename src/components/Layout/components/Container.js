import React, { Component } from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandArrowsAlt } from "@fortawesome/free-solid-svg-icons/faExpandArrowsAlt";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: [],
      miniItems: [],
      maxItemName: null
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
  
  minItem = e => {
    let name = e.currentTarget.getAttribute("name");
    if(!this.state.miniItems.includes(name)) {
      this.setState({ miniItems: [...this.state.miniItems, name] });
    }
  }

  unMinItem = e => {
    let name = e.currentTarget.getAttribute("name")
    let i = this.state.miniItems.findIndex(el => el === name)
    if(i > -1) {
      let items = [...this.state.miniItems]
      items.splice(i,1)
      this.setState({ miniItems: items });
    }
  }

  onMaxItem = e => {
    console.log(e.currentTarget.getAttribute("name"))
    if(this.state.maxItemName) {
      this.setState({maxItemName: null})
    } else {
      let name = e.currentTarget.getAttribute("name");
      this.setState({maxItemName: name})
    }
  }

  getMaxItemClass = maxItemName => {
    if(this.state.maxItemName === null || this.state.maxItemName !== maxItemName) {
      return ""
    }else{
      return "flexLayoutMax"
    }
  }
  
  genIcon = (icon) => {
    const {isEditable, name} = this.props
    
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

    let returnIcon = null;

    if(icon === "min" && !isEditable) {
      returnIcon = (
        <FontAwesomeIcon key={icon} icon={faMinus}
          className="flexLayoutIcon"
          name={name}
          onClick={this.minItem}
        />
      )
    } else if(icon === "max" && !isEditable) {
      returnIcon = (
        <FontAwesomeIcon key={icon} icon={faExpandArrowsAlt}
          className="flexLayoutIcon"
          name={name}
          onClick={this.onMaxItem}
        />
      )
    } else {
      returnIcon = (
        <img key={icon.name} src={icon.src} alt=""
          style={icon.style} 
          onClick={getOnClick}
        />
      )
    }

    return returnIcon
  }

  render() {
    let {name, layout, onRemoveItem} = this.props
    const icons = Array.isArray(layout.icons) ? layout.icons : this.state.icons
    const isMin = this.state.miniItems.includes(name)

    return (
      <div name={name} 
        className={`flexLayoutComponent ${this.getMaxItemClass(name)} ${isMin? "flexLayoutHide" : ""}`} 
        style={layout.style}
      >
        <div className="flexLayoutHeader">
          <span className="flexLayoutTitle">{name}</span>

          <div className="flexLayoutToolStyle">
            {icons.map(this.genIcon)}

            {/* <FontAwesomeIcon icon={faTimes} 
              className="remove mr-2"
              name={name}
              onClick={onRemoveItem}
            /> */}
          </div>
        </div>

        <div className="flexLayoutContent">
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