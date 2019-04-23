import React from "react";
import { shallow } from "enzyme";
import { Hero } from "../Hero";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";

const setup = overrideProps => {
  const props = Object.assign(
    {
      classes: {},
    },
    overrideProps,
  );
  const hero = shallow(<Hero {...props} />);
  return {
    hero,
    props,
  };
};

describe("<Hero />", () => {
  it("should render the text", () => {
    const { hero } = setup();
    expect(hero.find(Typography)).toHaveLength(2);
  });

  it("should render the buttons", () => {
    const { hero } = setup();
    expect(hero.find(Button)).toHaveLength(2);
  });

  it("should render the Search", () => {
    const { hero } = setup();
    expect(hero.find(SearchIcon)).toHaveLength(1);
    expect(hero.find(TextField)).toHaveLength(1);
  });
});
