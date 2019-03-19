import React from 'react';
import useCount from './useCount';

function Hook02() {
  // Declare a new state variable, which we'll call "count"
  const [count, countPlus, countMinus] = useCount();

  return (
    <div>
      <p>You clicked {count} times.</p>
      {/* <button onClick={() => setState({...state, count: state.count + 1})}> */}
      <button className="btn btn-secondary px-4 mx-2" onClick={countPlus}>
        +1
      </button>
      <button className="btn btn-secondary px-4 mx-2" onClick={countMinus}>
        -1
      </button>
    </div>
  );
}

export default Hook02;