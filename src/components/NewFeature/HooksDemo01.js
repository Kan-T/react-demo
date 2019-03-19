import React from 'react';
import useCount from './useCount';

function Hook01() {
  // Declare a new state variable, which we'll call "count"
  const [count, countPlus, countMinus] = useCount(0);

  return (
    <div>
      <p data-testid="countvalue" className="mx-5">{count}</p>
      {/* <button onClick={() => setState({...state, count: state.count + 1})}> */}
      <button data-testid="incrementButton" className="btn btn-primary px-4 mx-2" onClick={countPlus}>
        +1
      </button>
      <button data-testid="decrementButton" className="btn btn-primary px-4 mx-2" onClick={countMinus}>
        -1
      </button>
    </div>
  );
}

export default Hook01;