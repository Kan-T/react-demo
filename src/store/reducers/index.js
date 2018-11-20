// Import Redux
import {createStore, combineReducers, compose} from "redux";
import counter from "./counter";
import todos from "./todos";

const reducer = combineReducers({
  counter,                                    // ES6 style, same as 'counter: counter'(store key name: reducer name)
  todos
})
// const reducer = (state={}, action)=>{
//   return {
//     counter: counter(state.counter, action),
//     todos: todos(state.todos, action)
//   }
// }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;                              // for REDUX_DEVTOOLS

const store = createStore(reducer,                                    // Reducer
                          {counter: 0, todos: []},                    // Initial state
                          composeEnhancers()                                                                  // for REDUX_DEVTOOLS
                        );                                            // store definition ends | create store
                    
export default store;