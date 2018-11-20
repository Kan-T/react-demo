import { connect } from 'react-redux';
import TodoList from './TodoList'

const mapStateToProps = (state)=>{
  return {
    todoList :state.todos
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    toggleTodo: (e)=>{
      dispatch({
        type: 'TOGGLE_TODO',
        id: e.target.id,
        complete: e.target.checked
      });
    }
  }
}

const TodoListComponent = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default TodoListComponent;
