import React from "react";
import { shallow } from "enzyme";
import { ProjectCard } from "../ProjectCard";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

const setup = overrideProps => {
  const props = Object.assign(
    {
      classes: {},
      project: {
        name: "project0",
        displayName: "Project 0",
        shortDescription: "some description",
      },
    },
    overrideProps,
  );
  const card = shallow(<ProjectCard {...props} />);
  return {
    card,
    props,
  };
};

describe("<ProjectCard />", () => {
  describe("render", () => {
    it("should render the display name", () => {
      const { card, props } = setup();
      const title = card
        .find(CardContent)
        .find(Typography)
        .filter({ variant: "h5" })
        .dive()
        .dive();
      expect(title.text()).toEqual(props.project.displayName);
    });

    it("should render the short description", () => {
      const { card, props } = setup();
      const shortDescription = card
        .find(CardContent)
        .find(Typography)
        .filter({ variant: "body1" })
        .dive()
        .dive();
      expect(shortDescription.text()).toEqual(props.project.shortDescription);
    });

    it("should render the buttons", () => {
      const { card } = setup();
      expect(card.find(Button)).toHaveLength(1);
      expect(card.find(IconButton)).toHaveLength(2);
    });
  });
});
