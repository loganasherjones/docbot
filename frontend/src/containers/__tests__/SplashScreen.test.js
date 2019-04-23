import React from "react";
import { SplashScreen } from "../SplashScreen";
import { shallow } from "enzyme";
import ProjectCardList from "../../components/project/ProjectCardList";
import Hero from "../../components/Hero";

const setup = propOverrides => {
  const props = Object.assign(
    {
      classes: {},
      projects: [
        { name: "project0", displayName: "Project 0", shortDescription: "foo" },
      ],
      projectsLoading: false,
      projectsError: null,
      fetchProjects: jest.fn(),
    },
    propOverrides,
  );

  const container = shallow(<SplashScreen {...props} />);
  return {
    props,
    container,
  };
};

describe("<SplashScreen />", () => {
  describe("render", () => {
    it("should render <Hero /> and <ProjectCardList />", () => {
      const { container } = setup();
      expect(container.find(Hero)).toHaveLength(1);
      expect(container.find(ProjectCardList)).toHaveLength(1);
    });
  });

  describe("componentDidMount", () => {
    it("Should call fetchProjects", () => {
      const { props } = setup();
      expect(props.fetchProjects).toHaveBeenCalled();
    });
  });
});
