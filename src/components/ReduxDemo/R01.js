import React, { Component } from 'react';

import store from '../../store/reducers/index'
import Counter from './R01/Counter'

import { connect } from 'react-redux';

// // Import Redux                                  // These store is moved to '../../store/reducers/index'
// import {createStore} from "redux";
// const counter = (state=0, action)=>{              // store definition starts | define reducer
//   switch(action.type){
//     case 'INCREMENT':
//       return state + 1;
//     case 'DECREMENT':
//       return state - 1;
//     default:
//       return state;
//   }
// }
// const store = createStore(counter);               // store definition ends | create store

// class R01 extends Component {                      // Working version 1
//   componentDidMount() {
//     this.unSubscribe = store.subscribe(()=>{
//       this.forceUpdate();
//     })
//   }
//   componentWillUnmount() {
//     this.unSubscribe();
//   }
  
//   render() {
//     const counter = store.getState().counter
//     return (
//       <React.Fragment>
//         <h3>Current state: {counter}</h3>
//         <button className="btn btn-primary px-3 py-0 mx-2" onClick={()=>{store.dispatch({type: 'INCREMENT'})}}>+</button>
//         <button className="btn btn-primary px-3 py-0 mx-2" onClick={()=>{store.dispatch({type: 'DECREMENT'})}}>-</button>
//       </React.Fragment>
//     )
//   }
// }

// class R01 extends Component {                      // Working version 2
//   constructor() {
//     super();
//   }
//   componentDidMount() {
//     this.unSubscribe = store.subscribe(()=>{
//       this.forceUpdate();
//     })
//   }
//   componentWillUnmount() {
//     this.unSubscribe();
//   }
  
//   inc(){store.dispatch({type: 'INCREMENT'})}
//   dec(){store.dispatch({type: 'DECREMENT'})}
  
//   render() {
//     const counter = store.getState().counter
//     return (
//       <Counter counter={counter} inc={this.inc} dec={this.dec}/>
//       )
//     }
//   }
  
const mapStateToProps = (state)=>{                      // Working version 3
  return {
    counter :state.counter
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    inc: ()=>{dispatch({type: 'INCREMENT'})},
    dec: ()=>{dispatch({type: 'DECREMENT'})}
  }
}

const R01 = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default R01;
