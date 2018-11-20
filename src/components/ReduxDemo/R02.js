import React, { Component } from 'react';
import store from '../../store/reducers/index';
import TodoListComponent from './R02/TodoListComponent';
import AddTodo from './R02/AddTodo';

class R02 extends Component {
  constructor() {
    super();
    // const { store } = this.context;
  }
  
  render() {
    return (
      <div className="m-5">
        <h3>Todo List</h3>
        <TodoListComponent />
        <AddTodo />
      </div>
    )
  }
}

export default R02;
