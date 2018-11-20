// store definition starts | define reducer
const todos = (state=[], action)=>{              // store definition starts | define reducer
  switch(action.type){
    case 'ADD_TODO':
    return [
      ...state,
      {
        id: action.id,
        text: action.text,
        complete: false
      }
    ];
    case 'TOGGLE_TODO':
    return state.map((todo)=>{
      if(todo.id != action.id){
        return todo;
      }
      return {
        ...todo,
        complete: action.complete
      }
    });
    default:
    return state;
  }
}

export default todos;