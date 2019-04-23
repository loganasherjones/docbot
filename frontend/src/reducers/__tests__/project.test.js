import projectReducer from "../project";
import * as types from "../../constants/ActionTypes";

const setupState = overrideState => {
  return Object.assign(
    {
      projects: [],
      projectsLoading: true,
      projectsError: null,
    },
    overrideState,
  );
};

describe("project reducer", () => {
  it("should return the initial state on undefined input", () => {
    expect(projectReducer(undefined, {})).toEqual({
      projects: [],
      projectsLoading: true,
      projectsError: null,
    });
  });

  it("should handle FETCH_PROJECTS_BEGIN", () => {
    const initialState = setupState({
      projectsLoading: false,
      projectsError: "previousError",
    });
    const action = { type: types.FETCH_PROJECTS_BEGIN };
    const newState = projectReducer(initialState, action);
    expect(newState).toEqual({
      projects: [],
      projectsLoading: true,
      projectsError: null,
    });
  });

  it("should handle FETCH_PROJECTS_SUCCESS", () => {
    const initialState = setupState({
      projectsLoading: true,
      projectsError: "previousError",
    });
    const action = {
      type: types.FETCH_PROJECTS_SUCCESS,
      payload: { projects: ["project1"] },
    };
    const newState = projectReducer(initialState, action);
    expect(newState).toEqual({
      projects: ["project1"],
      projectsLoading: false,
      projectsError: null,
    });
  });

  it("should handle FETCH_PROJECTS_FAILURE", () => {
    const initialState = setupState({
      projectsLoading: true,
    });
    const action = {
      type: types.FETCH_PROJECTS_FAILURE,
      payload: { error: new Error("someError") },
    };
    const newState = projectReducer(initialState, action);
    expect(newState).toEqual({
      projects: [],
      projectsLoading: false,
      projectsError: new Error("someError"),
    });
  });
});
