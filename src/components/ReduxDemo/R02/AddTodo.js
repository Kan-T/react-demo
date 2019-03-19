import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../../store/actions'

const AddTodo = (props) => {
  let input;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          props.addTodo(input.value);
          input.value = '';
        }}
      >
        <input ref={node => (input = node)} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}
export default connect(null, {addTodo})(AddTodo);                    // No arguments in connect(), means only passing store.dispatch to AddTodo