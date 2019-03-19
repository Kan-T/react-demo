import React from "react";
import ReactDOM from "react-dom";
import HooksDemo01 from "../../../components/NewFeature/HooksDemo01";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<HooksDemo01 />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// it("App loads with initial state of 0", () => {
//   const wrapper = shallow(<HooksDemo01 />);
//   const text = wrapper.find("p").text();
//   expect(text).toEqual("0");
// });
