import {
  FETCH_PROJECTS_BEGIN,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
} from "../constants/ActionTypes";

const initialState = {
  projects: [],
  projectsLoading: true,
  projectsError: null,
};

export default function projectReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROJECTS_BEGIN:
      return {
        ...state,
        projectsLoading: true,
        projectsError: null,
      };
    case FETCH_PROJECTS_FAILURE:
      return {
        ...state,
        projectsLoading: false,
        projectsError: action.payload.error,
        projects: [],
      };
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projectsLoading: false,
        projects: action.payload.projects,
        projectsError: null,
      };
    default:
      return state;
  }
}
