import React from "react";
import HooksDemo01 from "../../../components/NewFeature/HooksDemo01";
// hooktest.js
import { render, fireEvent, getByTestId} from "react-testing-library";

it("App loads with initial state of 0", () => {
  const { container } = render(<HooksDemo01 />);
  const countValue = getByTestId(container, "countvalue");
  expect(countValue.textContent).toBe("0");
});

it("Increment and decrement buttons work", () => {
  const { container } = render(<HooksDemo01 />);
  const countValue = getByTestId(container, "countvalue");
  const increment = getByTestId(container, "incrementButton");
  const decrement = getByTestId(container, "decrementButton");
  expect(countValue.textContent).toBe("0");
  fireEvent.click(increment);
  expect(countValue.textContent).toBe("1");
  fireEvent.click(decrement);
  expect(countValue.textContent).toBe("0");
});