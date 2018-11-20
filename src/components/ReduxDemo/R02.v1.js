import React, { Component } from 'react';
import store from '../../store/reducers/index';
import Todo from './R02/Todo';

// // Import Redux
// import {createStore} from "redux";

// const todo = (state=[], action)=>{              // store definition starts | define reducer
//   switch(action.type){
//     case 'ADD_TODO':
//       return [
//         ...state,
//         {
//           id: action.id,
//           text: action.text,
//           complete: false
//         }
//       ];
//     case 'TOGGLE_TODO':
//       return state.map((todo)=>{
//         if(todo.id != action.id){
//           return todo;
//         }
//         return {
//           ...todo,
//           complete: action.complete
//         }
//       });
//     default:
//       return state;
//   }
// }
// const store = createStore(todo);               // store definition ends | create store

class R02 extends Component {
  constructor() {
    super();
    // const { store } = this.context;
    this.state = {
      todoList: store.getState().todos,
      text: ""
    };
  }
  componentDidMount() {
    this.unSubscribe = store.subscribe(()=>{
      this.setState({todoList: store.getState().todos});
    });
  }
  componentWillUnmount() {
    this.unSubscribe();
  }

  addTodo = ()=>{
    store.dispatch({
      type: 'ADD_TODO',
      text: this.state.text,
      id: new Date().getTime()
    });
    this.setState({text: ""});
  }
  toggleTodo = (e)=>{
    store.dispatch({
      type: 'TOGGLE_TODO',
      id: e.target.id,
      complete: e.target.checked
    });
  }
  
  updateText = (e)=>{
    this.setState({text: e.target.value})
  }
  render() {

    console.log(JSON.stringify(store.getState().todos));
    return (
      <div className="m-5">
        <h3>Todo List</h3>
        <ul>
          {this.state.todoList.map((todo)=>(
            <Todo key={todo.id} toggleTodo={this.toggleTodo} {...todo} />
          ))}
        </ul>
        <input type="text" value={this.state.text} onChange={this.updateText}/>
        <button className="btn btn-primary px-3 py-0 mx-2" onClick={this.addTodo}>+</button>
      </div>
    )
  }
}

export default R02;
