import React from "react";
import { shallow } from "enzyme";
import Spinner from "../../shared/Spinner";
import Error from "../../shared/Error";
import ProjectCardList from "../ProjectCardList";
import ProjectCard from "../ProjectCard";

const setup = overrideProps => {
  const props = Object.assign(
    {
      projects: [
        {
          name: "project0",
          displayName: "Project 0",
          shortDescription: "some description",
        },
      ],
      loading: false,
      error: null,
    },
    overrideProps,
  );
  const projectCardList = shallow(<ProjectCardList {...props} />);
  return {
    projectCardList,
    props,
  };
};

describe("<ProjectCardList />", () => {
  it("should render a <Spinner /> when loading is true", () => {
    const { projectCardList } = setup({ loading: true });
    expect(projectCardList.find(Spinner)).toHaveLength(1);
    expect(projectCardList.find(Error)).toHaveLength(0);
    expect(projectCardList.find(ProjectCard)).toHaveLength(0);
  });

  it("should only render <Error /> when an error occurs", () => {
    const { projectCardList } = setup({ error: { message: "invalid" } });
    expect(projectCardList.find(Spinner)).toHaveLength(0);
    expect(projectCardList.find(Error)).toHaveLength(1);
    expect(projectCardList.find(ProjectCard)).toHaveLength(0);
  });

  it("should render a single <ProjectCard />", () => {
    const { projectCardList } = setup();
    expect(projectCardList.find(Spinner)).toHaveLength(0);
    expect(projectCardList.find(Error)).toHaveLength(0);
    expect(projectCardList.find(ProjectCard)).toHaveLength(1);
  });

  it("should render multiple <ProjectCard />s if necessary", () => {
    const { projectCardList } = setup({
      projects: [
        { name: "project0", displayName: "project 0", shortDescription: "foo" },
        { name: "project1", displayName: "project 1", shortDescription: "bar" },
      ],
    });
    expect(projectCardList.find(Spinner)).toHaveLength(0);
    expect(projectCardList.find(Error)).toHaveLength(0);
    expect(projectCardList.find(ProjectCard)).toHaveLength(2);
  });
});
