import React from "react";
import { shallow } from "enzyme";
import { Header } from "../Header";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

const setup = overrideProps => {
  const props = Object.assign(
    {
      classes: {},
    },
    overrideProps,
  );
  const header = shallow(<Header {...props} />);
  return {
    header,
    props,
  };
};

describe("<Header />", () => {
  it("should render the Logo", () => {
    const { header } = setup();
    const link = header.find(Link);
    expect(link).toHaveLength(1);
  });

  it("should render the Login button", () => {
    const { header } = setup();
    expect(header.find(Button)).toHaveLength(1);
  });

  it("should render the <AppBar />", () => {
    const { header } = setup();
    expect(header.find(AppBar)).toHaveLength(1);
  });
});
