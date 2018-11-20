import React from 'react';
import store from '../../../store/reducers/index'

const Counter = ({counter, inc, dec}) =>(
  <React.Fragment>
    <h3>Current state: {counter}</h3>
    <button className="btn btn-primary px-3 py-0 mx-2" onClick={inc}>+</button>
    <button className="btn btn-primary px-3 py-0 mx-2" onClick={dec}>-</button>
  </React.Fragment>
)

export default Counter;