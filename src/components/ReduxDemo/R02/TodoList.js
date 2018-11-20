import React from 'react';
import Todo from './Todo';

const TodoList = ({ todoList, toggleTodo }) => (
  <ul>
    {todoList.map((todo)=>(
      <Todo key={todo.id} toggleTodo={toggleTodo} {...todo} />
    ))}
  </ul>
)

export default TodoList;