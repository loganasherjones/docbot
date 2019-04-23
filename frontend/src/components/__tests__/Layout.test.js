import React from "react";
import { shallow } from "enzyme";
import { Layout } from "../Layout";
import Header from "../Header";
import Footer from "../Footer";

const setup = overrideProps => {
  const props = Object.assign(
    {
      classes: {},
    },
    overrideProps,
  );
  const layout = shallow(<Layout {...props}>children</Layout>);
  return {
    layout,
    props,
  };
};

describe("<Layout />", () => {
  it("should render <Header />", () => {
    const { layout } = setup();
    expect(layout.find(Header)).toHaveLength(1);
  });

  it("should render <Footer />", () => {
    const { layout } = setup();
    expect(layout.find(Footer)).toHaveLength(1);
  });

  it("should render children", () => {
    const { layout } = setup();
    expect(layout.find("main")).toHaveLength(1);
    expect(layout.find("main").text()).toEqual("children");
  });
});
