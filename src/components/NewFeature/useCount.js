import { useState, useEffect } from 'react';

function useCount(initValue) {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(initValue);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const countPlus = () => setCount(count + 1)
  const countMinus = () => setCount(count - 1)

  return [count, countPlus, countMinus];
}

export default useCount;