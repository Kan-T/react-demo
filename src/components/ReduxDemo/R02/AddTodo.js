import React from 'react';
import { connect } from 'react-redux';

const AddTodo = ({ dispatch }) => {
  let input;

  const addTodo = (value)=>{
    dispatch({
      type: 'ADD_TODO',
      text: value,
      id: new Date().getTime()
    });
  };

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          addTodo(input.value);
          input.value = '';
        }}
      >
        <input ref={node => (input = node)} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}
export default connect()(AddTodo);                    // No arguments in connect(), means only passing store.dispatch to AddTodo