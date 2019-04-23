import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import {
  FETCH_PROJECTS_BEGIN,
  FETCH_PROJECTS_FAILURE,
  FETCH_PROJECTS_SUCCESS,
} from "../constants/ActionTypes";
import { defaultErrorHandler } from ".";

export const fetchProjectsBegin = () => ({
  type: FETCH_PROJECTS_BEGIN,
});

export const fetchProjectsSuccess = data => ({
  type: FETCH_PROJECTS_SUCCESS,
  payload: {
    projects: data,
  },
});

export const fetchProjectsFailure = error => ({
  type: FETCH_PROJECTS_FAILURE,
  payload: { error: error },
});

export function fetchProjects() {
  return dispatch => {
    dispatch(fetchProjectsBegin());

    return axios
      .get("/api/v1/projects", { params: { limit: 4 } })
      .then(res => {
        const normalizedData = camelcaseKeys(res.data["results"]);
        dispatch(fetchProjectsSuccess(normalizedData));
        return normalizedData;
      })
      .catch(e => defaultErrorHandler(e, dispatch, fetchProjectsFailure));
  };
}
