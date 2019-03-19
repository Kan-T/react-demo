export const addTodo = value => {                           //Sync action
  return {
    type: 'ADD_TODO',
    text: value,
    id: new Date().getTime()
  };
};
// export const addTodo = value => dispatch => {            //Async action
//   dispatch({
//     type: 'ADD_TODO',
//     text: value,
//     id: new Date().getTime()
//   });
// };