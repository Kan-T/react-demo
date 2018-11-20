// store definition starts | define reducer
const counter = (state=0, action)=>{              // Need to provide initail state, or error will occor
  switch(action.type){
    case 'INCREMENT':
    return state + 1;
    case 'DECREMENT':
    return state - 1;
    default:
    return state;
  }
};

export default counter;