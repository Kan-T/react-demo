import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import useCount from "../../../components/NewFeature/useCount";

describe('custom hook tests', () => {
  afterEach(cleanup)

  test('countPlus', () => {
    const { result } = renderHook(() => useCount(0))
    let [count, countPlus] = result.current;
    expect(count).toBe(0);
    countPlus();
    expect(result.current[0]).toBe(1);
  })

  test('countMinus', () => {
    const { result } = renderHook(() => useCount(1))
    let [count, , countMinus] = result.current;
    expect(count).toBe(1);
    countMinus();
    expect(result.current[0]).toBe(0);
  })

})

