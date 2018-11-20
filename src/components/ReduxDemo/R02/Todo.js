import React from 'react';

const Todo = ({ id, complete, text, toggleTodo }) => (
  <li>
    <input type="checkbox" id={id} checked={complete} onChange={toggleTodo}/>
    <label htmlFor={id}>{text}</label>
  </li>
)

export default Todo;